<template>
    <el-container class="container">
        <el-main  style="overflow: hidden">
            <el-row class="row" >
                <el-col :span="16" class="row-left">
                    <article-box/>
                    <div class="showMore">
                        <router-link to="/article">
                            <el-button type="success">查看更多</el-button>
                        </router-link>
                    </div>
                </el-col>
                <el-col :span="8" class="row-right">
                    <right-box/>
                </el-col>
            </el-row>
        </el-main>
        <router-view/>
    </el-container>
</template>

<script>
    import ArticleBox from "@/view/home/components/home/articleBox/ArticleBox";
    import RightBox from "@/view/home/components/home/rightBox/RightBox";
    import {handleScroll} from "@/utils/index"

    export default {
        name: "home",
        mounted() {
            setTimeout(() => {
                handleScroll();
            }, 400);
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
    @media (max-width:799px){
        .row-right{
            display: none;
        }
        .el-col-16{
            width: 100%;
        }
    }
    @media (min-width:800px) and (max-width:1500px){
        .el-col-16{
            width: 60%;
        }
        .el-col-8{
            width: 40%;
        }
    }
     @media (min-width:15000px){
        .el-col-16{
            width: 65%;
        }
        .el-col-8{
            width: 35%;
        }
    }
    .row {
        margin: 0 auto !important;
    }

    .right-box > div {
        padding: 0 16px;
        margin-bottom: 16px;
    }

    .showMore {
        text-align: center;
    }

    .el-button--success {
        background-color: var(--themeFontColor) !important;
        border: none !important;
        color: var(--themeBodyColor) !important;
        opacity: .8 !important;
    }
</style>
