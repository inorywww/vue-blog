<template>
    <div :class="`header ${$store.state.headerIsShow}`">
        <el-header class="nav">
            <div class="nav-left">
                <h4>
                    <router-link to="/home">INORYWW</router-link>
                </h4>
            </div>
            <div class="nav-center">
                <row-header :navItems="navItems" class="rowHeader"/>
                <col-header
                    :navItems="navItems"
                    :class="`colHeader animate__animated ${hideColNav}`"
                    v-show="colIsShow"
                />
            </div>
            <div class="nav-right">
                <div class="comment" @click="toComment" v-if="this.$store.state.isShowComment">
                    <i :class="`iconfont icon-comment`"></i>
                </div>
                <div class="theme" @click="toggleTheme">
                    <i :class="`iconfont ${nowThemeIcon}`"></i>
                </div>
                <div class="menu-icon" @click="showColHeader">
                    <i class="iconfont icon-menu"></i>
                </div>
            </div>
        </el-header>
    </div>
</template>

<script>
import ColHeader from "./header/ColHeader.vue";
import RowHeader from "./header/RowHeader";
const themeIcons = ["icon-sun", "icon-moon"];
let themes = {};
let nowTheme = {
    themeName: "",
    theme: {},
};
let lastPosition = 0;
let nowPosition = 0;

export default {
    components: { RowHeader, ColHeader },
    name: "Header",
    async mounted() {
        themes = this.$store.state.themes;
        nowTheme.themeName = "themeLight";
        nowTheme.theme = themes.themeLight;
        window.header = window.addEventListener("scroll", this.handleScroll);
        window.ccc =  document.addEventListener('click',(e)=>{
            //能点击 并当前header为col执行
            if(this.canClick && this.hideColNav!=='default'){
                const t = e.target.className;
                 if(t!=='el-menu--horizontal el-menu'){
                    document.querySelector('.colHeader').setAttribute('style','box-shadow:none')
                    this.hideColNav = 'animate__slideOutLeft';
                    this.canClick = false; //动画期间不能点击
                    setTimeout(() => {
                        this.colIsShow = false;
                        this.canClick = true;
                        this.hideColNav = 'default';
                    }, 500);
                }
            }
        })
    },
    data() {
        return {
            navItems: [
                {
                    icon: "icon-indexactive",
                    page: "/home",
                    title: "首页",
                },
                {
                    icon: "icon-article",
                    page: "/article",
                    title: "文章",
                },
                {
                    icon: "icon-tag",
                    page: "/tags",
                    title: "分类",
                },
                {
                    icon: "icon-huati",
                    page: "/says",
                    title: "碎碎念",
                },
                {
                    icon: "icon-aichegujiabeifen7",
                    page: "/archive",
                    title: "归档",
                },
                {
                    icon: "icon-liuyan",
                    page: "/message",
                    title: "留言",
                },
            ],
            nowThemeIcon: "icon-sun",
            colIsShow: false,
            hideColNav:'default',
            canClick:true
        };
    },
    computed: {
        isSwtichHeaderBg() {
            let switchLimit = document.documentElement.clientHeight + 50;
            return (
                this.scrollTop >= switchLimit || this.activeRoute !== "/home"
            );
        },
    },
    props: {},
    methods: {
        toggleTheme() {
            nowTheme.themeName =
                nowTheme.themeName === "themeLight" ? "themeDark": "themeLight";
                nowTheme.theme = nowTheme.themeName === "themeLight"? themes.themeLight: themes.themeDark;
                document.body.style.setProperty("--themeBodyColor",nowTheme.theme.bodyColor);
                document.body.style.setProperty("--themeCardColor",nowTheme.theme.cardColor);
                document.body.style.setProperty("--themeFontColor", nowTheme.theme.fontColor);
                this.nowThemeIcon = this.nowThemeIcon === themeIcons[1]? themeIcons[0]: themeIcons[1];
        },
        toComment(){
            // 点击header的评论按钮跳到评论框
            window.scrollTo({ 
                top: document.querySelector('.comment-box').offsetTop, 
                behavior: "smooth" 
            });
        },
        handleScroll() {
            // 根据滚动位置做的事
            lastPosition = window.scrollY;
            if (nowPosition < lastPosition) {
                //下滚
                this.$store.commit("updateShow", "header-hidden"); //修改值
            } else {
                //上滚
                this.$store.commit("updateShow", "");
            }
            setTimeout(() => {
                nowPosition = lastPosition;
            }, 80);
        },
        showColHeader() {
            if(this.canClick){
                this.colIsShow = true;
                this.canClick = true;
                this.hideColNav  = 'animate__slideInLeft';
                document.querySelector('.colHeader').setAttribute('style','box-shadow:0 0 0 999px rgba(0,0,0,.5)')
                this.canClick = false; //动画期间点击无效
                    setTimeout(() => {
                        this.canClick = true;
                    }, 500);
             }
        },
    },
};
</script>

<style scoped>
.animate__animated{
  --animate-duration:.5s;
}
.header {
    position: fixed;
    width: 100%;
    z-index: 2000;
    background-color: var(--themeBodyColor) !important;
    transition: transform 1s;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.header .nav {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 75%;
    margin: 0 auto;
}
.header .nav .nav-right {
    display: flex;
    align-items: center;
}

.header .nav .nav-right >div {
    margin:   0 8px;
    cursor: pointer;
}
.header-hidden {
    transform: translateY(-60px);
}

.menu-icon {
    display: none;
    font-size: 16px;
}
.colNav{
    display: block;
    left: 0%;
}
@media (max-width: 799px) {
    .header .nav {
        width: 100%;
    }
    .rowHeader {
        display: none;
    }
    .header .nav {
        justify-content: space-between;
    }
    .menu-icon {
        display: block;
    }
}
@media (min-width: 800px) and (max-width: 1500px) {
    .header .nav {
        width: 100%;
    }
    .colHeader {
        display: none;
    }
    .header .nav {
        justify-content: space-between;
    }
}
</style>
