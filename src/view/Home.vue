<template>
    <el-container>
        <el-main>
            <el-row class="row" :gutter="40">
                <el-col :span="15">
                    <template>
                        <article-box/>
                    </template>
                </el-col>
                <el-col :span="9">
                    <div class="right-box">
                        <template>
                            <right-about-me/>
                        </template>
                        <template>
                            <right-say/>
                        </template>

                        <div class="right-tags">

                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-main>
        <router-view/>
    </el-container>
</template>

<script>
    import ArticleBox from "@/components/ArticleBox";
    import RightAboutMe from "@/components/RightAboutMe";
    import RightSay from "@/components/RightSay";
    export default {
        name: "home",
        mounted() {
        },
        components: {
            ArticleBox,
            RightAboutMe,
            RightSay,
        },
        data() {
            return {

            }
        },
        methods: {

        },
    }
</script>

<style scoped>
    .row {
        width: 80%;
        margin: 0 auto !important;
    }

    .right-box > div{
        padding: 0 16px;
        margin-bottom: 16px;
    }
</style>
