<template>
    <div class="says-item">
        <el-card :body-style="{ padding: '12px' }">
            <el-header class="says-header">
                <div class="header-right">
                    <div class="user-avatar">
                        <router-link to="/about">
                            <img :src="item.userAvatar" alt="image" />
                        </router-link>
                    </div>
                    <div class="header-content">
                        <div class="content-top">
                            <router-link to="/about" class="user-name">
                                {{ item.userName }}
                            </router-link>
                            <a class="shallow"
                                >{{
                                    item.releaseTime | moment("YYYY-MM-DD")
                                }}
                            </a>
                        </div>
                        <div class="content-footer">
                            <a class="shallow">
                                {{ item.userIdentity }}
                            </a>
                        </div>
                    </div>
                </div>
                <div class="header-left">
                    <router-link
                        :to="`/says/${item.sayID}`"
                        class="iconfont icon-more"
                    ></router-link>
                </div>
            </el-header>
            <el-main class="says-body">
                <div class="say-word">
                    <p class="fadeInUp">{{ item.content }}</p>
                </div>
                <div class="say-cover">
                    <img
                        v-if="item.coverSrc !== ''"
                        :src="item.coverSrc"
                        alt="cover"
                    />
                </div>
            </el-main>
            <el-footer class="says-footer">
                <div class="say-actions">
                    <div class="say-like">
                        <el-button type="info" plain>
                            <span class="iconfont icon-like">喜欢</span>
                        </el-button>
                    </div>
                    <div class="say-comment">
                        <el-button type="info" plain @click="changeComment">
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
            <comment v-if="isComment" :item="item"/>
        </el-card>
    </div>
</template>

<script>
import { handleScroll, } from "@/utils/index";
import Comment from './comment'
export default {
    name: "SaysItem",
    props: {
        item: Object,
    },
    components: {Comment},
    mounted() {
        this.$nextTick(() => {
            handleScroll();
        });
    },
    data() {
        return {
            isComment: false,
            sonKey: "",
        };
    },
    methods: {
        changeComment() {
            this.isComment = !this.isComment;
        },
    },
};
</script>
<style scoped>
.says-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.says-header .header-right {
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
    color: #b0b1b2;
}

.say-header .header-left {
    display: flex;
    padding-bottom: 16px;
    border-radius: 50%;
}

.says-body {
    padding: 0 !important;
}
.says-body .say-word p {
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
.says-body .say-cover {
    margin: 12px auto 0;
    text-align: center;
    overflow: hidden;
    border-radius: 2%;
    max-height: 100%;
    max-width: 75%;
}

.says-body .say-cover img {
    width: 100%;
    height: 100%;
    transition: all 0.5s;
}

.says-body .say-cover img:hover {
    transform: scale(1.1);
}
.says-footer {
    margin: 0 auto;
    height: auto !important;
}
.says-footer > div {
    display: flex;
}

.say-actions {
    margin: 16px 0 0;
    height: 50%;
}
.say-actions > div {
    width: 33%;
    height: 35px;
}

.say-actions > div:nth-child(2) {
    padding: 0 16px;
}

.say-actions > div > .el-button {
    width: 100%;
    height: 100%;
}

@media (max-width: 699px) {
    .says-body > .say-cover {
        max-width: 100%;
    }
}
@media (min-width: 700px){
    .info-box{
        flex-wrap: nowrap;
    }
}
@media (min-width: 700px) and (max-width: 1300px) {
    .says {
        width: 85%;
    }
}
</style>