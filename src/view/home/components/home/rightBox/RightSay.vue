<template>
    <div class="say-item fadeInUp">
        <el-card :body-style="{ padding: '12px' }">
            <el-header class="say-header" style="padding: 0">
                <div class="header-right">
                    <div class="user-avatar">
                        <router-link to="/about">
                            <img :src="item.sayHeader.userAvatar" alt="image">
                        </router-link>
                    </div>
                    <div class="header-content">
                        <div class="content-top">
                            <router-link to="/about" class="user-name">
                                {{item.sayHeader.userName}}
                            </router-link>
                            <a class="shallow">{{item.sayHeader.releaseTime|moment("YYYY-MM-DD")}} </a>
                        </div>
                        <div class="content-footer">
                            <a class="shallow">
                                {{item.sayHeader.userIdentity}}
                            </a>
                        </div>
                    </div>
                </div>
                <div class="header-left">
                    <router-link :to="`/says/${item.sayID}`" class="iconfont icon-more"></router-link>
                </div>
            </el-header>
            <el-main class="say-content">
                <div class="say-word">
                    <a>{{item.sayContent.content}}</a>
                </div>
                <div class="say-cover">
                    <img v-if="item.sayContent.coverSrc!==''" :src="item.sayContent.coverSrc" alt="cover">
                </div>
            </el-main>
            <el-footer class="say-footer">
                <div class="say-data">
                    <div class="view-data">
                        <a class="shallow">{{item.sayData.viewData}}次观看</a>
                    </div>
                    <div class="comment-data">
                        <a class="shallow">{{item.sayData.commentData}}个评论</a>
                    </div>
                </div>
                <div class="say-actions">
                    <div class="say-like">
                        <el-button type="info" plain>
                            <span class="iconfont icon-like">喜欢</span>
                        </el-button>
                    </div>
                    <div class="say-comment">
                        <el-button type="info" plain>
                            <span class="iconfont icon-comment">评论</span>
                        </el-button>
                    </div>
                    <div class="say-forward">
                        <el-button type="info" plain>
                            <span class="iconfont icon-share">分享</span>
                        </el-button>
                    </div>
                </div>
            </el-footer>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "RightSay",
        mounted() {

        },
        props: {
            item: Object
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
    .say-item .say-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .say-header .header-right {
        display: flex;
    }

    .header-right .user-avatar {
        max-height: 40px;
        max-width: 40px;
        margin-right: 12px;
    }

    .header-right .user-avatar img {
        max-height: 100%;
        max-width: 100%;
        border-radius: 50% !important;
    }

    .header-right .header-content .content-top {
        margin-bottom: 4px;
    }

    .header-right .header-content .content-top .user-name {
        padding-right: 8px;
    }

    .shallow {
        color: #B0B1B2;
    }

    .say-header .header-left {
        display: flex;
        padding-bottom: 16px;
        border-radius: 50%;
    }

    .say-item .el-main, .el-footer {
        padding: 0;
    }

    .say-item .say-content .say-word {
        word-break: break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin: 8px auto;
    }

    .say-item .say-content .say-cover {
        margin: 8px auto;
        text-align: center;
        overflow: hidden;
        border-radius: 2%;
        max-height: 99%;
    }

    .say-item .say-content .say-cover img {
        max-width: 100%;
        max-height: 100%;
        transition: all .5s;
    }

    .say-item .say-content .say-cover img:hover {
        transform: scale(1.07);
    }

    .say-item .say-footer > div {
        display: flex;
    }

    .say-item .say-footer .say-data .view-data {
        padding-right: 16px;
    }

    .say-item .say-footer .say-actions {
        display: flex;
        justify-content: space-evenly;
        margin-top: 12px;
    }


</style>
