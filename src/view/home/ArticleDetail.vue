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
                <!-- <component :is="articleComponent" /> -->
                <vue-markdown  :source="mdMsg"></vue-markdown>
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
import hljs from 'highlight.js';
import "highlight.js/styles/vs2015.css";

import VueMarkdown from 'vue-markdown';
import { handleScroll, alertInfo, checkInput } from "@/utils/index";
import { getOneArticle, sendMessage} from "@/api";
import MessageList from "./components/MessageList";

const highlightCode = () => {
    const preEl = document.querySelectorAll('pre');
    preEl.forEach(el => {
        hljs.highlightBlock(el);
  })
}
export default {
    name: "Article",
    components: { MessageList, VueMarkdown },
    async mounted() {
        const articleID = Number(this.$route.params.id);
        await getOneArticle(articleID)
            .then((res) => {
                if (res.status == 200) {
                    this.articleItem = res.data;
                    this.mdMsg = this.articleItem.content;
                    // highlightCode();
                    //设置标题
                    document.title = this.articleItem.title; 

                    // let path = this.articleItem.fileName;
                    // // 渲染markdown
                    // this.$options.components["articleMD"] = require(`@/assets/md/${path}`).default;
                    // this.articleComponent = "articleMD";

                    this.$nextTick(() => {
                        highlightCode()
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
            mdMsg:'# 函数\r\n\r\n## 函数形参的默认值\r\n\r\n### es6的默认参数值\r\n\r\n```js\r\nfunction fun1(url,timeout=2000){\r\n    //...  该函数url为必需参数，timeout当没有参数传入或者传入为undefined时，默认就为2000\r\n}\r\n```\r\n\r\n### 默认参数表达式\r\n\r\n```js\r\nfunction getVal(){\r\n    return 5;\r\n}\r\nfunction fun1(first,second = getVal()){\r\n    //... 该函数first为必需参数，second默认值为getVal()返回的值，5，不传入第二个参数才会调用getVal()\r\n}\r\n```\r\n\r\n另外也可以\r\n\r\n```js\r\nfunction add(first, second = first){\r\n    //... 当第二个参数没有传值时，默认值为第一个参数的值\r\n}\r\n```\r\n\r\n## 处理无命名参数\r\n\r\n### 不定参数\r\n\r\n```js\r\n//形参前面添加...就表示不定参数，该参数为一个数组，包含所有传入的参数，通过下标可以访问所有参数\r\nfunction sum(val, ...vals){\r\n   let vs = [];\r\n   for(let i=0;i<vals.length;i++){\r\n       vs.push(vals);\r\n   }\r\n}\r\n//其中不定参数只能放在最后,下面这种就会报错。\r\nfunction sum1(...vals,val){\r\n    \r\n}\r\n```\r\n\r\n## 展开运算符\r\n\r\n展开运算符和不定参数相似，例如\r\n\r\n```js\r\n//es6之前的版本要使用Math.max()查找数组最大值。\r\nconst vals = [3,1,2];\r\nconsole.log(Math.max.apply(Math,vals)) // 3\r\n//es6之后可以直接使用展开运算符，会将数组分割为各自独立的参数\r\nconsole.log(Math.max(...vals)) // 3 等价于 Math.max(3,1,2)\r\n\r\n//另外可以将展开运算符和正常参数一起使用，例如限定返回值最小为0\r\nconst vals1 = [-10,-20,-30];\r\nconsole.log(Math.max(...vals1, 0)) // 0\r\n```\r\n\r\n## name属性\r\n\r\nes6中所有函数都增加了name属性，例如\r\n\r\n```js\r\nfunction fun1(){\r\n    //...\r\n}\r\nconst fun2 = function(){\r\n    //...\r\n}\r\nconst fun3 = function fun4(){\r\n    //...\r\n}\r\nconsole.log(fun1.name)//fun1\r\nconsole.log(fun2.name)//fun2\r\nconsole.log(fun3.name)//fun4 由于函数表达式有一个名字fun4 权重比fun3高，所以为fun4\r\n```\r\n\r\n## 箭头函数\r\n\r\n箭头函数有以下特性：\r\n\r\n- 没有this super arguments new.target绑定，这些值由外层最近一个非箭头函数提供\r\n- 不能用new关键字调用，因为箭头函数没有construct方法，不能用new构造\r\n- 没有原型，因为不能用new，所有不存在prototype这个属性\r\n- 不可以改变this的指向，\r\n- 不支持arguments对象\r\n- 不支持重复的命名参数\r\n\r\n## 尾调用优化\r\n\r\n指的是函数作为另一个函数的最后一条语句被调用，例如\r\n\r\n```js\r\nfunction fun1(){\r\n    return fun2(); //尾调用优化\r\n}\r\nfunction fun1(){\r\n    fun2() //无法优化 或者\r\n    return 1+fun2()//无法优化\r\n}\r\n```\r\n\r\n'
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
