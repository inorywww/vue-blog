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

    export default {
        name: "AllAritcs",
        mounted() {
            this.articleItems = this.$store.state.allArticles;
    
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