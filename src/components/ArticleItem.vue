<template>
    <div class="article-item">
        <el-card :body-style="{padding: '0px',}">
            <div class="article-item-cover">
                <el-image
                        alt="image"
                        :src="item.coverSrc"
                        lazy></el-image>
            </div>
            <div class="article-item-content">
                <h4><a href="">{{item.title}}</a></h4>
                <div class="article-time">{{item.time}}</div>
                <div class="article-introduction animate__animated" ref="articleIntroduction">
                    <p>
                        <a href="">
                            {{item.introduction}}
                        </a>
                    </p>
                </div>
                <div class="article-actions">
                    <div class="article-read">
                        <el-button type="info" size="small" plain class="iconfont icon-read">
                            开始阅读
                        </el-button>
                    </div>
                    <div class="article-action">
                        <el-button type="info" class="see iconfont icon-see" @click="getElementPos" plain>
                            <span>{{item.action.see}}</span>
                        </el-button>
                        <el-button type="info" class="like iconfont icon-like" plain>
                            <span>{{item.action.like}}</span>
                        </el-button>
                        <el-button type="info" class="comment iconfont icon-comment" plain>
                            <span>{{item.action.comment}}</span>
                        </el-button>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    // import {isInContainer} from '@/assets/index'

    export default {
        name: "ArticleItem",
        mounted() {

        },
        props: {
            item: Object
        },
        data() {
            return {
                isFixed: false,
            }
        },
        methods: {
            // 滑动出现底部按钮
            getElementPos() {
                let rect = document.querySelectorAll('.article-introduction')[1].getBoundingClientRect();
                console.log(rect.top - document.documentElement.clientHeight < 20)
                console.log(document.documentElement.scrollTop || document.body.scrollTop)
            },
            isElementVisible() {
                let rect = document.querySelectorAll('.article-introduction')[1].getBoundingClientRect();
                console.log(rect.top - document.documentElement.clientHeight + 20)
                return rect.top - document.documentElement.clientHeight < 20
            }
        },
    }
</script>

<style scoped>

    .article-item {
        margin-bottom: 30px;
    }

    .article-item .article-item-cover {
        transition: all .5s;
    }

    .article-item .article-item-cover:hover {
        transform: scale(1.05);
    }

    .article-item .article-item-content {
        overflow: hidden;
        margin: 16px;
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

    .article-item-content .article-actions .el-button {
        background: transparent;
        border: 0 solid #fff;
        transition: all .5s;
        padding: 4px;
    }

    .article-item-content .article-actions .el-button:hover {
        background-color: var(--themeFontColor);
        opacity: .4;
        color: var(--themeBodyColor);
    }
</style>
