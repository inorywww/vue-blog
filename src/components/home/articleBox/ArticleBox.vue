<template>
    <div class="articles-box">
        <div class="article-box-title">
            <div class="box-title">
                <h4>全部文章</h4>
            </div>
            <div class="showFormat">
                <el-switch
                        v-model="showFormatValue"
                        active-color="var(--themeFontColor)"
                        inactive-color="rgba(207,207,207,.4)"
                >
                </el-switch>
                <a>列表显示</a>
            </div>
        </div>
        <div class="article-box-content">
            <template v-for="(item, index) in articleItems">
                <article-item :item="item" :key="index"/>
            </template>
        </div>
    </div>
</template>

<script>
    import ArticleItem from "@/components/home/articleBox/ArticleItem";

    export default {
        name: "ArticleBox",
        mounted() {
            this.axios.get('http://localhost:3000/articleItems').then(res => {
                this.articleItems = res.data;
            }).catch(err => {
                console.error(err)
            })
        },
        components: {
            ArticleItem
        },
        data() {
            return {
                showFormatValue: false,
                articleItems: [],
            }
        },
        methods: {
        },
    }
</script>

<style scoped>
    .articles-box .article-box-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }

    .article-box-title .showFormat {
        display: flex;
        align-items: center;
    }

    .article-box-title .showFormat .el-switch {
        padding-right: 8px;
    }
</style>
