<template>
    <div class="right-say-list">
        <div class="say-item" v-for="(item, index) in says" :key="index">
            <div class="say-title">
                <h3>碎碎念</h3>
                <div class="seeMore">
                    <router-link to="/says">
                        <el-tag type="info" effect="dark"> 查看更多 </el-tag>
                    </router-link>
                </div>
            </div>
            <div class="say-body fadeInUp">
                <el-card :body-style="{ padding: '12px' }">
                    <el-header class="say-header" style="padding: 0">
                        <div class="header-right">
                            <div class="user-avatar">
                                <router-link to="/about">
                                    <img
                                        :src="item.sayHeader.userAvatar"
                                        alt="image"
                                    />
                                </router-link>
                            </div>
                            <div class="header-content">
                                <div class="content-top">
                                    <router-link to="/about" class="user-name">
                                        {{ item.sayHeader.userName }}
                                    </router-link>
                                    <a class="shallow"
                                        >{{
                                            item.sayHeader.releaseTime
                                                | moment("YYYY-MM-DD")
                                        }}
                                    </a>
                                </div>
                                <div class="content-footer">
                                    <a class="shallow">
                                        {{ item.sayHeader.userIdentity }}
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
                    <el-main class="say-content">
                        <div class="say-word">
                            <a>{{ item.sayContent.content }}</a>
                        </div>
                        <div class="say-cover">
                            <img
                                v-if="item.sayContent.coverSrc !== ''"
                                :src="item.sayContent.coverSrc"
                                alt="cover"
                            />
                        </div>
                    </el-main>
                    <el-footer class="say-footer">
                        <div class="say-actions">
                            <div class="say-like">
                                <el-button type="info" plain>
                                    <span class="iconfont icon-like">喜欢</span>
                                </el-button>
                            </div>
                            <div class="say-comment">
                                <el-button
                                    type="info"
                                    plain
                                    @click="changeComment(index)"
                                >
                                    <span class="iconfont icon-comment"
                                        >评论</span
                                    >
                                </el-button>
                            </div>
                            <div class="say-forward">
                                <el-button type="info" plain>
                                    <span class="iconfont icon-share"
                                        >分享</span
                                    >
                                </el-button>
                            </div>
                        </div>
                    </el-footer>
                    <comment v-if="isCommentID === index" :item="item" />
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import Comment from "@/view/home/components/says/comment";
import { getAllSays } from "@/api";
export default {
    components: { Comment },
    name: "RightSay",
    mounted() {
        getAllSays()
            .then((res) => {
                if (res.status == 200) {
                    this.says = res.data.slice(0, 3);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    },

    data() {
        return {
            says: [],
            isCommentID: -1,
        };
    },
    methods: {
        changeComment(index) {
            this.isCommentID = this.isCommentID === index?-1:index;
        },
    },
};
</script>

<style scoped>
.say-title {
    display: flex;
    justify-content: space-between;
}
.el-tag--dark.el-tag--info {
    background-color: var(--themeBodyColor) !important;
    border: #e0e0e0 !important;
    color: var(--themeFontColor);
    transition: all 0.5s;
    margin: 4px 8px;
    cursor: pointer;
}
.tags-body .el-tag--dark.el-tag--info:hover {
    transform: scale(1.2);
}

.say-body .say-header {
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
    color: #b0b1b2;
}

.say-header .header-left {
    display: flex;
    padding-bottom: 16px;
    border-radius: 50%;
}

.say-body .el-main,
.el-footer {
    padding: 0;
}

.say-body .say-content .say-word {
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin: 8px auto;
}

.say-body .say-content .say-cover {
    margin: 8px auto;
    text-align: center;
    overflow: hidden;
    border-radius: 2%;
    max-height: 99%;
}

.say-body .say-content .say-cover img {
    max-width: 100%;
    max-height: 100%;
    transition: all 0.5s;
}

.say-body .say-content .say-cover img:hover {
    transform: scale(1.07);
}
.say-body .say-footer {
    height: auto !important;
}
.say-body .say-footer > div {
    display: flex;
}

.say-body .say-footer .say-actions {
    display: flex;
    justify-content: space-evenly;
    margin-top: 12px;
    height: 60%;
}

.say-actions > div {
    width: 33%;
    height: 100%;
}

.say-actions > div:nth-child(2) {
    padding: 0 8px;
}

.say-actions > div > .el-button {
    width: 100%;
    height: 100%;
}
</style>
