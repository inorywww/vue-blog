<template>
    <div class="articles-box">
        <div class="article-box-title">
            <div class="box-title">
                <h4>全部文章</h4>
            </div>
            <div class="showFormat">
                <el-switch
                        v-model="showFormatValue"
                        active-color="var(--themeFontColor)"
                        inactive-color="rgba(207,207,207,.4)"
                >
                </el-switch>
                <a>列表显示</a>
            </div>
        </div>
        <div class="article-box-content">
            <template v-for="(item, index) in articleItems">
                <article-item :item="item" :key="index"/>
            </template>
        </div>
    </div>
</template>

<script>
    let lastPosition = 0;//上一时刻滚动条的位置
    let nowPosition = 0;//下一时刻滚动条的位置
    let count = 0;
    import ArticleItem from "@/components/ArticleItem";

    export default {
        name: "ArticleBox",
        mounted() {
            this.axios.get('http://localhost:3000/articleItems').then(res => {
                console.log(res.data);
                this.articleItems = res.data;
            }).catch(err => {
                console.error(err)
            })
            this.$nextTick(() => {
                window.addEventListener('scroll', this.handleScroll);
            });
        },
        components: {
            ArticleItem
        },
        data() {
            return {
                showFormatValue: false,
                articleItems: [],
            }
        },
        methods: {
            handleScroll() {
                lastPosition = window.scrollY;
                let articleAll = document.querySelectorAll('.article-introduction');
                for (let i = 1; i < this.articleItems.length; i++) {
                    let rect = articleAll[i].getBoundingClientRect();//当前元素离浏览器的边距
                    if (nowPosition < lastPosition && rect.top - document.documentElement.clientHeight < 20
                        && !articleAll[i].classList.contains('animate__fadeInUp')) {//下滚
                        articleAll[i].classList.add('animate__fadeInUp');
                        count++;
                    }
                    if (count === this.articleItems.length - 1) {//如果文章已经添加完动画了 就移除
                        window.removeEventListener('scroll', this.handleScroll);
                    }
                }
                setTimeout(() => {
                    nowPosition = lastPosition;
                }, 80);
            },
        },
    }
</script>

<style scoped>
    .articles-box .article-box-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }

    .article-box-title .showFormat {
        display: flex;
        align-items: center;
    }

    .article-box-title .showFormat .el-switch {
        padding-right: 8px;
    }
</style>
