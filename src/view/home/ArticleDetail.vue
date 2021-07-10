<template>
    <div class="article-container">
        <div class="article-cover">
            <img
                :src="articleItem.coverSrc"
                alt="images"
                class="animate__animated animate__zoomIn"
            />
        </div>
        <header class="article-info">
            <div class="baseInfo">
                <div class="article-title">
                    <h1>{{ articleItem.title }}</h1>
                </div>
                <div class="article-time">
                    <span>{{
                        articleItem.releaseTime | moment("YYYY-MM-DD")
                    }}</span>
                </div>
            </div>
            <div class="tags-info">
                <router-link
                    class="tag-item"
                    v-for="(tag, index) in articleItem.tags"
                    :key="index"
                    :to="{ path: '/tags', query: { tagName: tag } }"
                >
                    <el-tag type="info" effect="dark" size="medium"
                        >#{{ tag }}</el-tag
                    >
                </router-link>
            </div>
        </header>
        <main class="article-content">
            <div class="markdown-body">
                <component :is="articleComponent" />
            </div>
            <el-divider />
            <div class="comment-box">
                <h2>评论</h2>
                <div class="comment-info">
                    <div class="content">
                        <span class="iconfont icon-name"> </span>
                        <el-input
                            v-model="markdownForm.username"
                            placeholder="在这儿输入昵称"
                        >
                        </el-input>
                    </div>
                    <div class="email">
                        <span class="iconfont icon-emailFilled"> </span>
                        <el-input
                            v-model="markdownForm.email"
                            placeholder="在这儿输入邮箱"
                        >
                        </el-input>
                    </div>
                </div>
                <div class="comment-input">
                    <mavon-editor
                        v-model="markdownForm.content"
                        ref="md"
                        @change="change"
                        placeholder="说点什么吧~"
                        :subfield="false"
                        toolbarsBackground="var(--themeBodyColor)"
                        previewBackground="var(--themeBodyColor)"
                        :toolbars="toolbars"
                        style="min-height: 200px"
                    />
                </div>
                <div class="send">
                    <el-button type="success" @click="send">发送</el-button>
                </div>
            </div>
            <el-divider />
            <div class="message-box">
                <h1>所有评论</h1>
                <message-list :key="sonKey" :messageType="'articleMessage'" />
            </div>
        </main>
    </div>
</template>

<script>
import "highlight.js/styles/vs2015.css";
import { handleScroll, alertInfo, checkInput } from "@/utils/index";
import { getOneArticle, sendMessage} from "@/api";
import MessageList from "./components/MessageList";
export default {
    name: "Article",
    components: { MessageList },
    async mounted() {
        const articleID = Number(this.$route.params.id);
        await getOneArticle(articleID)
            .then((res) => {
                if (res.status == 200) {
                    this.articleItem = res.data;
                    //设置标题
                    document.title = this.articleItem.title; 
                    let path = this.articleItem.fileName;
                    // 渲染markdown
                    this.$options.components["articleMD"] =
                        require(`@/assets/md/${path}`).default;
                    this.articleComponent = "articleMD";

                    this.$nextTick(() => {
                        const items = document.querySelectorAll("p,pre");
                        for (let i = 0; i < items.length; i++) {
                            items[i].classList.add("fadeInUp");
                        }
                        handleScroll();
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    },
    data() {
        return {
            toolbars: {
                fullscreen: true, // 全屏编辑
                htmlcode: true, // 展示html源码
                preview: true, // 预览
                imagelink: true, // 图片链接
                code: true, // code
            },
            articleItem: {},
            sonKey: "",
            articleComponent: "",
            markdownForm: {
                username: "",
                email: "",
                content: "",
            },
        };
    },
    methods: {
        change(value, render) {
            this.html = render;
        },
        send() {
            // 判断输入是否正确
            if (checkInput(this.markdownForm)) {
                this.markdownForm["time"] = new Date().getTime();
                this.markdownForm["id"] = this.articleItem.articleID;
                const sendInfo = {
                    type: "articleMessage",
                    info: this.markdownForm,
                };

                sendMessage(sendInfo)
                    .then((res) => {
                        if (res.status == 200) {
                            this.markdownForm = {};
                            alertInfo("发送成功，请静候回复~", "success");
                            this.sonKey = new Date().getTime();
                        }
                    })
                    .catch(() => {
                        alertInfo("发送失败，服务器错误≧ ﹏ ≦", "error");
                    });
            }
        },
    },
};
</script>

<style scoped>
.article-container {
    width: 70%;
    margin: 0 auto;
}

.article-cover {
    height: 100%;
    width: 100%;
}

.article-cover img {
    max-height: 100%;
    max-width: 100%;
}

.article-info {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    height: auto !important;
    background-color: var(--themeCardColor);
    padding: 16px 12px;
}

.tags-info {
    display: flex;
    align-items: center;
}

.tags-info > a {
    margin: 4px 4px;
}

.tags-info .el-tag {
    margin: 4px 8px;
    width: 100%;
    text-align: center;
    cursor: pointer;
}

.article-title h1 {
    font-size: 2.5rem;
}

.article-time span {
    color: #b0b1b2;
    font-size: 2rem;
}

.article-content {
    padding: 0 20px;
    background-color: var(--themeCardColor);
}

.comment-box .comment-input {
    margin: 30px 0;
}

.comment-box .comment-info {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 16px 0;
}

.comment-box .comment-info > div {
    display: flex;
    align-items: center;
}

.comment-box .comment-info > div > span {
    font-size: 30px;
}

.comment-box .send {
    display: flex;
    flex-direction: row-reverse;
    padding-bottom: 20px;
    margin-bottom: 50px;
}

.animate__zoomIn {
    --animate-duration: 1.5s;
}

.message-box {
    padding-bottom: 30px;
}

.el-tag--dark.el-tag--info {
    background-color: var(--themeBodyColor) !important;
    border: #e0e0e0 !important;
    color: var(--themeFontColor);
    transition: all 0.5s;
}

.el-tag--dark.el-tag--info:hover {
    transform: scale(1.2);
}

@media (max-width: 699px) {
    .article-container {
        width: 95%;
    }
    .article-info {
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    .baseInfo {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .comment-box .comment-info {
        justify-content: center;
    }
    .comment-box .comment-info .email {
        margin-top: 12px;
    }
}
@media (min-width: 700px) and (max-width: 1300px) {
    .article-container {
        width: 80%;
    }
}
</style>
