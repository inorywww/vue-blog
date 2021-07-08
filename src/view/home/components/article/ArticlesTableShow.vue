<template>
    <div class="table-show">
        <template v-for="(item, index) in articleItems">
            <table-item class="article-item" :item="item" :key="index"/>
        </template>
    </div>
</template>

<script>
    import TableItem from "@/view/home/components/showItem/TableItem";
    import {getAllArticle} from "@/api";
    export default {
        name: "AllAritcs",
        mounted() {
            getAllArticle().then((res) => {
                    if (res.status == 200) {
                        this.articleItems = res.data;
                    }
                }).catch((err) => {
                    console.log(err);
                });
        },
        props: {},
        components: {
            TableItem,
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