<template>
    <div class="table-show">
        <template v-for="(item, index) in tagArticles">
            <table-item class="article-item" :item="item" :key="index"/>
        </template>
    </div>
</template> 

<script>
    import TableItem from "@/view/home/components/showItem/TableItem";
    import {getAllArticle} from "@/api";

    export default {
        name: "tagTableShow",
        components: {TableItem},
        async mounted() {
            getAllArticle().then((res) => {
                if (res.status == 200) {
                    this.tagArticles = res.data;    
                }
            }).catch((err) => {
                console.log(err);
            });
        },

        data() {
            return {
                tagArticles: [],
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