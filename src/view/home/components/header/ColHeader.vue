<template>
    <div class="colHeader">
        <el-menu
            router
            mode="horizontal"
            :default-active="$route.path"
            background-color="var(--themeBodyColor)"
            text-color="var(--themeFontColor)"
            active-text-color="var(--themeFontColor)"
        >
            <template v-for="(item, index) in navItems">
                <template v-if="item.subs">
                    <el-submenu :index="item.page" :key="index">
                        <template slot="title">
                            <i :class="`iconfont ${item.icon}`"></i>
                            {{ item.title }}
                        </template>
                        <template>
                            <el-menu-item
                                v-for="(subItem, index1) in item.subs"
                                :index="subItem.page"
                                :key="index1"
                                class="submenu-item"
                            >
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.page" :key="index">
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
    name: "colHeader",
    props: {
        navItems: Array,
    },
};
</script>

<style scoped>
.colHeader {
    position: fixed;
    left: 0;
    top: 60px;
    width: 60%;
    text-align: center;
    height: 100%;
    box-shadow: 0 0 0 999px rgba(0, 0, 0, 0.5);
    /* z-index: 100; */
}
.el-menu {
    height: 100vh !important;
}
.el-menu--horizontal > .el-menu-item {
    float: none;
}
</style>