<template>
    <div class="content-container">
        <div class="tags-view-container">
            <el-tabs
                v-model="currentView"
                type="card"
                closable
                @tab-remove="removeTab"
                @tab-click="changeTab"
            >
                <el-tab-pane
                    v-for="item in allTabs"
                    :key="item.name"
                    :label="item.title"
                    :name="item.name"
                ></el-tab-pane>
            </el-tabs>
        </div>
        <div class="app-main">
            <div class="app-container">
                <div :is="currentView" keep-alive></div>
            </div>
        </div>
    </div>
</template>

<script>
const Home = () => import("../Home");
//文章管理
const ArticleAll = () => import("../Articles");
const ArticleRelease = () => import("../ReleaseArticle");
const ArticleTags = () => import("../Tags");
//碎语管理
const SayAll = () => import("../Says");
const SayRelease = () => import("../ReleaseSay")
//留言管理
const Message = () => import("../Messages");
export default {
    name: "mainContent",
    mounted() {
    },
    components: {
        Home,
        ArticleAll,
        ArticleRelease,
        ArticleTags,
        SayAll,
        SayRelease,
        Message,
    },
    computed: {
        allTabs() {
            return this.$store.state.allTabs;
        },
        currentView: {
            get() {
                return this.$store.state.currentView;
            },
            set(newVal) {
                this.$store.commit("changeCurrentView", newVal);
            },
        },
    },
    data() {
        return {
            tabIndex: 2,
        };
    },
    watch: {
        $route: function () {
            let s = this.$route.params.name;
            // 判断是否为子菜单
            if(this.$route.params.subName){
                s += `-${this.$route.params.subName}`
            }
            this.$store.commit("changeCurrentView",s);
        },
    },
    methods: {
        changeTab(target) {
            const chooseTab = this.allTabs[target.index];
            let path = this.$route.params.name;
            // 切换显示的tab
            if(chooseTab.fatherTitle){
                // 判断是否为二级菜单
                if (`${path}/${this.$route.params.subName}` !== chooseTab.path) {
                    this.$router.replace(`/dashboard/${chooseTab.path}`);
                }
            }
            else{
                 if (path !== chooseTab.path) {
                    this.$router.replace(`/dashboard/${chooseTab.path}`);
                }
            }
          
        },
        removeTab(targetName) {
            if (targetName === "home") {
                return;
            }
            let tabs = this.allTabs;
            let activeName = this.currentView;
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            const pathItem = this.allTabs.find(item => item.name === nextTab.name)
                            this.$router.replace(`/dashboard/${pathItem.path}`);
                        }
                    }
                });
            }
            this.$store.commit("delTab", targetName);
        },
    },
};
</script>

<style scoped>
#tab-dashboard > .el-icon-close:nth-child(1) {
    display: none !important;
}
</style>