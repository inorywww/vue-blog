<template>
    <el-container class="container">
        <el-main style="overflow: hidden">
            <el-row class="row" :gutter="40">
                <el-col :span="16">
                    <article-box/>
                    <div class="showMore">
                        <router-link to="/article">
                            <el-button type="success">查看更多</el-button>
                        </router-link>
                    </div>
                </el-col>
                <el-col :span="8">
                    <right-box/>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
//src\view\home\components\home\articleBox
    // import {ArticleBox,RightBox} from "@/view/home/components/home/articleBox";
    import ArticleBox from "@/view/home/components/home/articleBox/ArticleBox";
    import RightBox from "@/view/home/components/home/rightBox/RightBox";
    import {handleScroll} from "@/utils/index"
   
    export default {
        name: "home",
        mounted() {
            setTimeout(()=>{
                handleScroll();
            },400);
        },
        components: {
            RightBox,
            ArticleBox,
        },
        data() {
            return {}
        },
        methods: {
           
        },
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
    .showMore{
        text-align: center;

    }
    .el-button--success{
        background-color: var(--themeFontColor) !important;
        border: none !important;
        color: var(--themeBodyColor) !important;
        opacity: .8 !important;
    }
</style>
