<template>
    <div id="Index">
        <Header/>
        <el-backtop class="iconfont icon-rocket" @click="toTop"></el-backtop>
        <div class="app-container">
            <router-view style="padding-top: 60px"/>
        </div>
    </div>
</template>

<script>
    import Header from "@/view/home/components/Header";
    export default {
        name: 'Index',
        components: {
            Header,
        },
        mounted(){
        },
        data() {
            return {
                isShow:'',
            }
        },
        methods:{
            toTop(){
                this.$store.state.headerIsShow = '';
            },

        },
    }
</script>

<style>
    .app-container{
        width: 60%;
        margin: 0 auto;
    }
    body {
        margin: 0;
        padding: 0;
        background-color: var(--themeBodyColor);
        color: var(--themeFontColor);
        /*自定义属性*/
        /*--themeBodyColor: #2F3133; !*默认主题 背景颜色*!*/
        /*--themeCardColor: #272727; !*卡片颜色*!*/
        /*--themeFontColor: #F4F4F4; !*字体颜色*!*/
        --themeBodyColor: #F4F4F4; /*默认主题 背景颜色*/
        --themeCardColor: #FFFFFF; /*卡片颜色*/
        --themeFontColor: #171D20; /*字体颜色*/
        transition: all .3s;
        font-family: '微软雅黑';
    }

    a,p,ol,ul{
        color: var(--themeFontColor);/*使用var()获取自定义属性*/
        text-decoration: none;
        font-size: 1.3rem;
    }

    h1,h2,h3,h4 {
        color:var(--themeFontColor);
        margin: 8px 0;
        font-size: 1.5rem;
    }
    .el-backtop{
        color: #272727 !important;
        font-size: 24px;
    }
    .el-backtop i{
        display: none;
    }
    .el-card {
        border: none !important;
        background-color: var(--themeCardColor) !important;
        color: var(--themeFontColor) !important;
        margin: 16px;
    }
    .el-button--info {
        background: transparent !important;
        border: 0 solid #fff !important;
        transition: all .5s !important;
        padding: 4px !important;
    }

    .el-button--info:hover {
        background-color: var(--themeFontColor) !important;
        opacity: .4 !important;
        color: var(--themeBodyColor) !important;
    }

    .hljs-keyword, .hljs-selector-tag, .hljs-subst, .hljs-tag, .hljs-name, .hljs-attribute{
        color: #d7acbc !important;
    }
</style>
