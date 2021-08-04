<template>
    <div class="right-aboutMe">
        <div class="aboutMe-title">
            <h1>INORYWW'S BLOG</h1>
        </div>
        <el-card :body-style="{ padding: '0px' }">
            <div class="aboutMe-body">
                <div class="user-info">
                    <div class="user-avatar">
                        <img src="/static/image/avatar.jpg"/>
                    </div>
                    <div class="user-name">
                        <h3>inroyww</h3>
                    </div>
                </div>
                <div class="info-count" v-if="dataFlag">
                    <div class="article-num">
                        <router-link to="/article">{{infoCounts.articleInfo.num}}
                            <span>article</span>
                        </router-link>
                    </div>
                    <el-divider direction="vertical"></el-divider>
                    <div class="category-num">
                        <router-link to="/says">{{infoCounts.sayInfo.num}}
                            <span>say</span>
                        </router-link>
                    </div>
                    <el-divider direction="vertical"></el-divider>
                    <div class="tag-num">
                        <router-link to="/tags">{{infoCounts.tagInfo.num}}
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
            </div>
        </el-card>
    </div>
</template>

<script>
    import { getHome } from "@/api/admin";
    export default {
        name: "AboutMe",
        created() {
            getHome().then(res => {
                if(res.status === 200){
                    this.infoCounts = res.data;
                    this.dataFlag = true;
                }
            })
        },
        data() {
            return {
                infoCounts: {
                    
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
                ],
                dataFlag:false,
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
        margin-top: 8px;
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
