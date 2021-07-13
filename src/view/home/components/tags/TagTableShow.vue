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
             await getAllArticle().then((res) => {
                res.data.forEach(item => {
                    item.tags.forEach(tag => {
                        if (tag === this.$route.query.tagName) {
                            this.tagArticles.push(item);
                        }
                    });
                });
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