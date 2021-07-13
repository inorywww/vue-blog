<template>
    <div class="message-container">
        <el-table
            :data="showTable"
            style="width: 98%"
            @sort-change="sortChange"
            stripe
            @filter-change="filterTable"
        >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="ID" prop="id"> </el-table-column>
            <el-table-column label="类型" prop="messageType"
                :filter-multiple="false"
                :filters="filterArr"
                filter-placement="bottom-end"
            > </el-table-column>
            <el-table-column label="昵称" prop="info.username"> </el-table-column>
            <el-table-column label="邮箱" prop="info.email"></el-table-column>
            <el-table-column label="时间" prop="time" sortable> </el-table-column>
            <el-table-column label="留言内容" prop="info.content"> </el-table-column>
            <el-table-column label="所属id" prop="info.id">
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
                     <el-dialog title="提示" :visible.sync="dialogDelVisible" width="30%" center>  
                        <h1 style="text-align: center">确认要删除吗？该操作不可逆</h1>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogDelVisible = false">取 消</el-button>
                            <el-button type="danger" @click="deleteMessage">确 定</el-button>
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
    </div>
</template>

<script>
import { getMessage } from "@/api/index";
import { delMessage } from "@/api/admin";
import { compare, alertInfo } from "@/utils/index";
import moment from "moment";
export default {
    name: "dashboardMessages",
    mounted() {
        this.init();
    },
    updated() {},
    computed: {
        showTable:{
            get(){
                if(!this.isFilter){
                    const items = this.searchContent === ""? this.allMessages : this.allMessages.filter((data) => {
                        return data.info.content.toLowerCase().includes(this.searchContent.toLowerCase());
                    });
                    return items.slice((this.currentPageIndex - 1) * this.pageSize,this.currentPageIndex * this.pageSize);
                }
                else{
                    return this.filterTables.slice((this.currentPageIndex - 1) * this.pageSize,this.currentPageIndex * this.pageSize);
                }
                },
            set(newVal){
                console.log(newVal);            
            }
        },
        totalPage: {
            get() {
                 if(!this.isFilter){
                    return this.searchContent === ""
                        ? this.allMessages.length
                        : this.allMessages.filter((data) => {
                            return data.info.content
                                .toLowerCase()
                                .includes(this.searchContent.toLowerCase());
                        }).length;
                 }
                 else{
                     return this.filterTables.length;
                 }
            },
            set(newSize) {
                this.totalPage = newSize;
            },
        },
    },
    data() {
        return {
            allMessages: [],
            searchContent: "",
            pageSize: 5,
            currentPageIndex: 1,
            dialogDelVisible:false,
            delIndex:0,
            isFilter:false,
            filterTables:[],
            filterArr:[
                    {text: '文章留言', value: '文章留言'}, 
                    {text: '碎语留言', value: '碎语留言'}, 
                    {text: '单独留言', value: '单独留言'}
                ]
        };
    },
    components: {},
    methods: {
        filterTable(filters){
            const messageType = filters['el-table_1_column_3'][0];
            if(!messageType){
                this.isFilter = false;
            }
            else{
                this.isFilter = true;
                this.filterTables = this.allMessages.filter(item => {
                    return item.messageType === messageType;
                })
            }
        },
        init(){
            getMessage().then((res) => {
                if(res.status === 200){
                    this.allMessages = res.data;
                    this.allMessages.forEach((item) => {
                        item["time"] = moment(item.info.time).format("YYYY-MM-DD");
                        if(item.type === 'articleMessage'){
                            item["messageType"] = '文章留言';
                        }else if(item.type === 'saysMessage'){
                            item["messageType"] = '碎语留言';
                        }else if(item.type === 'guestMessage'){
                            item["messageType"] = '单独留言';
                        }
                    });
                }
                else{
                    alertInfo('获取文章列表失败，请稍后重试','error')
                }
            }).catch(err => alertInfo(err,'error'));
        },
        isDel(index){
            this.dialogDelVisible=true;
            this.delIndex = index;
        },
        deleteMessage() {
            delMessage(this.showTable[this.delIndex].id)
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
            this.allMessages = this.allMessages.sort(
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