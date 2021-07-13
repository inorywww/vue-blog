<template>
    <div class="tag-container">
        <el-table :data="showTable" style="width: 100%">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="tagID" label="ID" width="180">
            </el-table-column>
            <el-table-column prop="tagName" label="名字" width="180">
            </el-table-column>
            <el-table-column prop="totalNum" label="总数"> </el-table-column>
            <el-table-column class="actionBtns">
                <template slot="header" slot-scope="scope">
                    <div class="right-header" style="display:flex">
                        <el-button type="primary" style="margin-right:12px" @click="isAdd">添加</el-button>
                        <el-input
                        v-model="searchContent"
                        placeholder="输入关键字搜索"
                        @change="scope"
                        />
                    </div>
                </template>
                <template slot-scope="scope">
                    <el-button
                        class="edit-btn"
                        size="mini"
                        @click="isEdit(scope.$index)"
                        style="margin-right: 12px"
                        >编辑</el-button
                    >
                    <el-dialog
                        title="提示"
                        :visible.sync="dialogDelVisible"
                        width="30%"
                        center
                    >
                        <h1 style="text-align: center">
                            确认要删除吗？该操作不可逆
                        </h1>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogDelVisible = false"
                                >取 消</el-button
                            >
                            <el-button
                                type="danger"
                                @click="deleteTag"
                                >确 定</el-button
                            >
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
            <el-dialog :title="editOrAdd.title" :visible.sync="dialogFormVisible">
                <el-form :model="editForm" :rules="formRules" ref="editForm">
                    <el-form-item label="ID" label-width="120px">
                        <el-input v-model="editForm.tagID" autocomplete="off" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="数量" label-width="120px">
                        <el-input v-model="editForm.totalNum" autocomplete="off" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="名称" label-width="120px" prop="tagName">
                        <el-input v-model="editForm.tagName" autocomplete="off" ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false"
                        >取 消</el-button
                    >
                    <el-popconfirm
                        confirm-button-text="好的"
                        cancel-button-text="不用了"
                        icon="el-icon-info"
                        icon-color="red"
                        :title="`确定要${this.editOrAdd.title.slice(0,2)}吗?`"
                        @confirm="editTagOrAdd"
                    >
                        <el-button type="primary" slot="reference"
                            >确 定</el-button
                        >
                    </el-popconfirm>
                </div>
            </el-dialog>
        </div>

    </div>
</template>

<script>
import { alertInfo } from "@/utils/index";
import { getAllTags } from "@/api/index";
import { addTag, editTag, delTag } from "@/api/admin";
export default {
    name: "dashboardTags",
    mounted() {
        this.init();
    },
    computed: {
        showTable() {
            const items =
                this.searchContent === ""
                    ? this.allTags
                    : this.allTags.filter((data) => {
                          return data.tagName
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
                    ? this.allTags.length
                    : this.allTags.filter((data) => {
                          return data.tagName
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
            allTags: [],
            searchContent: "",
            pageSize: 5,
            currentPageIndex: 1,
            dialogDelVisible: false,
            dialogFormVisible: false,
            editForm:{},
            delIndex: 0,
            editIndex: 0,
            editOrAdd:{
                title:'编辑标签',
            },
            formRules:{
                tagName: [
                    { required: true, message: '请输入标签名', trigger: 'blur' },
                ],
            },
        };
    },
    methods: {
        init(){
            getAllTags().then((res) => {
                this.allTags = res.data;
            });
        },
        isAdd(){
            this.editOrAdd.title = '添加标签';
            this.dialogFormVisible = true;
            this.editForm = {};
        },
        isEdit(index) {
            this.editOrAdd.title = '编辑标签';
            this.dialogFormVisible = true;
            this.editForm = this.showTable[index];
            this.editForm['oldTagName'] = this.allTags[index].tagName;
        },
        // 根据不同的操作，add或者edit，调用不同的接口。
        editTagOrAdd() {
            this.$refs['editForm'].validate((valid) => {
                if (valid) {
                    if(this.editOrAdd.title === '编辑标签'){
                        editTag(this.editForm,this.editForm.tagID)
                        .then(res => {
                            if(res.status === 200){
                                alertInfo('编辑成功！','success');
                                this.init();
                            }
                            else{
                                alertInfo('编辑失败，请稍后重试！','error');
                            }
                        }).catch(err => alertInfo(err,'error'))
                    }
                    else if(this.editOrAdd.title === '添加标签'){
                        addTag(this.editForm).then(res => {
                             if(res.status === 200){
                                alertInfo('添加成功！','success');
                                this.init();
                            }
                            else{
                                alertInfo('添加失败，请稍后重试！','error');
                            }
                        })
                    }
                this.dialogFormVisible = false;
                }
                else{
                    alertInfo('请输入必填字段！','error');
                }
            });        
        },
        isDel(index){
            this.delIndex = index;
            this.dialogDelVisible = true;
        },
        deleteTag() {
            this.dialogDelVisible = false;
            delTag(this.allTags[this.delIndex].tagID)
                .then(res => {
                    if(res.status === 200){
                        alertInfo('删除成功！','success');
                        this.init();
                    }
                    else{
                        alertInfo('删除失败，请稍后重试！','error');
                    }
                }).catch(err => alertInfo(err,'error'))
        },
        handleCurrentChange(currentPageIndex) {
            this.currentPageIndex = currentPageIndex;
        },
    },
};
</script>

<style scoped>
.tag-container {
    width: 50% !important;
    margin: 0 auto;
}
</style>