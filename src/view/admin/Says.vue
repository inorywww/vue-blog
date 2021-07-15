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
        <say-dialog :editForm="editForm"/>
    </div>
</template>

<script>
import { getAllSays } from "@/api/index";
import { delSay, editSay } from "@/api/admin";
import { compare, alertInfo } from "@/utils/index";
import moment from "moment";
import SayDialog from './components/SayDialog.vue';
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
    components: {SayDialog},
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
            this.$store.state.SayDialogVisible = true;
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