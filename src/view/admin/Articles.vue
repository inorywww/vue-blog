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
            <el-table-column
                label="时间"
                prop="time"
                sortable
            ></el-table-column>
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
                            <el-button type="danger" @click="deleteArticle"
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
        <!-- 编辑 !-->
        <edit-dialog :editForm="editForm"/>
    </div>
</template>

<script>
import { getAllArticle, getAllTags } from "@/api/index";
import { delArticle } from "@/api/admin";
import { compare, alertInfo } from "@/utils/index";
import moment from "moment";
import EditDialog from './components/EditDialog';
export default {
    name: "dashboardArticles",
    mounted() {
        this.init();
        getAllTags()
            .then((res) => {
                if (res.status === 200) {
                    res.data.forEach((item) => {
                        this.allTags.push(item.tagName);
                    });
                } else {
                    alertInfo("获取分类列表失败，请稍后重试", "error");
                }
            })
            .catch((err) => alertInfo(err, "error"));
    },
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
            allTags: [],
            searchContent: "",
            pageSize: 5,
            currentPageIndex: 1,
            dialogDelVisible: false,
            delIndex: 0,
            editForm:{}
        };
    },
    components: {EditDialog},
    methods: {
        init() {
            getAllArticle()
                .then((res) => {
                    if (res.status === 200) {
                        this.allArticles = res.data;
                        this.allArticles.forEach((item) => {
                            item["time"] = moment(item.releaseTime).format(
                                "YYYY-MM-DD"
                            );
                            let tt = "";
                            item.tags.forEach((t) => (tt += `${t}/`));
                            item["tag"] = tt;
                        });
                    } else {
                        alertInfo("获取文章列表失败，请稍后重试", "error");
                    }
                })
                .catch((err) => alertInfo(err, "error"));
        },
        isEdit(index) {
            this.$store.state.editDialogVisible = true;
            this.editForm = JSON.parse(JSON.stringify(this.showTable[index]));
            this.editForm["allTags"] = this.allTags;
        },
        isDel(index) {
            this.dialogDelVisible = true;
            this.delIndex = index;
        },
        deleteArticle() {
            delArticle(this.showTable[this.delIndex].articleID)
                .then((res) => {
                    if (res.status === 200) {
                        alertInfo("删除成功", "success");
                        this.dialogDelVisible = false;
                        this.init();
                    } else {
                        alertInfo("删除失败，请稍后重试", "error");
                    }
                })
                .catch((err) => alertInfo(err, "error"));
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
.el-table_1_column_8 .cell {
    display: flex;
    justify-content: center;
}
.upload-container .el-form-item__content {
    display: flex !important;
}
</style>