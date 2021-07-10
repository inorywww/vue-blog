<template>
    <div class="list-show">
        <el-row
                v-for="(item, index) in articleItems"
                :key="index"
                class="article-list-row"
        >
            <list-item :item="item"/>
        </el-row>
    </div>
</template>

<script>
    import ListItem from "@/view/home/components/showItem/ListItem";
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
        components: {
            ListItem,
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

</style>