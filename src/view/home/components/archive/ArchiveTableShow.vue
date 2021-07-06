<template>
    <div class="table-show">
        <el-row
            v-for="(items, index) in archiveItems"
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
            <template v-if="archiveItems.length">
                <table-item :item="item" :key="index1" />
            </template>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import TableItem from "@/view/home/components/showItem/TableItem";
import { handleScroll } from "@/utils/index";
import { getAllArticle } from "@/api";
import { getYear } from "@/utils";

export default {
    name: "archiveTableShow",
    components: { TableItem },
    async mounted() {
        let sameYearItems = [];
        await getAllArticle().then((res) => {
            sameYearItems = res.data.filter((item) => {
                //找出相同年份的文章，分别存在sameYearItems
                return (getYear(item.releaseTime) === this.$route.params.yearName);
            });
        });
        let sameMouthItems = [];
        for (let i = 0; i < sameYearItems.length; i+=3) {
            //找出相同月份的文章，分别存在sameYearItems
            sameMouthItems.push([sameYearItems[i], sameYearItems[i + 1], sameYearItems[i + 2]].filter(item => item));
        }
        this.archiveItems = sameMouthItems
        this.$nextTick(() => {
            handleScroll();
        });
    },
    data() {
        return {
            archiveItems: [],
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