<template>
    <div class="article-container">
        <div class="article-cover">
            <img :src="articleItem.coverSrc" alt="images">
        </div>
        <header class="article-info">
            <div class="article-title">
                <h1>{{articleItem.title}}</h1>
            </div>
            <div class="article-time">
                <span>{{articleItem.time}}</span>
            </div>
        </header>
        <main class="article-content">
            <div class="markdown-body">
                <component :is="articleComponent"/>
            </div>
        </main>
    </div>
</template>

<script>
    import 'github-markdown-css';
    import 'highlight.js/styles/vs2015.css';

    export default {
        name: "Article",
        components: {
        },
        mounted() {
            this.axios.get('http://localhost:3000/articleItems').then(res => {
                this.articleItem = res.data.filter((item) => {
                    return item.articleID === Number(this.$route.params.id);
                })[0];
                console.log(this.articleItem);
                if (!this.articleItem){
                    console.log("404");
                    this.$route.push("404");
                }
                let path = this.articleItem.fileName;
                this.$options.components['articleMD'] = require(`@/assets/md/${path}`).default;
                this.articleComponent = 'articleMD';
            }).catch(err => {
                console.error(err)
            });
        },

        data() {
            return {
                articleItem: {},
                mdContent: '',
                key: 0,
                articleComponent: ''
            }
        },
        methods: {

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
        height: auto !important;
        background-color: var(--themeCardColor);
        /*margin: 12px 0;*/
        padding: 0 8px;
        margin: 8px 0;
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
</style>
