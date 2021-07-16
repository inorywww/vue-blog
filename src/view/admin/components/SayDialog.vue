<template>
    <div class="editDialog">
        <el-dialog title="编辑信息" :visible.sync="SayDialogVisible">
            <el-form :model="editForm" :rules="formRules" ref="editForm">
                <div class="form-row">
                    <el-form-item label="ID" label-width="120px">
                        <el-input
                            v-model="editForm.sayID"
                            autocomplete="off"
                            :disabled="true"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="时间" label-width="120px">
                        <el-input
                            v-model="editForm.time"
                            autocomplete="off"
                            :disabled="true"
                        ></el-input>
                    </el-form-item>
                </div>
                <div class="form-row">
                    <el-form-item label="发布人" label-width="120px">
                        <el-input
                            v-model="editForm.userName"
                            autocomplete="off"
                            :disabled="true"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="身份" label-width="120px">
                        <el-input
                            v-model="editForm.userIdentity"
                            autocomplete="off"
                            :disabled="true"
                        ></el-input>
                    </el-form-item>
                </div>
                <div class="form-row">
                    <el-form-item
                        label="内容"
                        label-width="120px"
                        prop="content"
                    >
                        <el-input
                            v-model="editForm.content"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="封面链接"
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
                                action="/api/say/upload"
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
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="SayDialogVisible = false">取 消</el-button>
                <el-popconfirm
                    confirm-button-text="好的"
                    cancel-button-text="不用了"
                    icon="el-icon-info"
                    icon-color="red"
                    title="确定修改吗？"
                    @confirm="editSay"
                >
                    <el-button type="primary" slot="reference">确 定</el-button>
                </el-popconfirm>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { editSay } from "@/api/admin";
import { alertInfo } from "@/utils/index";
export default {
    name: "sayDialog",
    props: {
        editForm: Object,
    },
    computed: {
        SayDialogVisible: {
            get() {
                return this.$store.state.SayDialogVisible;
            },
            set(newVal) {
                this.$store.state.SayDialogVisible = newVal;
            },
        },
    },
    data() {
        return {
            formRules: {
                coverSrc: [
                    { required: true, message: "请上传封面", trigger: "blur" },
                ],
                content: [
                    { required: true, message: "请输入内容", trigger: "blur" },
                ],
            },
        };
    },
    methods: {
        beforeUploadCover(file) {
            const isJPG = file.raw.type === "image/jpeg" || file.raw.type === "image/png";
            if (!isJPG) {
                alertInfo("图片只能是jpg/png格式!", "error");
                return isJPG;
            } else {
                this.editForm["coverSrc"] = file.name;
            }
        },
        editSay() {
            this.$refs["editForm"].validate((valid) => {
                if (valid) {
                    this.SayDialogVisible = false;
                    const data = {
                        sayID: this.editForm.sayID,
                        content: this.editForm.content,
                        coverSrc: this.editForm.coverSrc,
                        releaseTime: this.editForm.releaseTime,
                        _id: this.editForm._id,
                    };
                    editSay(data.sayID, data)
                        .then((res) => {
                            if (res.status === 200) {
                                alertInfo("修改成功", "success");
                                this.$refs.uploadImg.submit();
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
.upload-container > .el-form-item__content >div{
    flex: 1;
}
.upload-box{
    display: flex;
}
</style>