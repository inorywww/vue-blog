<template>
    <div class="sidebar-container">
        <el-menu
            :default-active="currentView"
            class="sidebar"
            @open="handleOpen"
            @close="handleClose"
            :collapse="this.$store.state.isCollapse"
            background-color="#304156"
            text-color="#fff"
            active-text-color="#3D9EF4"
        >
            <div class="sidebar-title">
                <img src="/static/image/avatar.jpg" alt="image" />
                <h2 v-show="!this.$store.state.isCollapse">博客后台管理</h2>
            </div>
            <el-menu-item 
                v-for="(item, index) in elMenus" 
                :key="index"
                :index="item.name"
                @click="changeMenu(index)"
            >
                <i :class="`iconfont ${item.icon}`"></i>
                <span slot="title">{{item.title}}</span>
            </el-menu-item>
           
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sidebarIcon: "el-icon-s-fold",
            elMenus:[
                {
                    icon:'icon-indexactive',
                    title:'首页',
                    name:'Home',
                    path:'home',
                },
                {
                    icon:'icon-article',
                    title:'文章管理',
                    name: "Articles",
                    path:'articles'
                },
                {
                    icon:'icon-huati',
                    title:'碎语管理',
                    name: "Says",
                    path:'says'
                },
                {
                    icon:'icon-tag',
                    title:'标签管理',
                    name: "Tags",
                    path:'tags'
                },
                {
                    icon:'icon-tag',
                    title:'留言管理',
                    name: "Messages",
                    path:'messages'
                },
                
            ]
        };
    },
    computed:{
         currentView: {
            get(){
                return this.$store.state.currentView;
            },
            set(newVal){
                this.$store.commit('changeCurrentView', newVal);
            }
        },
    },
    methods: {
        changeMenu(index){
             const obj = {
                title:this.elMenus[index].title,
                name: this.elMenus[index].name,
                path:this.elMenus[index].path
            }
            // 添加tab
            this.$store.commit('addTab', obj);
            // 切换显示的tab
            this.$store.commit('changeCurrentView', obj.name);
            if (this.$route.params.name !==obj.path) {
                this.$router.replace(`/dashboard/${obj.path}`);
            }
        },
        changeShow() {
            this.$store.state.isCollapse = !this.$store.state.isCollapse;
            this.sidebarIcon = this.sidebarIcon === "el-icon-s-fold"
                    ? "el-icon-s-unfold"
                    : "el-icon-s-fold";
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
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