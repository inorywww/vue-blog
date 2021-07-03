<template>
    <el-container class="container">
        <el-main style="overflow: hidden">
            <el-row class="row" :gutter="40">
                <el-col :span="16">
                    <article-box/>
                </el-col>
                <el-col :span="8">
                    <right-box/>
                </el-col>
            </el-row>
        </el-main>
        <router-view/>
    </el-container>
</template>

<script>
    import ArticleBox from "@/components/home/articleBox/ArticleBox";
    import RightBox from "@/components/home/rightBox/RightBox";

    export default {
        name: "home",
        mounted() {

        },
        components: {
            RightBox,
            ArticleBox,
        },
        data() {
            return {}
        },
        methods: {},
    }
</script>

<style scoped>
    .row {
        margin: 0 auto !important;
    }
    .right-box > div {
        padding: 0 16px;
        margin-bottom: 16px;
    }
</style>
