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
                        :before-upload="beforeFileUpload"
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
                        <upload-image/>
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
                    <el-button @click="dialogVisible=false">取 消</el-button>
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
import UploadImage from './components/UploadImage';
export default {
    name: "releaseArticle",
    components:{
        UploadImage
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
            mdContent: "",
        };
    },
    methods: {
        isRelease(){
            this.dialogVisible = true;
            this.$store.state.isUpLoad = true
            // console.log(this.releaseForm);
            this.$refs.upload.submit();
            // uploadFile(this.file).then(res =>{
            //     console.log(res.data);
            // }).catch(err => console.log(err))
        },
        beforeFileUpload(file){
            this.file = file;
            // console.log('file:',file);
            this.releaseForm['fileName'] = file.name;
        },
        change(value, render) {
            this.html = render;
        },
        release() {
            this.dialogVisible = false;
            console.log(this.releaseForm);
            this.$refs["releaseForm"].validate((valid) => {
                if (valid) {
                    releaseArticle(this.releaseForm)
                        .then((res) => {
                            if (res.status === 200) {
                                alertInfo("发布成功~", "success");
                                this.releaseForm = {};
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
.releaseArticle .view-md .md-container {
    /* margin-top:200px; */
}
.release {
    text-align: center;
}
</style>