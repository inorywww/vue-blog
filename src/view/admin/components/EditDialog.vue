<template>
    <div class="editDialog">
        <el-dialog title="编辑信息" :visible.sync="editDialogVisible">
            <el-form :model="editForm" :rules="formRules" ref="editForm">
                <div class="form-row">
                    <el-form-item label="ID" label-width="120px">
                        <el-input
                            v-model="editForm.articleID"
                            autocomplete="off"
                            :disabled="true"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="时间" label-width="120px" c>
                        <el-input
                            v-model="editForm.time"
                            autocomplete="off"
                            :disabled="true"
                        ></el-input>
                    </el-form-item>
                </div>
                <div class="form-row">
                    <el-form-item label="标题" label-width="120px" prop="title">
                        <el-input
                            v-model="editForm.title"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="介绍"
                        label-width="120px"
                        prop="introduction"
                    >
                        <el-input
                            v-model="editForm.introduction"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                </div>
                <div class="form-row-upload">
                    <el-form-item
                        label="markdown文件"
                        label-width="120px"
                        prop="fileName"
                        class="upload-container"
                    >
                        <div class="input-box">
                            <el-input
                                v-model="editForm.fileName"
                                autocomplete="off"
                                disabled
                            ></el-input>
                        </div>

                        <div class="upload-box">
                            <el-upload
                                class="upload-demo"
                                action="/api/upload"
                                :multiple="false"
                                :on-change="beforeUploadMd"
                                :auto-upload="false"
                                ref="uploadMd"
                            >
                                <el-button type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">
                                    只能上传jpg/png文件
                                </div>
                            </el-upload>
                        </div>
                    </el-form-item>
                    <el-form-item
                        label="封面"
                        label-width="120px"
                        prop="coverSrc"
                        class="upload-container"
                    >
                        <div class="input-box">
                            <el-input
                                v-model="editForm.coverSrc"
                                autocomplete="off"
                                disabled
                            ></el-input>
                        </div>

                        <div class="upload-box">
                            <el-upload
                                class="upload-demo"
                                action="/api/upload"
                                :multiple="false"
                                :on-change="beforeUploadCover"
                                :auto-upload="false"
                                ref="uploadImg"
                            >
                                <el-button type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">
                                    只能上传jpg/png文件
                                </div>
                            </el-upload>
                        </div>
                    </el-form-item>
                </div>
                <div class="form-row-tags">
                    <el-form-item label="分类" label-width="120px" prop="tags">
                        <el-select
                            v-model="editForm.tags"
                            multiple
                            placeholder="请选择"
                            filterable
                            allow-create
                            default-first-option
                        >
                            <el-option
                                v-for="(item, index) in editForm.allTags"
                                :key="index"
                                :label="item"
                                :value="item"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-popconfirm
                    confirm-button-text="好的"
                    cancel-button-text="不用了"
                    icon="el-icon-info"
                    icon-color="red"
                    title="确定修改吗？"
                    @confirm="editArticle"
                >
                    <el-button type="primary" slot="reference">确 定</el-button>
                </el-popconfirm>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { editArticle } from "@/api/admin";
import { alertInfo } from "@/utils/index";
export default {
    name: "editDialog",
    props: {
        editForm: Object,
    },
    computed: {
        editDialogVisible: {
            get() {
                return this.$store.state.editDialogVisible;
            },
            set(newVal) {
                this.$store.state.editDialogVisible = newVal;
            },
        },
    },
    data() {
        return {
            formRules: {
                title: [
                    { required: true, message: "请输入标题", trigger: "blur" },
                ],
                fileName: [
                    { required: true, message: "请上传文件", trigger: "blur" },
                ],
                coverSrc: [
                    { required: true, message: "请上传封面", trigger: "blur" },
                ],
                introduction: [
                    { required: true, message: "请输入简介", trigger: "blur" },
                ],
            },
        };
    },
    methods: {
        beforeUploadMd(file){
            const isMD = file.name.split(".").pop() === "md";
            if (!isMD) {
                alertInfo("文件只能md格式!", "error");
                return isMD;
            } else {
                // 读取文件内容
                const reader = new FileReader(); 
                reader.onload = (evt) => {
                    this.editForm["content"] = evt.target.result;
                };
                reader.readAsText(file.raw);
                this.editForm["fileName"] = file.name;
            }
        },
        beforeUploadCover(file) {
           const isJPG = file.raw.type === "image/jpeg" || file.raw.type === "image/png";
            if (!isJPG) {
                alertInfo("图片只能是jpg/png格式!","error");
                return isJPG;
            }
            else {
                this.editForm["coverSrc"] = file.name;
            }
        },
        editArticle() {
            this.$refs["editForm"].validate((valid) => {
                if (valid) {
                    this.editDialogVisible = false;
                    const data = {
                        articleID: this.editForm.articleID,
                        coverSrc: this.editForm.coverSrc,
                        fileName: this.editForm.fileName,
                        introduction: this.editForm.introduction,
                        tags: this.editForm.tags,
                        releaseTime: this.editForm.releaseTime,
                        title: this.editForm.title,
                        _id: this.editForm._id,
                    };
                    editArticle(data.articleID, data)
                        .then((res) => {
                            if (res.status === 200) {
                                alertInfo("修改成功", "success");
                                this.$refs.uploadImg.submit();
                                this.$refs.uploadMd.submit();
                                location.reload();
                            } else {
                                alertInfo("修改失败，请稍后重试", "error");
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
.form-row:not(:last-child) {
    display: flex;
    max-width: 100% !important;
    justify-content: center;
}
.form-row:not(:last-child) .el-form-item {
    width: 50%;
}

.upload-container > .el-form-item__content >div{
    flex: 1;
}
.upload-demo{
    display: flex;
}

</style>