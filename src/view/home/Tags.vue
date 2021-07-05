<template>
    <div class="tags">
        <header class="header">
            <h1>#{{ showTag }}</h1>
            <h1>共{{tagNum}}篇文章</h1>
        </header>
        <el-row :gutter="40" class="body">
            <el-col :span="20">
                <div class="article-list">
                    <!-- 强制渲染 -->
                    <tag-articles :key="new Date().getTime()" />
                </div>
            </el-col>
            <el-col :span="4" class="aside">
                <div class="tags-list">
                    <div
                        class="tag-item"
                        :class="{ 'tag-item-active': index == current }"
                        v-for="(item, index) in tags"
                        :key="index"
                        @click="changeTag(index)"
                    >
                        <span>{{ item.tagName }}</span>
                        <span>{{ item.totalNum }}</span>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getAllTags } from "@/api";
import TagArticles from "./components/tags/TagArticles";

export default {
    components: { TagArticles },
    name: "Tags",
    async mounted() {
        this.showTag = this.$route.params.tagName;
        await getAllTags().then((res) => {
            if (res.status == 200) {
                this.tags = res.data;
            }
        });
        // 获取当前tag
        
        this.current = this.tags.findIndex((item) => {
            return item.tagName === this.showTag;
        });
        this.tagNum = this.tags[this.current].totalNum;
    },
    data() {
        return {
            tags: [],
            current: 0,
            showTag: "",
            tagNum:0,
        };
    },
    methods: {
        changeTag(index) {
            if (this.showTag !== this.tags[index].tagName) {
                this.showTag = this.tags[index].tagName;
                this.tagNum = this.tags[index].totalNum;
                this.$router.push(`/tags/${this.tags[index].tagName}`);
                this.current = index;
                this.$forceUpdate();
            }
        },
    },
};
</script>

<style scoped>
.header {
    display: flex;
    background: var(--themeCardColor);
    border-radius: 6px;
    padding: 8px;
    margin: 20px 0;
}
.header h1{
    padding: 0 24px;
}
.body {
    margin-top: 20px;
    position: relative;
}
.aside{
    position: absolute;
    right: 0;
}
.tag-item-active {
    transform: scale(1.2);
    background-color: #909399 !important;
}
.tags-list .tag-item {
    margin: 0 auto 20px;
    padding: 12px 16px;
    border-radius: 6px;
    background: var(--themeCardColor);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%),
        0 4px 6px -2px rgb(0 0 0 / 5%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 600;
    transition: all 0.1s ease;
    cursor: pointer;
}
.tags-list .tag-item:not(.tag-item-active):hover {
    transform: scale(1.1);
}
</style>
