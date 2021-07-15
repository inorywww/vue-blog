<template>
    <div id="Index">
        <Progress/>
        <Header/>
        <el-backtop class="iconfont icon-rocket" @click="toTop"></el-backtop>
        <div class="app-container" >
            <router-view style="padding-top: 60px"/>
        </div>
    </div>
</template>

<script>
    import Progress from '@/view/home/components/Progress';
    import Header from "@/view/home/components/Header";
    export default {
        name: 'Index',
        components: {
            Progress,
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
    @media (max-width:1600px){
        .app-container{
            width: 90%;
        }
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
    h1,h2{
        color:var(--themeFontColor);
        margin: 16px 0;
        font-size: 2rem;
    }
    h3,h4 {
        color:var(--themeFontColor);
        margin: 8px 0;
        font-size: 1.5rem;
    }
    .el-backtop{
        color: #272727 !important;
        font-size: 24px;
        z-index: 2000;
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
        background-color: var(--themeBodyColor) !important;
        border: 0 solid #fff !important;
        transition: all .5s !important;
        padding: 4px 8px !important;
        opacity: .8 !important;
    }
    .el-button--info:hover {
        background-color: var(--themeFontColor) !important;
        opacity: .5 !important;
        color: var(--themeBodyColor) !important;
    }
    .hljs{
        color: var(--themeFontColor) !important;
    }
    .hljs-keyword, .hljs-selector-tag, .hljs-subst, .hljs-tag, .hljs-name, .hljs-attribute{
        color: #d7acbc !important;
    }
    .v-note-wrapper .v-note-op .v-left-item, .v-note-wrapper .v-note-op .v-right-item{
        -webkit-flex:none !important; 
    }
    .v-note-wrapper .v-note-op .v-right-item{
        max-width: 100% !important;
    }
</style>
