<template>
    <div class="allAritcle">
        <div class="title-box">
            <div class="title">
                <h1>全部文章</h1>
            </div>
            <div class="showFormat">
                <el-switch
                        v-model="showList"
                        active-color="var(--themeFontColor)"
                        inactive-color="rgba(207,207,207,.4)"
                >
                </el-switch>
                <a>列表显示</a>
            </div>
        </div>
        <div class="articles-list">
            <template v-if="!showList">
                <table-show/>
            </template>
            <template v-else>
                <list-show/>
            </template>
        </div>
    </div>
</template>

<script>
    import TableShow from "./components/article/ArticlesListShow";
    import ListShow from "./components/article/ArticlesTableShow";
    export default {
        name: "allAritcle",
        mounted() {
        },
        components: {
            TableShow,
            ListShow,
        },
        computed: {
            showList: { //改变显示方式时动态记录，下次回来该页面也能保持该方式
                get() {
                    return this.$store.state.showListOrTable.article;
                },
                set() {
                    this.$store.commit("changeShowWay",'article');
                },
            },
        },

        data() {
            return {};
        },
        methods: {},
    };
</script>

<style>
    .title h1 {
        margin: 30px 12px;
    }
    .allAritcle{
        margin: 0 auto;
    }
    .title-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .title-box .article-box-title .showFormat {
        display: flex;
        align-items: center;
    }

    .article-box-title .showFormat .el-switch {
        padding-right: 8px;
    }
     @media (min-width:1800px){
         .allAritcle{
            width: 90%;
         }
    }
</style>