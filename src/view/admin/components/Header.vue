<template>
    <div class="header">
        <div class="header-left">
            <div class="hamburger" @click="changeShow">
                <span :class="sidebarIcon"></span>
            </div>
            <div class="breadNav">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/dashboard/home' }">首页
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>{{breadTitle || ''}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="header-right userInfo">
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    个人信息<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <router-link to="/">前台首页</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <router-link to="https://github.com/inorywww/vue-blog"
                            >github</router-link
                        >
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    name:"dashboardHeader",
    data() {
        return {
            sidebarIcon: "el-icon-s-fold",
        };
    },
    mounted(){
        // 初次进入时点击一下'首页'
        if(!this.$route.params.name){
            document.querySelector('.el-menu-item').click();
        }
    },
    computed:{
        breadTitle:{
            get(){
                if(!this.$route.params.name){
                    return '首页'
                }
                else{
                    const path = this.$route.params.name;
                    const tab = this.$store.state.allTabs.find(item => {
                        return item.path === path;
                    });
                    return tab.title;
                }
            },
        }
    },
    methods: {
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
a {
    text-decoration: none;
    color: black;
}
.header {
    width: 100%;
    height: 100%;
    box-shadow: 0 5px 10px -5px #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
}
 .header-left {
    display: flex;
    align-items: center;
}

.header-left .hamburger {
    margin: 0 12px;
}
.header-right {
    cursor: pointer;
    padding-right: 16px;
}
</style>