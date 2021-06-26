<template>
    <div class="right-aboutMe">
        <div class="aboutMe-title">
            <h4>INORYWW'S BLOG</h4>
        </div>
        <el-card :body-style="{ padding: '0px' }">
            <div class="user-info">
                <div class="user-avatar">
                    <img src="/static/image/avatar.jpg"/>
                </div>
                <div class="user-name">
                    <h4>inroyww</h4>
                </div>
            </div>
            <div class="info-count">
                <div class="article-num">
                    <router-link to="/article">{{infoCounts.article}}
                        <span>article</span>
                    </router-link>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div class="category-num">
                    <router-link to="/category">{{infoCounts.category}}
                        <span>category</span>
                    </router-link>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div class="tag-num">
                    <router-link to="/tags">{{infoCounts.tags}}
                        <span>tag</span>
                    </router-link>
                </div>
            </div>
            <el-divider></el-divider>
            <div class="otherLink">
                <div class="link-item" v-for="(item, index) in links" :key="index">
                    <a :href="item.src">
                        <span :class="`iconfont ${item.icon}`"></span>
                        <span>{{item.linkName}}</span>
                    </a>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "AboutMe",
        mounted() {
        },
        data() {
            return {
                infoCounts: {
                    article: 150,
                    category: 12,
                    tags: 20,
                },
                links: [
                    {
                        linkName: 'github',
                        icon: 'icon-github',
                        src: 'https://github.com/inorywww',
                    },
                    {
                        linkName: 'blog',
                        icon: 'icon-blog',
                        src: '/',
                    },
                    {
                        linkName: 'email',
                        icon: 'icon-email',
                        src: '',
                    },
                    {
                        linkName: 'qq',
                        icon: 'icon-qq',
                        src: '',
                    },
                ]
            }
        },
        methods: {},
    }
</script>

<style scoped>
     .right-aboutMe .aboutMe-title {
        margin-bottom: 24px;
    }

    .right-aboutMe .user-info {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .right-aboutMe .user-info .user-avatar {
        max-height: 100px;
        max-width: 100px;
    }

    .right-aboutMe .user-info .user-avatar img {
        max-height: 100%;
        max-width: 100%;
        border-radius: 50%;
    }

    .right-aboutMe .info-count {
        display: flex;
        justify-content: center;
        margin: 16px auto;
    }

    .right-aboutMe .info-count > div {
        text-align: center;
    }

    .right-aboutMe .info-count > div span {
        padding-top: 4px;
        display: block;
    }

    .right-aboutMe .info-count .el-divider--vertical {
        height: auto;
        margin: 0 16px;
    }
    .right-aboutMe .otherLink{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin:16px;
    }
    .right-aboutMe .otherLink .link-item{
        flex: 1;
        min-width: 33.3%;
        max-width: 33.3%;
        padding: 4px 8px;
        text-align: center;
    }
    .right-aboutMe .otherLink .link-item span{
        padding: 0 2px;
    }
</style>
