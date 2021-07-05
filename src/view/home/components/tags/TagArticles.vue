<template>
    <div class="tag-articles-list">
        <router-link
            :to="`/article/${item.articleID}`"
            v-for="(item, index) in tagArticles"
            :key="index"
        >
            <div class="tag-article-item fadeInUp">
                <el-card>
                    <header class="item-header">
                        <div class="title">
                            <h3>{{ item.title }}</h3>
                        </div>
                        <div class="article-time">
                            {{ item.time }}
                        </div>
                    </header>
                    <main class="item-body">
                        <div class="introduction">
                            <p>
                                {{ item.introduction }}
                            </p>
                        </div>
                    </main>
                    <footer class="article-action">
                        <el-button
                            type="info"
                            class="see iconfont icon-see"
                            plain
                        >
                            <span>{{ item.action.see }}</span>
                        </el-button>
                        <el-button
                            type="info"
                            class="like iconfont icon-like"
                            plain
                        >
                            <span>{{ item.action.like }}</span>
                        </el-button>
                        <el-button
                            type="info"
                            class="comment iconfont icon-comment"
                            plain
                        >
                            <span>{{ item.action.comment }}</span>
                        </el-button>
                    </footer>
                </el-card>
            </div>
        </router-link>
    </div>
</template>

<script>
import { handleScroll } from "@/utils/index";
import { getAllArticle } from "@/api";
export default {
    name: "tagArticles",
    async mounted() {
      await getAllArticle().then((res) => {
            res.data.forEach((item) => {
                item.tags.forEach((tag) => {
                    if (tag === this.$route.params.tagName) {
                        this.tagArticles.push(item);
                    }
                });
            });
        });
         this.$nextTick(()=>{
             handleScroll();
        })
    },

    data() {
        return {
            tagArticles: [],
        };
    },
    methods: {},
};
</script>

<style scoped>
.el-card{
    margin-top: 0px !important;
    margin-bottom: 20px !important ;
    transition: all .3s ease;
}
.el-card:hover{
    transform: scale(1.03);
}
</style>
