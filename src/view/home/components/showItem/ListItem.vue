<template>
    <router-link :to="`/article/${item.articleID}`">
        <div class="article-list-item ">
            <el-card class="fadeInUp">
                <header class="item-header">
                    <div class="title">
                        <h3>{{ item.title }}</h3>
                    </div>
                    <div class="article-time">
                        {{ item.releaseTime|moment("YYYY-MM-DD") }}
                    </div>
                </header>
                <main class="item-body">
                    <div class="introduction-box">
                        <p>
                            {{ item.introduction }}
                        </p>
                    </div>
                </main>
                <!-- <footer class="article-action">
                    <el-button type="info" class="see iconfont icon-see" plain>
                        <span>{{item.action.see}}</span>
                    </el-button>
                    <el-button type="info" class="like iconfont icon-like" plain>
                        <span>{{item.action.like}}</span>
                    </el-button>
                    <el-button type="info" class="comment iconfont icon-comment" plain>
                        <span>{{item.action.comment}}</span>
                    </el-button>
                </footer> -->
            </el-card>
        </div>
    </router-link>
</template>

<script>
    import {handleScroll} from "@/utils/index";

    export default {
        name: "articleItem",
        props: {
            item: Object,
        },
        mounted() {
            this.$nextTick(() => {
                handleScroll();
            })
        },
        components: {},
        data() {
            return {
                isAnimate: "",
            };
        },
        methods: {
        },
    };
</script>

<style scoped>
    .article-time {
        color: #b0b1b2;
    }

    .article-list-item {
        transition: all 0.5s;
    }

    .article-list-item:hover {
        transform: scale(1.05);
    }
     .item-body .introduction-box p {
        word-break: break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin: 4px !important;
    }
</style>