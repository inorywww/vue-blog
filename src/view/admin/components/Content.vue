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
const Articles = () => import("../Articles");
const Says = () => import("../Says");
const Tags = () => import("../Tags");
const Messages = () => import("../Messages");
export default {
    name: "mainContent",
    mounted() {
    },
    components: {
        Home,
        Articles,
        Says,
        Tags,
        Messages,
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
            const s = this.$route.params.name;
            this.$store.commit(
                "changeCurrentView",
                s.slice(0, 1).toUpperCase() + s.slice(1).toLowerCase()
            );
        },
    },
    methods: {
        changeTab(target) {
            const chooseTab = this.allTabs[target.index];
            if (this.$route.params.name !== chooseTab.path) {
                this.$router.replace(`/dashboard/${chooseTab.path}`);
            }
        },
        removeTab(targetName) {
            if (targetName === "Home") {
                return;
            }
            let tabs = this.allTabs;
            let activeName = this.currentView;
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.name;
                            this.$router.replace(`/dashboard/${activeName.toLowerCase()}`);
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