<template>
    <div class="tags">
        <header class="header">
            <h1>#{{ showTag }}</h1>
            <h1>共{{tagNum}}篇文章</h1>
        </header>
        <el-row :gutter="40" class="body">
            <el-col :span="20" class="main">
                <div class="showFormat">
                    <el-switch
                            v-model="showList"
                            active-color="var(--themeFontColor)"
                            inactive-color="rgba(207,207,207,.4)"
                    >
                    </el-switch>
                    <a>列表显示</a>
                </div>
                <div class="article-list">
                    <template v-if="!showList">
                        <tag-table-show :key="sonKey"/>
                    </template>
                    <template v-else>
                        <tag-list-show :key="sonKey"/>
                    </template>
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
    import {getAllTags} from "@/api";
    import TagListShow from "./components/tags/TagTableShow";
    import TagTableShow from "./components/tags/TagListShow";

    export default {
        components: {TagTableShow, TagListShow},
        name: "Tags",
        async mounted() {
            await getAllTags().then((res) => {
                if (res.status === 200) {
                    this.tags = res.data;
                    // 获取当前tag 根据url判断 如果为/tags 就重定向到第一个tag，如果为/tags/?tagName = ?,就还是在当前页面
                    if(!this.$route.query.tagName){
                        const firstTag = this.tags[0].tagName;
                        this.showTag = firstTag;
                        this.$router.replace({
                            path:`/tags`,
                            query:{
                                tagName:this.showTag,
                            }
                        });
                    }
                    else{
                        this.showTag = this.$route.query.tagName;
                    }
                    this.current = this.tags.findIndex((item) => {
                        return item.tagName === this.showTag;
                    });
                    this.tagNum = this.tags[this.current].totalNum;
                }
            });
        },
        watch: { //通过watch来监听路由变化  从而刷新子组件
            "$route": function (){  
                this.sonKey = new Date().getTime();
                this.showTag = this.$route.query.tagName;
                this.current = this.tags.findIndex((item) => {
                    return item.tagName === this.showTag;
                });
                this.tagNum = this.tags[this.current].totalNum;
            }  
        },
        computed: {
            showList: { //改变显示方式时动态记录，下次回来该页面也能保持该方式
                get() {
                    return this.$store.state.showListOrTable.tags;
                },
                set() {
                    this.$store.commit("changeShowWay", 'tags');
                },
            },
        },
        data() {
            return {
                tags: [],
                current: 0,
                showTag: "",
                tagNum: 0,
                sonKey:'',
            };
        },
        methods: {
            changeTag(index) {
                if (this.showTag !== this.tags[index].tagName) {
                    this.showTag = this.tags[index].tagName;
                    this.tagNum = this.tags[index].totalNum;
                    this.$router.replace({
                            path:`/tags`,
                            query:{
                                tagName:this.showTag,
                            }
                        })
                    this.current = index;
                    // this.$forceUpdate();
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

    .header h1 {
        padding: 0 24px;
    }

    .body {
        margin-top: 20px;
        position: relative;
    }

    .aside {
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

    .showFormat {
        padding: 8px 16px;
        margin-bottom: 20px;
        text-align: right;
    }
</style>
