<template>
    <div class="archive">
        <header class="header">
            <h1>#{{ showTime }}年</h1>
            <h1>今年共{{ yearArticleNum }}篇文章</h1>
        </header>
        <el-row :gutter="40" class="body">
            <el-col :span="20" class="main">
                <div class="showFormat">
                    <el-switch
                        v-model="showList"
                        active-color="var(--themeFontColor)"
                        inactive-color="rgba(207,207,207,.4)"
                    >
                    </el-switch>
                    <a>列表显示</a>
                </div>
                <div class="article-list">
                    <template v-if="!showList">
                        <archive-table-show :key="sonKey" />
                    </template>
                    <template v-else>
                        <archive-list-show :key="sonKey" />
                    </template>
                </div>
            </el-col>
            <el-col :span="4" class="aside">
                <el-collapse v-model="activeName" accordion class="years-list">
                    <el-collapse-item
                        class="year-item"
                        v-for="(item, index) in times"
                        :key="index"
                        :title="`${item.yearName}年`"
                        :name="index"
                    >
                        <div class="mouthItems">
                            <div
                                class="mouth"
                                v-for="(item1, index1) in item.mouthItems"
                                :key="index1"
                                @click="changeTime(index, index1)"
                                :class="{
                                    'tag-item-active': item1.time == current,
                                }"
                            >
                                <span>{{ item1.mouthName }}月</span>
                                <span>{{ item1.mouthArticleNum }}篇</span>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getAllArticle } from "@/api";
import ArchiveListShow from "./components/archive/ArchiveListShow";
import ArchiveTableShow from "./components/archive/ArchiveTableShow";
import { getYear, getMouth, compare } from "@/utils";
export default {
    components: { ArchiveListShow, ArchiveTableShow },
    name: "archive",
    async mounted() {
        await getAllArticle().then((res) => {
            if (res.status === 200) {
                const items = res.data;
                this.getTimes(items);
                //获取第一篇文章，并显示内容
                let nowYearMouth = "";
                // 根据url判断 如果为/archive 就重定向到第一个time，
                if (!this.$route.query.time) {
                    nowYearMouth = this.times[0].mouthItems[0].time;
                    this.$router.replace({
                        path: `/archive`,
                        query: {
                            time: nowYearMouth,
                        },
                    });
                } else {
                    nowYearMouth = this.$route.query.time;
                }
                this.showTime = nowYearMouth.split("-")[0]; //获取当前年
                const yearIndex = this.times.findIndex(
                    (item) => item.yearName === this.showTime
                );
                this.yearArticleNum = this.times[yearIndex].yearArticleNum;
                this.current = nowYearMouth; //YYYY-MM
                this.activeName = yearIndex; //当前激活的菜单
            }
        });
    },
    watch: {
        //通过watch来监听路由变化 从而刷新子组件
        $route: function () {
            this.sonKey = new Date().getTime();
        },
    },
    computed: {
        showList: {
            //改变显示方式时动态记录，下次回来该页面也能保持该方式
            get() {
                return this.$store.state.showListOrTable.archive;
            },
            set() {
                this.$store.commit("changeShowWay", "archive");
            },
        },
    },
    data() {
        return {
            activeName: "",
            times: [],
            current: 0,
            showTime: "",
            yearArticleNum: 0,
            sonKey: "",
            isActive: "",
        };
    },
    methods: {
        getData() {
            this.sonKey = new Date().getTime();
        },
        changeTime(index, index1) {
            if (this.current !== this.times[index].mouthItems[index1].time) {
                this.showTime = this.times[index].yearName;
                this.yearArticleNum = this.times[index].yearArticleNum;
                this.current = this.times[index].mouthItems[index1].time;
                // this.$router.push(`/archive/${this.current}`);
                this.$router.replace({
                    path: `/archive`,
                    query: {
                        time: this.current,
                    },
                });
                this.showItems = this.times[index].mouthItems[index1].articles;
            }
        },
        //先将相同年份的放在一个数组，在对每个数组操作，把相同月份的放在一个数组
        getTimes(items) {
            //把相同年份放在一起
            const s = new Set(); //实例化对象
            items.forEach((item) => s.add(getYear(item.releaseTime))); //添加值（Set可以去掉重复数据）
            //存放相同年份的二维数组，相同年份的都在一个子数组里面。
            let sameYears = Array.from({ length: s.size }, () => []);
            items.forEach((item) => {
                let index = [...s].indexOf(getYear(item.releaseTime)); //找到指定下标
                sameYears[index].push(item); //添加数据
            });

            //把每一年中相同月份放在一起
            let sameYearMouth = [];
            const ss = new Set();
            sameYears.forEach((yearItem) => {
                yearItem.forEach((item) => ss.add(getMouth(item.releaseTime)));
                ss.add(getMouth(yearItem.releaseTime));
                let sameMouth = Array.from({ length: ss.size }, () => []);
                yearItem.forEach((item) => {
                    let index = [...ss].indexOf(getMouth(item.releaseTime));
                    sameMouth[index].push(item);
                });
                sameYearMouth.push(
                    sameMouth.filter((item) => item.length !== 0)
                );
            });

            sameYearMouth.forEach((year) => {
                let oneYear = {}; //存放一年的所有信息
                oneYear["yearName"] = getYear(year[0][0].releaseTime); //这一年的名字
                oneYear["mouthNum"] = year.length;
                oneYear["mouthItems"] = [];
                let yearArticleNum = 0; // 存放一年的文章总量
                year.forEach((mouth) => {
                    const oneMouth = {
                        //存放每个月的信息
                        mouthArticleNum: mouth.length, //一个月文章总量
                        time: `${oneYear["yearName"]}-${getMouth(
                            mouth[0].releaseTime
                        )}`, //当前这月的YYYY-MM
                        mouthName: getMouth(mouth[0].releaseTime).replace(
                            "0",
                            ""
                        ), //获取第几个月 去掉0
                        articles: mouth, //当前这个月的所有文章
                    };
                    yearArticleNum += mouth.length; //加上这个月的文章量
                    oneYear["mouthItems"].push(oneMouth);
                });
                oneYear["yearArticleNum"] = yearArticleNum;
                this.times.push(oneYear);
            });
            this.times.sort(compare("yearName", "descending")); //根据年份排序
            this.times.forEach((item) =>
                item.mouthItems.sort(compare("mouthName", "descending"))
            ); //根据月份排序
        },
    },
};
</script>

