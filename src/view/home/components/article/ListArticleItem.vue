<template>
    <router-link :to="`/article/${item.articleID}`">
        <div class="article-list-item">
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
                    <el-button type="info" class="see iconfont icon-see" plain>
                            <span>{{item.action.see}}</span>
                    </el-button>
                    <el-button type="info" class="like iconfont icon-like" plain>
                        <span>{{item.action.like}}</span>
                    </el-button>
                    <el-button type="info" class="comment iconfont icon-comment" plain>
                        <span>{{item.action.comment}}</span>
                    </el-button>
                </footer>
            </el-card>
        </div>
    </router-link>
</template>

<script>
export default {
    name: "articleItem",
    props: {
        item: Object,
    },
    mounted() {},
    components: {},
    data() {
        return {
            isAnimate: "",
        };
    },
    methods: {
        addAnimate() {
            this.isAnimate = "animate__bounceIn";
            console.log("addAnimate");
        },
        removeAnimate() {
            this.isAnimate = "";
            console.log("removeAnimate");
        },
    },
};
</script>

<style scoped>
.article-time {
    color: #b0b1b2;
}
.article-list-item {
    transition: all 0.5s;
}
.article-list-item:hover {
    transform: scale(1.05);
}
</style>