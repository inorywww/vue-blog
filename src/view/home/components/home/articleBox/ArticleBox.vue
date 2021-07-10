<template>
    <div class="articles-box">
        <div class="article-box-title">
            <div class="box-title">
                <h1>文章</h1>
            </div>
        </div>
        <div class="article-box-content">
            <template v-for="(item, index) in articleItems">
                <article-item :item="item" :key="index" />
            </template>
        </div>
    </div>
</template>

<script>
import ArticleItem from "@/view/home/components/home/articleBox/ArticleItem";
import { getAllArticle } from "@/api/index";
export default {
    name: "ArticleBox",
    mounted() {
        getAllArticle().then((res) => {
            if (res.status == 200) {
                this.articleItems = res.data.slice(0,6);
                // this.$store.state.allArticles = res.data;
            }
        }).catch(err => {
            console.log(err);
        });
        
    },
    components: {
        ArticleItem,
    },
    data() {
        return {
            articleItems: [],
        };
    },
    methods: {},
};
</script>

<style scoped>
.articles-box .article-box-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

</style>
