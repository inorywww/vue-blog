<template>
    <div class="list-show">
        <el-row
            v-for="(item, index) in articleItems"
            :key="index"
            class="article-list-row fadeInUp"
        >
            <list-article-item :item="item"/>
        </el-row>
    </div>
</template>

<script>
import ListArticleItem from "./ListArticleItem";
import { handleScroll } from "@/utils/index";

export default {
    name: "AllAritcs",
    mounted() {
        this.articleItems = this.$store.state.allArticles;
        this.$nextTick(()=>{
             handleScroll();
        })
    },
    props: {
    },
    components: {
        ListArticleItem,
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
.list-show{
}
</style>