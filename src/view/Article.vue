<template>
    <div class="article">
        <div class="markdown-body">
            <!--            <vue-markdown :source="mdData"></vue-markdown>-->
            <markdown-data></markdown-data>
        </div>
    </div>
</template>

<script>
    // 这种方式引入 数据可直接使用
    import markdownData from '@/assets/vuex.md';
    import 'github-markdown-css';

    export default {
        name: "Article",
        mounted() {
        },
        components: {
            markdownData
        },
        data() {
            return {}
        },
        methods: {},
    }
</script>

<style scoped>
    .article {
        width: 60%;
        margin: 0 auto;
    }

    .markdown-body h1,h2,h3,h4 {
        color: var(--themeFontColor) !important;
    }
</style>