<style scoped>
.header {
    display: flex;
    flex-wrap: wrap;
    background: var(--themeCardColor);
    border-radius: 6px;
    padding: 8px;
    margin: 20px 0;
}

.header h1 {
    padding: 0 24px;
}

.body {
    margin-top: 20px;
    position: relative;
    display: flex;
}

.aside {
    position: absolute;
    right: 0;
    margin-top: 70px;
}

.tag-item-active {
    transform: scale(1.1);
    background-color: #909399 !important;
}
.years-list .year-item .mouth {
    width: 70%;
    margin: 0 auto 16px;
    padding: 8px 12px;
    border-radius: 6px;
    background: var(--themeBodyColor);
    color: var(--themeFontColor);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%),
        0 4px 6px -2px rgb(0 0 0 / 5%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.3rem;
    font-weight: 600;
    transition: all 0.1s ease;
    cursor: pointer;
}
.years-list .year-item .mouth:nth-child(1) {
    margin-top: 16px;
}
.years-list .year-item .mouth:not(.tag-item-active):hover {
    transform: scale(1.1);
}

.showFormat {
    padding: 8px 16px;
    margin-bottom: 20px;
    text-align: right;
}
@media (max-width: 799px) {
    .header {
        justify-content: center;
    }
    .body {
        flex-direction: column-reverse;
    }
    .main {
        width: 100%;
    }
    .aside {
        width: 80%;
        position: static;
        margin: 20px auto;
    }
}
@media (min-width: 800px) and (max-width: 1600px) {
    .main {
        width: 80%;
    }
    .aside {
        width: 20%;
        position: static;
    }
}
@media (min-width: 1600px) and (max-width: 2000px) {
    .archive {
        width: 120%;
        transform: translateX(-10%);
    }
}
</style>
