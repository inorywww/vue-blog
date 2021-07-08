<template>
    <div class="table-show">
       <template v-for="(item, index) in archiveItems">
            <table-item class="article-item" :item="item" :key="index"/>
        </template>
    </div>
</template>

<script>
import TableItem from "@/view/home/components/showItem/TableItem";
import { getAllArticle } from "@/api";
import { getYearMouth } from "@/utils";

export default {
    name: "archiveTableShow",
    components: { TableItem },
    async mounted() {
        await getAllArticle().then((res) => {
            this.archiveItems = res.data.filter(item => getYearMouth(item.releaseTime) === this.$route.query.time);
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
    .table-show{
        display: flex;
        flex-wrap: wrap;
    }
    @media (max-width:699px){
        .article-item{
           width: 100%;
       }
    }
    @media (min-width:700px) and (max-width:1300px){
        .article-item{
            width: 50%;
       }
    }
     @media(min-width:1300px){
        .article-item{
            width: 33%;
       }
    }
</style>