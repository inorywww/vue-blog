<template>
    <div id="app">
        <Header/>
        <el-backtop class="iconfont icon-rocket" @click="toTop"></el-backtop>
        <router-view style="padding-top: 60px"/>
    </div>
</template>

<script>
    import Header from "@/components/Header";

    export default {
        name: 'App',
        components: {
            Header
        },
        data() {
            return {
                isShow:'',
            }
        },
        methods:{
            toTop(){
                this.$store.state.headerIsShow = '';
            }
        },
    }
</script>

<style>
    body {
        margin: 0;
        padding: 0;
        font-size: 14px;
        background-color: var(--themeBodyColor);
        color: var(--themeFontColor);
        --themeBodyColor: #272727; /*默认主题 背景颜色*/
        --themeCardColor: #2F3133; /*卡片颜色*/
        --themeFontColor: #F4F4F4; /*字体颜色*/
        transition: all .3s;
    }

    a {
        color: var(--themeFontColor);
        text-decoration: none;
    }

    h4 {
        color:var(--themeFontColor);
        font-size: 20px !important;
        margin: 8px 0;
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
    }
</style>
