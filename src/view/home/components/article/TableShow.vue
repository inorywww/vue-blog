<template>
    <div class="table-show">
        <el-row
            v-for="(items, index) in articleItems"
            :key="index"
            :gutter="40"
            class="article-list-row fadeInUp"
        >
            <el-col
                :span="8"
                v-for="(item, index1) in items"
                :key="index1"
                class="article-list-col"
            >
                <!-- <article-table-item :item="item" :key="index1" /> -->
                <table-article-item :item="item" :key="index1"/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import TableArticleItem from "./TableArticleItem";
import { handleScroll } from "@/utils/index";

export default {
    name: "AllAritcs",
    mounted() {
        const items = this.$store.state.allArticles;
        for (let i = 0; i < items.length; i += 3) {
            //push :三个为一组放进articleItems，filter:判断当前这一个是否为空
            this.articleItems.push(
                [items[i], items[i + 1], items[i + 2]].filter((item) => {
                    return item;
                })
            );
        }
        this.$nextTick(()=>{
             handleScroll();
        })
    },
    props: {
    },
    components: {
        TableArticleItem,
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
.table-show .article-list-row {
    margin-bottom: 30px;
}
</style>