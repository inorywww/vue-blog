<template>
    <div class="releaseSay">
        <div class="title">
            <h1>发布碎碎念</h1>
        </div>
        <main>
            <el-form :model="releaseForm" :rules="formRules" ref="releaseForm">
                <div class="form-row">
                    <el-form-item
                        label="内容"
                        label-width="120px"
                        prop="content"
                    >
                        <el-input
                            type="textarea"
                            v-model="releaseForm.content"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="封面"
                        label-width="120px"
                        prop="coverSrc"
                        class="upload-container"
                    >
                        <el-upload
                            class="upload-demo"
                            drag
                            action="/api/say/upload"
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
                                仅支持jpg/png文件
                            </div>
                        </el-upload>
                    </el-form-item>
                </div>
            </el-form>
        </main>
        <footer class="release">
            <el-button type="primary" @click="dialogVisible = true"
                >发布</el-button
            >
        </footer>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <h1>确认要发布吗？</h1>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="release">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { addSay } from "@/api/admin";
import { alertInfo } from "@/utils/index";
export default {
    name: "releaseSay",
    mounted() {},
    data() {
        return {
            formRules: {
                content: [
                    { required: true, message: "请输入内容", trigger: "blur" },
                ],
            },
            releaseForm: {},
            dialogVisible: false,
        };
    },
    methods: {
        release() {
            this.dialogVisible = false;
            this.$refs["releaseForm"].validate((valid) => {
                if (valid) {
                    addSay(this.releaseForm)
                        .then((res) => {
                            if (res.status === 200) {
                                alertInfo("发布成功~", "success");
                                this.releaseForm = {};
                                this.$refs.upload.submit();
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
        beforeFileUpload(file){
            const isJPG = file.raw.type === "image/jpeg" || file.raw.type === "image/png";
            if (!isJPG) {
                alertInfo("图片只能是jpg/png格式!","error");
                return isJPG;
            }
            else{
                this.releaseForm["coverSrc"] = file.name;
            }
        },
    },
};
</script>

<style scoped>
.title h1 {
    font-size: 2.5rem;
    text-align: center;
}
.releaseSay {
    width: 70%;
    margin: 0 auto;
}
.release {
    text-align: center;
}
</style>