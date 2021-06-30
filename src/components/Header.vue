<template>
    <div :class="`header ${$store.state.headerIsShow}`">
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
                        default-active="home"
                        background-color="var(--themeBodyColor)"
                        text-color="var(--themeFontColor)"
                        active-text-color="var(--themeFontColor)"
                >
                    <template v-for="(item,index) in navItems">
                        <template v-if="item.subs">
                            <el-submenu
                                    :index="item.page"
                                    :key="index"
                            >
                                <template slot="title">
                                    <i :class="`iconfont ${item.icon}`"></i>
                                    {{item.title}}
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
    const themeIcons = ['icon-sun', 'icon-moon'];
    let themes = {};
    let nowTheme = {
        themeName: '',
        theme: {},
    };
    let lastPosition = 0;
    let nowPosition = 0;

    export default {
        name: "Header",
        mounted() {
            themes = this.$store.state.themes;
            nowTheme.themeName = 'themeDark';
            nowTheme.theme = themes.themeDark;
            window.addEventListener('scroll', this.handleScroll);
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
                nowThemeIcon: 'icon-sun',
            }
        },
        props: {},
        methods: {
            toggleTheme() {
                nowTheme.themeName = nowTheme.themeName === 'themeLight' ? 'themeDark' : 'themeLight';
                nowTheme.theme = nowTheme.themeName === 'themeLight' ? themes.themeLight : themes.themeDark;
                document.body.style.setProperty('--themeBodyColor', nowTheme.theme.bodyColor);
                document.body.style.setProperty('--themeCardColor', nowTheme.theme.cardColor);
                document.body.style.setProperty('--themeFontColor', nowTheme.theme.fontColor);
                this.nowThemeIcon = this.nowThemeIcon === themeIcons[1] ? themeIcons[0] : themeIcons[1];
            },
            handleScroll() {
                // 根据滚动位置做的事
                lastPosition = window.scrollY;
                if (nowPosition < lastPosition) {//下滚
                    this.$store.commit('updateShow','header-hidden');//修改值
                } else { //上滚
                    this.$store.commit('updateShow','');
                }
                setTimeout(() => {
                    nowPosition = lastPosition;
                }, 80)
            }
        },

    }
</script>

<style scoped>
    .header {
        position: fixed;
        width: 100%;
        z-index: 100;
        background-color: var(--themeBodyColor) !important;
        transition: transform 1s;
    }

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

    .header .nav .nav-right .actions {
        margin-top: 4px;
    }

    .el-menu > li .iconfont {
        padding: 0 2px;
    }

    .header-hidden {
        transform: translateY(-60px);
    }
</style>
