<template>
    <router-link :to="`/article/${item.articleID}`">
        <div class="article-list-item">
            <el-card :body-style="{ padding: '0px' }" class="fadeInUp">
                <el-header class="item-header">
                    <div class="cover-box">
                        <img :src="item.coverSrc" alt="image" class="cover"/>
                    </div>
                </el-header>
                <el-container class="item-content">
                    <el-main class="item-body">
                        <div class="title">
                            <h3>{{ item.title }}</h3>
                        </div>
                        <div class="tags">
                            <router-link
                                    class="tag-item"
                                    v-for="(tag, index) in item.tags"
                                    :key="index"
                                    :to="{path:'tags',query:{tagName:tag}}"
                            >
                                <el-tag type="info" effect="dark" size="medium"> #{{ tag }}</el-tag>
                            </router-link>
                        </div>
                        <div class="introduction-box">
                            <p>
                                {{ item.introduction }}
                            </p>
                        </div>
                    </el-main>
                    <el-footer class="item-footer">
                        <div class="article-time">
                            {{ item.releaseTime|moment("YYYY-MM-DD") }}
                        </div>
                    </el-footer>
                </el-container>
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
            return {};
        },
        methods: {},
    };
</script>

<style scoped>
    .article-list-item {
        transition: all 0.4s;
    }

    .article-list-item:hover {
        transform: scale(1.08);
    }

    .article-list-item .el-card {
        overflow: hidden;
        margin: 0 !important;
    }

    .item-header,
    .item-footer,
    .item-body {
        height: auto !important;
        padding: 0 !important;
    }

    .item-header .cover-box {
        width: 100%;
        height: 200px;
        text-align: center;
    }

    .item-header .cover-box img {
        width: 100%;
        height: 100%;
    }

    .item-content {
        padding: 16px;
    }

    .item-body .tags {
        display: flex;
    }

    .item-body .tags .tag-item {
        color: var(--themeFontColor);
        opacity: .7;
        margin: 4px 8px;
    }

    .item-body .introduction-box p {
        word-break: break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin: 4px !important;
    }

    .item-footer {
        display: flex;
        justify-content: space-between;
    }

    .item-footer .article-time {
        color: #B0B1B2;
    }

    .el-tag--dark.el-tag--info {
        background-color: var(--themeBodyColor) !important;
        border: #e0e0e0 !important;
        color: var(--themeFontColor);
        transition: all .5s;
    }

    .el-tag--dark.el-tag--info:hover {
        transform: scale(1.2);
    }
</style>