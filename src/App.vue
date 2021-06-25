<template>
    <div id="app">
        <Header/>
        <el-backtop class="iconfont icon-rocket"></el-backtop>
        <router-view/>
        <!--    <router-link to="/profile">首页</router-link>-->
        <!--    <router-link to="/content">内容页</router-link>-->
    </div>
</template>

<script>
    import Header from "@/components/Header";

    export default {
        name: 'App',
        components: {
            Header
        }
    }
</script>

<style>
    body {
        margin: 0;
        padding: 0;
        font-size: 14px;
        background-color: var(--themeColor);
        color: var(--themeFontColor);
        --themeColor: #272727;
        --themeFontColor: #f4f4f4;
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
        background-color: transparent;
        color: var(--themeFontColor);
        font-size: 24px;
    }
    .el-backtop i{
        display: none;
    }
    .el-card {
        border: none !important;
        background-color: var(--themeColor) !important;
        color: var(--themeFontColor) !important;
    }
</style>
