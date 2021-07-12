<template>
    <div class="tag-container">
        <el-table :data="showTable" style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="tagID" label="ID" width="180">
            </el-table-column>
            <el-table-column prop="tagName" label="名字" width="180">
            </el-table-column>
            <el-table-column prop="totalNum" label="总数"> </el-table-column>
            <el-table-column class="actionBtns">
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
                                @click="deleteTag(scope.$index)"
                                >确 定</el-button
                            >
                        </span>
                    </el-dialog>
                    <el-button
                        size="mini"
                        type="danger"
                        slot="reference"
                        @click="dialogDelVisible = true"
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
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false"
                        >取 消</el-button
                    >
                    <el-popconfirm
                        confirm-button-text="好的"
                        cancel-button-text="不用了"
                        icon="el-icon-info"
                        icon-color="red"
                        title="确定修改吗？"
                        @confirm="editTag"
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
import { getAllTags } from "@/api/index";
export default {
    name: "dashboardTags",
    mounted() {
        getAllTags().then((res) => {
            this.allTags = res.data;
            console.log(this.allTags);
        });
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
        };
    },
    methods: {
        isEdit(index) {
            this.dialogFormVisible = true;
            this.editForm = this.showTable[index];
        },
        editTag() {
            this.dialogFormVisible = false;
        },
        deleteTag(index) {
            console.log(index);
            this.dialogDelVisible = false;
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