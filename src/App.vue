<template>
    <div id="app">
        <Header/>
        <el-backtop class="iconfont icon-rocket" @click="toTop"></el-backtop>
        <div class="app-container">
            <router-view style="padding-top: 60px"/>
        </div>
    </div>
</template>

<script>
    let lastPosition = 0;//上一时刻滚动条的位置
    let nowPosition = 0;//下一时刻滚动条的位置

    import Header from "@/components/Header";
    export default {
        name: 'App',
        components: {
            Header,
        },
        mounted(){
            // 添加鼠标往下滚动出现动画的效果
            this.$nextTick(() => {
                this.handleScroll();
            });
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
            handleScroll(){
                window.addEventListener('scroll', ()=>{
                    lastPosition = window.scrollY;
                    let items = document.querySelectorAll('.fadeInUp');
                    for (let i = 0; i < items.length; i++) {
                        let rect = items[i].getBoundingClientRect();//当前元素离浏览器的边距
                        if (nowPosition < lastPosition && rect.top - document.documentElement.clientHeight < 20
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

<style>
    .app-container{
        width: 75%;
        margin: 0 auto;
    }
    body {
        margin: 0;
        padding: 0;
        background-color: var(--themeBodyColor);
        color: var(--themeFontColor);
        /*自定义属性*/
        --themeBodyColor: #272727; /*默认主题 背景颜色*/
        --themeCardColor: #2F3133; /*卡片颜色*/
        --themeFontColor: #F4F4F4; /*字体颜色*/
        transition: all .3s;
    }

    a {
        color: var(--themeFontColor);/*使用var()获取自定义属性*/
        text-decoration: none;
        font-size: 14px;
    }

    h1,h2,h3,h4 {
        color:var(--themeFontColor);
        margin: 8px 0;
        font-size: 1.5em;
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
</style>
