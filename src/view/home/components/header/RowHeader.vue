<template>
    <div class="rowHeader">
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
    name:'rowHeader',
    props:{
        navItems:Array,
    }
};
</script>

<style scoped>
   .el-menu {
        border-bottom: none !important;
        z-index: 100;
        background-color: var(--themeBodyColor) !important;
    }

    .el-menu-item.is-active {
        background-color: var(--themeFontColor) !important;
        color: var(--themeBodyColor) !important;
        opacity: .5;
    }
    .el-menu > li .iconfont {
        padding: 0 2px;
    }
</style>