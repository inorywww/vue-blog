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
        <main class="article-content" >
            <div class="markdown-body">
                <component :is="articleComponent"/>
            </div>
            <el-divider/>
            <div class="comment-box">
                <h2>评论</h2>
                <div class="comment-info">
                    <div class="content">
                        <span class="iconfont icon-name"> </span>
                        <el-input v-model="markdownForm.username" placeholder="在这儿输入昵称"></el-input>
                    </div>
                    <div class="email">
                        <span class="iconfont icon-emailFilled"> </span>
                        <el-input v-model="markdownForm.email" placeholder="在这儿输入邮箱"></el-input>
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
                    <el-button type="success" @click="sendMessage">发送</el-button>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import 'highlight.js/styles/vs2015.css';
    import {handleScroll, isEmail} from "@/utils/index"
    
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
                        items[i].classList.add('fadeInUp');
                    }
                    handleScroll();
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
            checkUsername(){
                console.log('username');
            },
            alertInfo(message,type){
                this.$message({
                    showClose: true,
                    message,
                    type: type
                });
            },
            sendMessage(){
                for (const key in this.markdownForm) {
                    const val = this.markdownForm[key]
                    switch (key) {
                        case 'username':
                            if(val.trim()===''){ //判断昵称是否为空
                                this.alertInfo('昵称不能为空哦~','error')
                                return;
                            }
                            continue;
                        case 'email':
                            if(!isEmail(val)){//判断邮箱是否符合格式
                                this.alertInfo('邮箱格式有误哦~','error');
                                return;
                            }
                            continue;
                        case 'content':
                             if(val.trim()===''){//判断内容是否符合形式
                                this.alertInfo('内容不能为空哦~','error');
                                return;
                            }
                            break;
                        default:
                            break;
                    }
                }
                this.axios.post('http://localhost:3000/messages',this.markdownForm).then(res => {
                    console.log('res',res.data);
                    if(res.status === 201){
                        this.markdownForm = {};
                        this.alertInfo('发送成功，请静候回复~','success')
                    }
                }).catch(() => {
                    this.alertInfo('发送失败，服务器错误≧ ﹏ ≦','error');
                })
            },
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
    .comment-box .comment-info > div{
        display: flex;
        align-items: center;
    }
    .comment-box .comment-info > div > span{
        font-size: 30px;
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
