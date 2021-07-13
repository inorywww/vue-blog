<template>
    <div class="say-container">
        <el-table
            :data="showTable"
            style="width: 98%"
            @sort-change="sortChange"
            stripe
        >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="ID" prop="sayID"> </el-table-column>
            <el-table-column label="发布人" prop="userName"> </el-table-column>
            <el-table-column label="时间" prop="time" sortable></el-table-column>
            <el-table-column label="身份" prop="userIdentity"> </el-table-column>
            <el-table-column label="内容" prop="content"></el-table-column>
            <el-table-column label="封面" prop="coverSrc"></el-table-column>
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
                            <el-button type="danger" @click="deleteSay">确 定</el-button>
                        </span>
                    </el-dialog>
                    <el-button
                    size="mini"
                    type="danger"
                    slot="reference"
                    @click="isDel(scope.$index)"
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
                            <el-input v-model="editForm.sayID" autocomplete="off" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="时间" label-width="120px">
                            <el-input v-model="editForm.time" autocomplete="off" :disabled="true"></el-input>
                        </el-form-item>
                    </div>
                    <div class="form-row">
                         <el-form-item label="发布人" label-width="120px">
                            <el-input v-model="editForm.userName" autocomplete="off" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="身份" label-width="120px">
                            <el-input v-model="editForm.userIdentity" autocomplete="off" :disabled="true"></el-input>
                        </el-form-item>
                    </div>
                     <div class="form-row">
                        <el-form-item label="内容" label-width="120px" prop="content">
                            <el-input v-model="editForm.content" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="封面链接" label-width="120px" prop="coverSrc" class="upload-container">
                            <el-input v-model="editForm.coverSrc" autocomplete="off"></el-input>
                            <el-button type="primary">上传</el-button>
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
                        @confirm="editSay"
                    >
                        <el-button type="primary" slot="reference">确 定</el-button>
                    </el-popconfirm>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { getAllSays } from "@/api/index";
import { delSay, editSay } from "@/api/admin";
import { compare, alertInfo } from "@/utils/index";
import moment from "moment";
export default {
    name: "dashboardSays",
    mounted() {
        this.init();
    },
    updated() {},
    computed: {
        showTable() {
            const items =this.searchContent === "" ? this.allSays
                    : this.allSays.filter((data) => {
                          return data.content.toLowerCase().includes(this.searchContent.toLowerCase());
                      });
            return items.slice(
                (this.currentPageIndex - 1) * this.pageSize,
                this.currentPageIndex * this.pageSize
            );
        },
        totalPage: {
            get() {
                return this.searchContent === ""
                    ? this.allSays.length
                    : this.allSays.filter((data) => {
                          return data.content.toLowerCase().includes(this.searchContent.toLowerCase());
                      }).length;
            },
            set(newSize) {
                this.totalPage = newSize;
            },
        },
    },
    data() {
        return {
            allSays: [],
            searchContent: "",
            pageSize: 5,
            currentPageIndex: 1,
            dialogFormVisible: false,
            dialogDelVisible:false,
            editForm: {
            },
            delIndex:0,
            formRules:{
                coverSrc: [
                    { required: true, message: '请上传封面', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请输入内容', trigger: 'blur' }
                ],
            },
        };
    },
    components: {},
    methods: {
        init(){
            getAllSays().then((res) => {
                if(res.status === 200){
                    this.allSays = res.data;
                    this.allSays.forEach((item) => {
                        item["time"] = moment(item.releaseTime).format("YYYY-MM-DD");
                    });
                }
                else{
                    alertInfo('获取文章列表失败，请稍后重试','error')
                }
            }).catch(err => alertInfo(err,'error'));
        },
        isEdit(index){
            this.dialogFormVisible = true;
            this.editForm = JSON.parse(JSON.stringify(this.showTable[index]));
        },
        editSay() {
            this.$refs['editForm'].validate((valid) => {
                if (valid) {
                    this.dialogFormVisible = false;
                    const data = {
                        sayID:this.editForm.sayID,
                        content:this.editForm.content,
                        coverSrc:this.editForm.coverSrc,
                        releaseTime:this.editForm.releaseTime,
                        _id:this.editForm._id,
                    }
                    editSay(data.sayID,data).then(res => {
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
        isDel(index){
            this.dialogDelVisible=true
            this.delIndex = index;
        },
        deleteSay() {
            delSay(this.showTable[this.delIndex].sayID)
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
            this.allSays = this.allSays.sort(
                compare("releaseTime", order)
            );
        },
    },
}
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