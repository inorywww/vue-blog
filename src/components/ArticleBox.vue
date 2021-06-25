<template>
    <div class="articles-box">
        <div class="article-box-title">
            <div class="box-title">
                <h4>全部文章</h4>
            </div>
            <div class="showFormat">
                <el-switch
                        v-model="showFormatValue"
                        active-color="var(--themeFontColor)"
                        inactive-color="rgba(207,207,207,.4)"
               >
                </el-switch>
                <a>列表显示</a>
            </div>
        </div>
        <div class="article-box-content">
            <template v-for="(item, index) in articleItems">
                <article-item :item="item" :key="index"/>
            </template>
        </div>
    </div>
</template>

<script>
    import ArticleItem from "@/components/ArticleItem";
    export default {
        name: "ArticleBox",
        mounted() {
        },
        components: {
            ArticleItem
        },
        data() {
            return {
                showFormatValue: false,
                articleItems: [
                    {
                        coverSrc: 'https://oss-cdn.yevpt.com/post/bg-images/202012/c00a8d2502813496b9d5947c7cd70f98.jpg?a=bb8534d0b73e288f0395262fb66342e4&b=60c84fc7',
                        title: '使用Nvm搭建Node环境（Mac/Win/Linux',
                        time: '十二月 17, 2020',
                        introduction: '每次查询我的笔记，总是需要在我记录的多份Node相关搭建中选择，出于整洁强迫症的需求，现在抽出时间整理成了一篇。本篇，不仅记录了Node环境在Linux、Win、Mac上的搭建...',
                        action: {
                            see: 250,
                            like: 20,
                            comment: 12,
                        },
                    },
                    {
                        coverSrc: 'https://oss-cdn.yevpt.com/post/bg-images/202006/733bb8209e3f4613ddb0d4e229293636.jpg?a=bc018da0e779efb6ad680294d4fce4fb&b=60c2da69',
                        title: 'Centos7 安装 Docker',
                        time: '六月 16, 2020',
                        introduction: '虽然如今我已经在一步步降低对docker的依赖，少做了很多杀鸡用牛刀的事情，但是docker在特定的场景下依旧是非常好用，为此整理了安装的步骤和相关...',
                        action: {
                            see: 1201,
                            like: 120,
                            comment: 68,
                        },
                    },
                    {
                        coverSrc: 'https://oss-cdn.yevpt.com/post/bg-images/202006/af22167297594a991a300fe0bd80c958.jpg?a=3382808558e129144f8c886a70377206&b=60c2da69',
                        title: '内网穿透神器-NPS使用教程',
                        time: '五月 24, 2020',
                        introduction: 'Nps是一款轻量级、高性能、功能强大的内网穿透代理服务器。几乎支持所有协议，支持内网http代理、内网socks5代理、p2p等，简洁但功能强大的WEB管理界面...',
                        action: {
                            see: 300,
                            like: 130,
                            comment: 60,
                        },
                    },
                ],
            }
        },
        methods: {},
    }
</script>

<style scoped>
     .articles-box .article-box-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }

    .article-box-title .showFormat {
        display: flex;
        align-items: center;
    }

    .article-box-title .showFormat .el-switch {
        padding-right: 8px;
    }
</style>
