<template>
    <div class="releaseArticle">
        <div class="release-info">
            <div class="title">
                <h1>发布文章</h1>
            </div>
            <main>
                <el-form
                    :model="releaseForm"
                    :rules="formRules"
                    ref="releaseForm"
                >
                    <el-form-item label="标题" label-width="120px" prop="title">
                        <el-input
                            v-model="releaseForm.title"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="内容"
                        label-width="120px"
                        class="upload-container"
                        prop="fileName"
                    >
                        <el-upload
                            class="upload-demo"
                            drag
                            action="/api/article/upload"
                            :multiple="false"
                            :on-change="beforeFileUpload"
                            :auto-upload="false"
                            ref="upload"
                        >
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">
                                将文件拖到此处，或<em>点击上传</em>
                            </div>
                            <div class="el-upload__tip" slot="tip">
                                仅支持markdown文件
                            </div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item
                        label="封面"
                        label-width="120px"
                        class="upload-container"
                        prop="coverSrc"
                    >
                        <div class="upload-image">
                            <el-upload
                                action="/api/article/upload"
                                list-type="picture-card"
                                :before-upload="beforeFileUploadImg"
                                ref="uploadImg"
                                :auto-upload="false"
                            >
                                <i slot="default" class="el-icon-plus"></i>
                                <div slot="file" slot-scope="{ file }">
                                    <img
                                        class="el-upload-list__item-thumbnail"
                                        :src="file.url"
                                        alt=""
                                    />
                                    <span class="el-upload-list__item-actions">
                                        <span
                                            class="el-upload-list__item-preview"
                                            @click="
                                                handlePictureCardPreview(file)
                                            "
                                        >
                                            <i class="el-icon-zoom-in"></i>
                                        </span>
                                        <span
                                            v-if="!disabled"
                                            class="el-upload-list__item-delete"
                                        >
                                            <i class="el-icon-download"></i>
                                        </span>
                                        <span
                                            v-if="!disabled"
                                            class="el-upload-list__item-delete"
                                        >
                                            <i class="el-icon-delete"></i>
                                        </span>
                                    </span>
                                </div>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisibleImg">
                                <img
                                    width="100%"
                                    :src="dialogImageUrl"
                                    alt=""
                                />
                            </el-dialog>
                        </div>
                    </el-form-item>
                    <el-form-item
                        label="介绍"
                        label-width="120px"
                        prop="introduction"
                    >
                        <el-input
                            v-model="releaseForm.introduction"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="分类" label-width="120px" prop="tags">
                        <el-select
                            v-model="releaseForm.tags"
                            multiple
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="(item, index) in allTags"
                                :key="index"
                                :label="item"
                                :value="item"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </main>
            <footer class="release">
                <el-button type="primary" @click="isRelease">发布</el-button>
            </footer>
            <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
                <h1>确认要发布吗？</h1>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="release">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="view-md">
            <div class="title">
                <h1>预览</h1>
            </div>
            <div class="md-container">
                <mavon-editor
                    v-model="mdContent"
                    ref="md"
                    @change="change"
                    placeholder="说点什么吧~"
                    toolbarsBackground="var(--themeBodyColor)"
                    previewBackground="var(--themeBodyColor)"
                    style="min-height: 200px"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { getAllTags } from "@/api/index";
import { releaseArticle } from "@/api/admin";
import { alertInfo } from "@/utils/index";
export default {
    name: "releaseArticle",
    components: {
    },
    mounted() {
        getAllTags()
            .then((res) => {
                if (res.status === 200) {
                    res.data.forEach((item) => {
                        this.allTags.push(item.tagName);
                    });
                } else {
                    alertInfo("获取分类列表失败，请稍后重试", "error");
                }
            })
            .catch((err) => alertInfo(err, "error"));
    },
    data() {
        return {
            formRules: {
                title: [
                    { required: true, message: "请输入标题", trigger: "blur" },
                ],
                introduction: [
                    { required: true, message: "请输入简介", trigger: "blur" },
                ],
            },
            releaseForm: {},
            allTags: [],
            dialogVisible: false,
            dialogVisibleImg: false,
            mdContent: "",
            dialogImageUrl: "",
            disabled: false,
        };
    },
    methods: {
        beforeFileUpload(file) {
            if(file.name.split(".")[1] !== "md"){
                alertInfo("只能上传md文档!","error");
                return false;
            }
            else{
                this.releaseForm["fileName"] = file.name;
            }
        },
        beforeFileUploadImg(file) {
            const isJPG = file.type === "image/jpeg" || "image/png";
            if (!isJPG) {
                alertInfo("图片只能是jpg/png格式!","error");
                return isJPG;
            }
            else{
                this.releaseForm["coverSrc"] = file.name;
            }
        },
        change(value, render) {
            this.html = render;
        },
        isRelease() {
            this.dialogVisible = true;
        },
        release() {
            this.dialogVisible = false;
            this.$refs["releaseForm"].validate((valid) => {
                if (valid && this.releaseForm["fileName"]) {
                    releaseArticle(this.releaseForm)
                        .then((res) => {
                            if (res.status === 200) {
                                alertInfo("发布成功~", "success");
                                this.releaseForm = {};
                                this.$refs.upload.submit();
                                this.$refs.uploadImg.submit();
                            } else {
                                alertInfo("发布失败！请稍后重试", "error");
                            }
                        })
                        .catch((err) => alertInfo(err, "error"));
                } else {
                    alertInfo("发布失败！请正确填写字段！", "error");
                    return false;
                }
            });
        },
    },
};
</script>

<style scoped>
.title h1 {
    font-size: 2.5rem;
}
.releaseArticle {
    margin-top: 50px;
    display: flex;
}
.releaseArticle .release-info {
    flex: 2;
    margin: 0 20px;
}
.releaseArticle .view-md {
    flex: 3;
    margin: 0 20px;
}
.release {
    text-align: center;
}
</style>