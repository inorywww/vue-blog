<template>
    <div class="article-container">
        <el-table
            :data="showTable"
            style="width: 98%"
            @sort-change="sortChange"
            stripe
        >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="ID" prop="articleID"> </el-table-column>
            <el-table-column label="标题" prop="title"> </el-table-column>
            <el-table-column label="时间" prop="time" sortable></el-table-column>
            <el-table-column label="分类" prop="tag"> </el-table-column>
            <el-table-column label="文件名" prop="fileName"> </el-table-column>
            <el-table-column label="介绍" prop="introduction">
            </el-table-column>
            <el-table-column align="right" class="actionBtns">
                <template slot="header" slot-scope="scope">
                    <el-input
                        v-model="searchContent"
                        size="mini"
                        placeholder="输入关键字搜索"
                        @change="scope"
                    />
                </template>
                <template slot-scope="scope">
                    <el-button
                        class="edit-btn"
                        size="mini"
                        @click="isEdit(scope.$index)"
                        style="margin-right:12px"
                    >编辑</el-button>
                     <el-dialog title="提示" :visible.sync="dialogDelVisible" width="30%" center>  
                        <h1 style="text-align: center">确认要删除吗？该操作不可逆</h1>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogDelVisible = false">取 消</el-button>
                            <el-button type="danger" @click="deleteArticle(scope.$index)">确 定</el-button>
                        </span>
                    </el-dialog>
                    <el-button
                    size="mini"
                    type="danger"
                    slot="reference"
                    @click="dialogDelVisible=true"
                    >删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="totalPage"
            :hide-on-single-page="true"
        >
        </el-pagination>
        <div class="editDialog">
            <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
                <el-form :model="editForm" :rules="formRules" ref="editForm">
                    <div class="form-row">
                        <el-form-item label="ID" label-width="120px">
                            <el-input v-model="editForm.articleID" autocomplete="off" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="时间" label-width="120px" c>
                            <el-input v-model="editForm.time" autocomplete="off" :disabled="true"></el-input>
                        </el-form-item>
                    </div>
                    <div class="form-row">
                         <el-form-item label="标题" label-width="120px" prop="title">
                            <el-input v-model="editForm.title" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="markdown文件" label-width="120px" prop="fileName" class="upload-container">
                            <el-input v-model="editForm.fileName" autocomplete="off"></el-input>
                            <el-button type="primary">上传</el-button>
                        </el-form-item>
                    </div>
                     <div class="form-row">
                        <el-form-item label="封面链接" label-width="120px" prop="coverSrc" class="upload-container">
                            <el-input v-model="editForm.coverSrc" autocomplete="off"></el-input>
                            <el-button type="primary">上传</el-button>
                        </el-form-item>
                        <el-form-item label="介绍" label-width="120px" prop="introduction">
                            <el-input v-model="editForm.introduction" autocomplete="off"></el-input>
                        </el-form-item>
                    </div>
                    <div class="form-row">
                        <el-form-item label="分类" label-width="120px" prop="tags">
                             <el-select
                                v-model="editForm.tags"
                                multiple
                                placeholder="请选择">
                                    <el-option
                                    v-for="(item,index) in editForm.allTags"
                                    :key="index"
                                    :label="item"
                                    :value="item">
                                    </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible=false">取 消</el-button>
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
    </div>
</template>

<script>
import { getAllArticle, getAllTags } from "@/api/index";
import { delArticle, editArticle } from "@/api/admin";
import { compare, alertInfo } from "@/utils/index";
import moment from "moment";
export default {
    name: "dashboardArticles",
    mounted() {
        this.init();
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
    updated() {},
    computed: {
        showTable() {
            const items =
                this.searchContent === ""
                    ? this.allArticles
                    : this.allArticles.filter((data) => {
                          return data.title
                              .toLowerCase()
                              .includes(this.searchContent.toLowerCase());
                      });
            return items.slice(
                (this.currentPageIndex - 1) * this.pageSize,
                this.currentPageIndex * this.pageSize
            );
        },
        totalPage: {
            get() {
                return this.searchContent === ""
                    ? this.allArticles.length
                    : this.allArticles.filter((data) => {
                          return data.title
                              .toLowerCase()
                              .includes(this.searchContent.toLowerCase());
                      }).length;
            },
            set(newSize) {
                this.totalPage = newSize;
            },
        },
    },
    data() {
        return {
            allArticles: [],
            allTags:[],
            searchContent: "",
            pageSize: 5,
            currentPageIndex: 1,
            dialogFormVisible: false,
            dialogDelVisible:false,
            editForm: {
            },
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
        };
    },
    components: {},
    methods: {
        init(){
            getAllArticle().then((res) => {
                if(res.status === 200){
                    this.allArticles = res.data;
                    this.allArticles.forEach((item) => {
                        item["time"] = moment(item.releaseTime).format("YYYY-MM-DD");
                        let tt = "";
                        item.tags.forEach(t => tt += `${t}/`);
                        item["tag"] = tt;
                    });
                }
                else{
                    alertInfo('获取文章列表失败，请稍后重试','error')
                }
            }).catch(err => alertInfo(err,'error'));
        },
        isEdit(index){
            this.dialogFormVisible = true;
            this.editForm = this.showTable[index];
            this.editForm['allTags'] = this.allTags;
           
        },
        editArticle() {
            this.$refs['editForm'].validate((valid) => {
                if (valid) {
                    this.dialogFormVisible = false;
                    const data = {
                        articleID:this.editForm.articleID,
                        coverSrc:this.editForm.coverSrc,
                        fileName:this.editForm.fileName,
                        introduction:this.editForm.introduction,
                        tags:this.editForm.tags,
                        releaseTime:this.editForm.releaseTime,
                        title:this.editForm.title,
                        _id:this.editForm._id,
                    }
                    editArticle(data.articleID,data).then(res => {
                        if(res.status === 200){
                            alertInfo('修改成功','success');
                            this.init();
                        }
                        else{
                            alertInfo('修改失败，请稍后重试','error')
                        }
                    }).catch((err) => alertInfo(err, 'error'));
                }
                else {
                    alertInfo('发布失败！请正确填写字段！','error');
                    return false;
                }
            });
        },
        deleteArticle(index) {
            delArticle(this.showTable[index].articleID)
                .then(res => {
                    if(res.status === 200){
                        alertInfo('删除成功', 'success');
                        this.dialogDelVisible = false;
                        this.init();
                    }
                    else{
                        alertInfo('删除失败，请稍后重试','error')
                    }
                }).catch((err) => alertInfo(err, 'error'));
        },
        handleCurrentChange(currentPageIndex) {
            this.currentPageIndex = currentPageIndex;
        },
        sortChange({ order }) {
            this.allArticles = this.allArticles.sort(
                compare("releaseTime", order)
            );
        },
    },
};
</script>

<style scoped>
.el-table_1_column_8 .cell{
    display: flex;
    justify-content: center;
    
}
.form-row:not(:last-child){
    display: flex;
    max-width: 100% !important;
    justify-content: center;
}
.form-row:not(:last-child) .el-form-item{
    width: 50%;
}
.upload-container .el-form-item__content{
    display: flex !important;
}
</style>