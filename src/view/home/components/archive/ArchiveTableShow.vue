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
import { getYearMouth } from "@/utils";

export default {
    name: "archiveTableShow",
    components: { TableItem },
    async mounted() {
        let items = [];
        await getAllArticle().then((res) => {
            items = res.data.filter(item => getYearMouth(item.releaseTime) === this.$route.query.time);
        });
        for(let i = 0;i < items.length; i += 3){
            this.archiveItems.push([items[i],items[i+1],items[i+2]].filter((item) => {
                return item;
            }))
        }
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