<template>
    <div class="header">
        <el-header class="nav">
            <div class="nav-left">
                <h4>
                    <a href="/">INORYWW</a>
                </h4>
            </div>
            <div class="nav-center">
                <el-menu
                        router
                        mode="horizontal"
                        background-color="var(--themeColor)"
                        default-active="home">
                    <template v-for="(item,index) in navItems">
                        <template v-if="item.subs">
                            <el-submenu :index="item.page" :key="index">
                                <template>
                                    <template slot="title">
                                        <i :class="`iconfont ${item.icon}`"></i>
                                        {{item.title}}
                                    </template>
                                </template>
                                <template>
                                    <el-menu-item v-for="(subItem,index1) in item.subs" :index="subItem.page"
                                                  :key="index1" class="submenu-item">
                                        {{subItem.title}}
                                    </el-menu-item>
                                </template>
                            </el-submenu>
                        </template>
                        <template v-else>
                            <el-menu-item :index="item.page" :key="index">
                                <i :class="`iconfont ${item.icon}`"></i>
                                <span>{{item.title}}</span>
                            </el-menu-item>
                        </template>
                    </template>
                </el-menu>
            </div>
            <div class="nav-right">
                <div class="theme" @click="toggleTheme">
                    <i :class="`iconfont ${nowThemeIcon}`"></i>
                </div>
                <div class="actions" @click="toggleTheme">
                    <a class="login" href="/">登录</a>
                    |
                    <a class="login" href="/">注册</a>
                </div>
            </div>
        </el-header>
    </div>
</template>

<script>
    const themes = ['#f4f4f4', '#272727',];
    const themeIcons = ['icon-sun', 'icon-moon'];
    let nowTheme = themes[0];
    let nowFont = themes[1];
    export default {
        name: "Header",
        mounted() {
        },
        data() {
            return {
                navItems: [
                    {
                        icon: 'icon-indexactive',
                        page: 'home',
                        title: '首页'
                    },
                    {
                        icon: 'icon-Category',
                        page: 'category',
                        title: '分类',
                        subs: [
                            {
                                icon: '',
                                page: 'skillShare',
                                title: '技术分享',
                            },
                            {
                                icon: '',
                                page: 'say',
                                title: '碎碎念',
                            },
                        ]
                    },
                    {
                        icon: 'icon-tag',
                        page: 'tags',
                        title: '标签',
                        subs: [
                            {
                                icon: '',
                                page: 'JavaScript',
                                title: 'JavaScript',
                            },
                            {
                                icon: '',
                                page: 'Vue',
                                title: 'Vue',
                            },
                            {
                                icon: '',
                                page: 'Python',
                                title: 'Python',
                            },
                            {
                                icon: '',
                                page: 'more',
                                title: '更多',
                            },
                        ]
                    },
                    {
                        icon: 'icon-40one',
                        page: 'about',
                        title: '关于'
                    },
                    {
                        icon: 'icon-aichegujiabeifen7',
                        page: 'all',
                        title: '归档'
                    },
                    {
                        icon: 'icon-liuyan',
                        page: 'message',
                        title: '留言'
                    },
                ],
                nowThemeIcon: themeIcons[0],
            }
        },
        methods: {
            toggleTheme() {
                nowTheme = nowTheme === themes[0] ? themes[1] : themes[0];
                nowFont = nowFont === themes[1] ? themes[0] : themes[1];
                document.body.style.setProperty('--themeColor', nowTheme);
                document.body.style.setProperty('--themeFontColor', nowFont);
                this.nowThemeIcon = this.nowThemeIcon === themeIcons[1] ? themeIcons[0] : themeIcons[1];
            }
        },
    }
</script>

<style scoped>
    .header {
        /*position: fixed;*/
    }

    .el-menu {
        border-bottom: none !important;
    }

    .is-active {
        background-color: var(--themeFontColor) !important;
        color: var(--themeColor) !important;
        border-bottom: none !important;
        opacity: .4;
    }

    .header .nav {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .header .nav .nav-right {
        display: flex;
        align-items: center;
    }

    .header .nav .nav-right .theme {
        margin: 8px 12px 0 0;
        cursor: pointer;
    }

    .header .nav .nav-right .theme .icon-sun {
        color: var(--themeFontColor);
    }

    .header .nav .nav-right .actions {
        font-size: 14px;
        margin-top: 4px;
    }

    .el-menu > li .iconfont {
        padding: 0 2px;
    }
</style>
