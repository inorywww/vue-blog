<template>
    <div class="article-container">
        <div class="article-cover">
            <img :src="articleItem.coverSrc" alt="images" class="animate__animated animate__zoomIn">
        </div>
        <header class="article-info">
            <div class=" baseInfo">
                <div class="article-title">
                    <h1>{{articleItem.title}}</h1>
                </div>
                <div class="article-time">
                    <span>{{articleItem.time}}</span>
                </div>
            </div>
            <div class="tags-info">
                <router-link v-for="(item,index) in articleItem.tags" :key="index" :to="`/tags/${item}`">
                    <el-tag type="info" effect="dark">
                        {{item}}
                    </el-tag>
                </router-link>

            </div>
        </header>
        <main class="article-content " >
            <div class="markdown-body">
                <component :is="articleComponent"/>
            </div>
            <el-divider/>
            <div class="comment-box">
                <h2>评论</h2>
                <div class="comment-info">
                    <div class="content">
                        <el-input v-model="markdownForm.username" placeholder="在这儿输入昵称"></el-input>
                        <span class="iconfont icon-name"> </span>
                    </div>
                    <div class="email">
                        <el-input v-model="markdownForm.email" placeholder="在这儿输入邮箱"></el-input>
                        <span class="iconfont icon-emailFilled"> </span>
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
                    <el-button type="success">发送</el-button>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import 'highlight.js/styles/vs2015.css';
    // import 'github-markdown-css';
    let lastPosition = 0;//上一时刻滚动条的位置
    let nowPosition = 0;//下一时刻滚动条的位置
    export default {
        name: "Article",
        components: {},
        mounted() {
            this.axios.get('http://localhost:3000/articleItems').then(res => {
                this.articleItem = res.data.filter((item) => {
                    return item.articleID === Number(this.$route.params.id);
                })[0];
                if (!this.articleItem) {
                    console.log("404");
                    this.$route.push("404");
                }

                let path = this.articleItem.fileName;
                this.$options.components['articleMD'] = require(`@/assets/md/${path}`).default;
                this.articleComponent = 'articleMD';

                this.$nextTick(() => {
                    const items = document.querySelectorAll('p,pre');
                    for (let i = 0; i < items.length; i++) {
                        const rect = items[i].getBoundingClientRect();//当前元素离浏览器的边距
                        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
                        if (!(rect.bottom < 0 || rect.top - viewHeight >= 0)) {//下滚
                            items[i].classList.add('animate__animated', 'animate__fadeInUp');
                        }
                    }
                    this.handleScroll();
                });
            }).catch(err => {
                console.error(err)
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
                key: 0,
                articleComponent: '',
                markdownForm: {
                    username: '',
                    email: '',
                    content: '',
                }
            }
        },
        methods: {
            change(value, render) {
                this.html = render;
            },
            handleScroll(){
                window.addEventListener('scroll', ()=>{
                    lastPosition = window.scrollY;
                    const items = document.querySelectorAll('p,pre');
                    for (let i = 0; i < items.length; i++) {
                        const rect = items[i].getBoundingClientRect();//当前元素离浏览器的边距
                        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
                        if (nowPosition < lastPosition && !(rect.bottom < 0 || rect.top - viewHeight >= 0)
                            && !items[i].classList.contains('animate__fadeInUp')) {//下滚
                            items[i].classList.add('animate__animated','animate__fadeInUp');
                        }
                    }
                    setTimeout(() => {
                        nowPosition = lastPosition;
                    }, 80);
                });

            }
        },
    }
</script>

<style scoped>
    .article-container {
        width: 60%;
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
        color: #B0B1B2;
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
        margin: 16px 0;
    }

    .comment-box .send {
        display: flex;
        flex-direction: row-reverse;
        padding-bottom: 20px;
        margin-bottom: 50px;
    }
    .animate__zoomIn{
        --animate-duration: 1.5s;
    }
</style>
