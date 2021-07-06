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
                        <archive-table-show :key="new Date().getTime()"/>
                    </template>
                    <template v-else>
                        <archive-list-show :key="new Date().getTime()"/>
                    </template>
                </div>
            </el-col>
            <el-col :span="4" class="aside">
                <div class="years-list">
                    <div class="year-item" v-for="(item, index) in times" :key="index">
                        <h3>{{item.yearName}}</h3>
                        <div class="mouthItems">
                            <div class="mouth" v-for="(item1,index1) in item.mouthItems" :key="index1"
                             :class="{ 'tag-item-active': item1.yearMouthName == current }"
                             @click="changeTime(index,index1)"
                            >
                                <span>{{ item1.mouthName }}月</span>
                                <span>{{ item1.mouthArticleNum }}篇</span>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {getAllArticle} from "@/api";
    import ArchiveListShow from "./components/archive/ArchiveListShow";
    import ArchiveTableShow from "./components/archive/ArchiveTableShow";
    import {getYear, getMouth} from "@/utils";
    export default {
        components: {ArchiveListShow, ArchiveTableShow},
        name: "archive",
        async mounted() {
           const nowYearMouth = this.$route.params.yearMouthName; //YYYY-MM
           this.showTime = nowYearMouth.split('-')[0];
           await getAllArticle().then((res) => {
                if (res.status === 200) {
                    const items = res.data;
                    this.getTimes(items);
                    console.log(this.times);
                    const yearIndex = this.times.findIndex(item => item.yearName === this.showTime);
                    this.yearArticleNum = this.times[yearIndex].yearArticleNum;
                    this.current = nowYearMouth;//YYYY-MM
                    this.showItems = this.times[yearIndex].mouthItems.find(item => nowYearMouth === item.yearMouthName).articles;
                }
            });
        },
        computed: {
            showList: { //改变显示方式时动态记录，下次回来该页面也能保持该方式
                get() {
                    return this.$store.state.showListOrTable.archive;
                },
                set() {
                    this.$store.commit("changeShowWay", 'archive');
                },
            },
        },
        data() {
            return {
                times: [],
                current: 0,
                showTime: "",
                yearArticleNum: 0,
                showItems:[],
            };
        },
        methods: {
            changeTime(index, index1) {
                if (this.current !== this.times[index].mouthItems[index1].yearMouthName) {
                    this.showTime = this.times[index].yearName;
                    this.yearArticleNum = this.times[index].yearArticleNum;
                    this.current = this.times[index].mouthItems[index1].yearMouthName
                    this.$router.push(`/archive/${this.current}`);
                    this.showItems = this.times[index].mouthItems[index1].articles;
                }
            },
            getTimes(items) {
                //把相同年份放在一起
                const s = new Set(); //实例化对象
                items.forEach(item => s.add(getYear(item.releaseTime))); //添加值（Set可以去掉重复数据）
                //存放相同年份的二维数组，相同年份的都在一个子数组里面。
                let sameYears = Array.from({length: s.size}, () => []); 
                items.forEach(item => {
                    let index = [...s].indexOf(getYear(item.releaseTime)); //找到指定下标
                    sameYears[index].push(item) //添加数据
                });

                //把每一年中相同月份放在一起
                let sameYearMouth = [];
                const ss =new Set();
                sameYears.forEach(yearItem => {
                    yearItem.forEach(item => ss.add(getMouth(item.releaseTime)));
                    ss.add(getMouth(yearItem.releaseTime))
                    let sameMouth = Array.from({length: ss.size}, ()=>[]);
                    yearItem.forEach(item => {
                        let index = [...ss].indexOf(getMouth(item.releaseTime));
                        sameMouth[index].push(item);
                    });
                    sameYearMouth.push(sameMouth.filter(item => item.length !== 0));
                })
                
                sameYearMouth.forEach(year => { //i:不同年份的所有文章
                    let oneYear = {}; //存放一年的所有信息
                    oneYear['yearName'] = getYear(year[0][0].releaseTime); //这一年的名字
                    oneYear['mouthNum'] = year.length
                    oneYear['mouthItems'] = [];
                    let yearArticleNum = 0; // 存放一年的文章总量
                    year.forEach(mouth => {
                        const oneMouth = { //存放每个月的信息
                            mouthArticleNum:mouth.length, //一个月文章总量
                            yearMouthName:`${oneYear['yearName']}-${getMouth(mouth[0].releaseTime)}`, //当前这月的YYYY-MM
                            mouthName:getMouth(mouth[0].releaseTime).replace('0',''), //获取第几个月 去掉0
                            articles:mouth //当前这个月的所有文章
                        };
                        yearArticleNum+=mouth.length; //加上这个月的文章量
                        oneYear['mouthItems'].push(oneMouth);
                    });
                    oneYear['yearArticleNum']=yearArticleNum;
                    this.times.push(oneYear);
                });
                this.times.sort(this.compare('yearName')); //根据年份排序
            },
            compare(property){
                return (obj1,obj2) => {
                    const value1 = obj1[property];
                    const value2 = obj2[property];
                    return value1 - value2;     // 升序
                }
            }
        },
    };
</script>

<style scoped>
    .header {
        display: flex;
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
    }

    .aside {
        position: absolute;
        right: 0;
    }

    .tag-item-active {
        transform: scale(1.2);
        background-color: #909399 !important;
    }

    .years-list .year-item .mouth{
        margin: 0 auto 20px;
        padding: 12px 16px;
        border-radius: 6px;
        background: var(--themeCardColor);
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%),
        0 4px 6px -2px rgb(0 0 0 / 5%);
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.5rem;
        font-weight: 600;
        transition: all 0.1s ease;
        cursor: pointer;
    }

    .years-list .year-item .mouth:not(.tag-item-active):hover {
        transform: scale(1.1);
    }

    .showFormat {
        padding: 8px 16px;
        margin-bottom: 20px;
        text-align: right;
    }
</style>
