<template>
    <div class="sidebar-container">
        <el-menu
            :default-active="currentView"
            class="sidebar"
            :collapse="this.$store.state.isCollapse"
            background-color="#304156"
            text-color="#fff"
            active-text-color="#3D9EF4"
        >
            <div class="sidebar-title">
                <img src="/static/image/avatar.jpg" alt="image" />
                <h2 v-show="!this.$store.state.isCollapse">博客后台管理</h2>
            </div>
            <template v-for="(item, index) in navItems">
                <template v-if="item.subs">
                    <el-submenu :index="item.name" :key="index">
                        <template slot="title">
                            <i :class="`iconfont ${item.icon}`"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <template>
                            <el-menu-item
                                v-for="(sub, sindex) in item.subs"
                                :index="sub.name"
                                :key="sindex"
                                class="submenu-item"
                                @click="changeMenu(sub)"
                            >
                                {{ sub.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.name" :key="index" @click="changeMenu(item)">
                        <i :class="`iconfont ${item.icon}`"></i>
                        <span>{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sidebarIcon: "el-icon-s-fold",
            navItems: [
                {
                    icon: "icon-indexactive",
                    title: "首页",
                    name: "home",
                    path:'home'
                },
                {
                    icon: "icon-article",
                    title: "博客管理",
                    name: "article-all",
                    path: "article/all",
                    subs: [
                        {
                            icon: "icon-article",
                            title: "文章管理",
                            fatherTitle:'博客管理',
                            name: "article-all",
                            path: "article/all",
                        },
                        {
                            icon: "icon-article",
                            title: "发布文章",
                            fatherTitle:'博客管理',
                            name: "article-release",
                            path: "article/release",
                        },
                        {
                            icon: "icon-tag",
                            title: "分类管理",
                            fatherTitle:'博客管理',
                            name: "article-tags",
                            path: "article/tags",
                        },
                    ],
                },
                {
                    icon: "icon-huati",
                    title: "碎语管理",
                    name: "say-all",
                    path: "say/all",
                    subs: [
                        {
                            icon: "icon-article",
                            title: "全部碎语",
                            fatherTitle:'碎语管理',
                            name: "say-all",
                            path: "say/all",
                        },
                        {
                            icon: "icon-article",
                            title: "发布碎语",
                            fatherTitle:'碎语管理',
                            name: "say-release",
                            path: "say/release",
                        },
                    ],
                },
                {
                    icon: "icon-tag",
                    title: "留言管理",
                    name: "message",
                    path: "message",
                },
            ],
        };
    },
    computed: {
        currentView: {
            get() {
                return this.$store.state.currentView;
            },
            set(newVal) {
                this.$store.commit("changeCurrentView", newVal);
            },
        },
    },
    methods: {
        changeMenu(item) {
            const obj = {
                title: item.title,
                name: item.name,
                path:item.path,
            };
            
            // 切换菜单
            let path = this.$route.params.name;
            if(item.fatherTitle){
                obj.fatherTitle = item.fatherTitle;
                // 判断是否为二级菜单
                if (`${path}/${this.$route.params.subName}` !== item.path) {
                    this.$router.replace(`/dashboard/${item.path}`);
                }
            }
            else{
                 if (path !== item.path) {
                    this.$router.replace(`/dashboard/${item.path}`);
                }
            }
            this.$store.commit("changeCurrentView", obj.name);
            // 添加tab
            this.$store.commit("addTab", obj);
        },
        changeShow() {
            this.$store.state.isCollapse = !this.$store.state.isCollapse;
            this.sidebarIcon =
                this.sidebarIcon === "el-icon-s-fold"
                    ? "el-icon-s-unfold"
                    : "el-icon-s-fold";
        },
    },
};
</script>

<style>
.sidebarHide {
    transform: translateX(-30px);
}
.sidebar-container {
    display: flex;
}

.sidebar {
    height: 100vh;
}
.sidebar:not(.el-menu--collapse) {
    width: 200px;
}

.sidebar .sidebar-title {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2b2f3a;
    border-bottom: 1px solid #2b2f3a;
}

.sidebar .sidebar-title img {
    width: 50px;
    height: 50px;
    margin-right: 8px;
    border-radius: 4px;
}
.sidebar .sidebar-title h2 {
    color: #fff;
}
.hamburger span {
    cursor: pointer;
    font-size: 24px;
}
</style>