<template>
    <div class="article-item">
        <el-card :body-style="{padding: '0px',}">
            <div class="article-item-cover">
                <img :src="item.coverSrc" alt="image">
            </div>

            <div class="article-item-content">
                <router-link :to="`/article/${item.articleID}`"><h4><a href="">{{item.title}}</a></h4></router-link>
                <div class="article-time">{{item.time}}</div>
                <router-link :to="`/article/${item.articleID}`">
                    <div class="article-introduction fadeInUp">
                        <p>
                            <a href="">
                                {{item.introduction}}
                            </a>
                        </p>
                    </div>
                </router-link>
                <div class="article-actions">
                    <router-link :to="`/article/${item.articleID}`">
                        <div class="article-read">
                            <el-button type="info" size="small" plain class="iconfont icon-read">
                                开始阅读
                            </el-button>
                        </div>
                    </router-link>

                    <div class="article-action">
                        <router-link :to="`/article/${item.articleID}`">
                        <el-button type="info" class="see iconfont icon-see" plain>
                            <span>{{item.action.see}}</span>
                        </el-button>
                        <el-button type="info" class="like iconfont icon-like" plain>
                            <span>{{item.action.like}}</span>
                        </el-button>
                        <el-button type="info" class="comment iconfont icon-comment" plain>
                            <span>{{item.action.comment}}</span>
                        </el-button>
                        </router-link>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>

    export default {
        name: "ArticleItem",
        mounted() {

        },
        props: {
            item: Object,
        },
        data() {
            return {
                isFixed: false,
            }
        },
        methods: {

        },
    }
</script>

<style scoped>

    .article-item {
        margin-bottom: 30px;
    }

    .article-item .article-item-cover {
        overflow: hidden;
        text-align: center;
    }

    .article-item .article-item-cover > img {
        transition: all .5s;
        max-height: 100%;
        max-width: 100%;
    }

    .article-item .article-item-cover > img:hover {
        transform: scale(1.07);
    }

    .article-item .article-item-content {
        overflow: hidden;
        margin: 0 16px;
    }

    .article-item-content .article-introduction {
        word-break: break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }

    .article-item-content .article-time {
        color: #B0B1B2;
    }

    .article-item-content .article-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4px 0;
    }

    .article-item-content .article-actions .article-action span {
        padding: 0 4px;
        cursor: pointer;
    }


</style>
