<template>
    <el-container class="container">
        <el-main style="overflow: hidden">
            <el-row class="row" :gutter="40">
                <el-col :span="16">
                    <article-box/>
                </el-col>
                <el-col :span="8">
                    <right-box/>
                </el-col>
            </el-row>
        </el-main>
        <router-view/>
    </el-container>
</template>

<script>
    import ArticleBox from "@/components/home/articleBox/ArticleBox";
    import RightBox from "@/components/home/rightBox/RightBox";

    let lastPosition = 0;//上一时刻滚动条的位置
    let nowPosition = 0;//下一时刻滚动条的位置
    export default {
        name: "home",
        mounted() {
            setTimeout(()=>{
                const items = document.querySelectorAll('.fadeInUp');
                console.log(items.length);
                for (let i = 0; i < items.length; i++) {
                    const rect = items[i].getBoundingClientRect();//当前元素离浏览器的边距
                    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
                    if (!(rect.bottom < 0 || rect.top - viewHeight >= 0)) {//下滚
                        items[i].classList.add('animate__animated','animate__fadeInUp');
                    }
                }
                this.handleScroll();
            },400);
        },
        components: {
            RightBox,
            ArticleBox,
        },
        data() {
            return {}
        },
        methods: {
            handleScroll(){
                window.addEventListener('scroll', ()=>{
                    lastPosition = window.scrollY;
                    const items = document.querySelectorAll('.fadeInUp');
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
    .row {
        margin: 0 auto !important;
    }
    .right-box > div {
        padding: 0 16px;
        margin-bottom: 16px;
    }
</style>
