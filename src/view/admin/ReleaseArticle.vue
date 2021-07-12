<template>
    <div class="releaseArticle">
        <div class="title">
            <h1>发布文章</h1>
        </div>
        <main>
            <el-form :model="releaseForm" :rules="formRules" ref="releaseForm">
                    <el-form-item label="标题" label-width="120px" prop="title">
                        <el-input
                            v-model="releaseForm.title"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="markdown文件"
                        label-width="120px"
                        class="upload-container"
                        prop="fileName"
                    >
                        <el-input
                            v-model="releaseForm.fileName"
                            autocomplete="off"
                        ></el-input>
                        <el-button type="primary" class="upload-btn">上传</el-button>
                    </el-form-item>
                    <el-form-item
                        label="封面链接"
                        label-width="120px"
                        class="upload-container"
                        prop="coverSrc"
                    >
                        <el-input
                            v-model="releaseForm.coverSrc"
                            autocomplete="off"
                        ></el-input>
                        <el-button type="primary" class="upload-btn">上传</el-button>
                    </el-form-item>
                    <el-form-item label="介绍" label-width="120px" prop="introduction">
                        <el-input
                            v-model="releaseForm.introduction"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="分类" label-width="120px" prop="tags">
                        <el-select
                            v-model="releaseForm.newTags"
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
            <el-button type="primary" @click="dialogVisible = true" >发布</el-button>
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
import { getAllTags } from "@/api/index";
import { releaseArticle } from "@/api/admin";
import { alertInfo } from "@/utils/index";
export default {
    name: "releaseArticle",
    mounted(){
         getAllTags().then(res => {
            if(res.status === 200){
                res.data.forEach(item => {
                    this.allTags.push(item.tagName);
                });
            }
            else{
                alertInfo('获取分类列表失败，请稍后重试','error')
            }
        }).catch(err => alertInfo(err,'error'))
    },
    data() {
        return {
            formRules:{
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' },
                ],
                fileName: [
                    { required: true, message: '请上传文件', trigger: 'blur' }
                ],
                coverSrc: [
                    { required: true, message: '请上传封面', trigger: 'blur' }
                ],
                introduction: [
                    { required: true, message: '请输入简介', trigger: 'blur' }
                ],
                tags: [
                    { type: 'array', required: false, message: '请至少选择一个tag', trigger: 'change' }
                ],
            },
            releaseForm: {},
            allTags:[],
            dialogVisible:false
        };
    },
    methods: {
        release() {
            this.dialogVisible = false;
            this.$refs['releaseForm'].validate((valid) => {
                if (valid) {
                    releaseArticle(this.releaseForm)
                        .then(res => {
                            if(res.status === 200){
                                alertInfo('发布成功~','success');
                                this.releaseForm = {};
                            }
                            else{
                                alertInfo('发布失败！请稍后重试','error');
                            }
                        }).catch(err => alertInfo(err,'error'));
                } else {
                    alertInfo('发布失败！请正确填写字段！','error');
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
    text-align: center;
}
.releaseArticle {
    width: 70%;
    margin: 0 auto;
}
.release{
    text-align: center;
}

</style>