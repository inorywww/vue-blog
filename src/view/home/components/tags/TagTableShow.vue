<template>
    <div class="table-show">
        <el-row
                v-for="(items, index) in tagArticles"
                :key="index"
                :gutter="40"
                class="article-list-row fadeInUp"
        >
            <el-col
                    :span="8"
                    v-for="(item, index1) in items"
                    :key="index1"
                    class="article-list-col"
            >
                <table-item :item="item" :key="index1"/>
<!--                <router-view :key="$route.fullPath"/>-->
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import TableItem from "@/view/home/components/showItem/TableItem";
    import {handleScroll} from "@/utils/index";
    import {getAllArticle} from "@/api";

    export default {
        name: "tagTableShow",
        components: {TableItem},
        async mounted() {
            let items = [];
            await getAllArticle().then((res) => {
                res.data.forEach((item) => {
                    item.tags.forEach((tag) => {
                        if (tag === this.$route.params.tagName) {
                            items.push(item);
                        }
                    });
                });
            });

            for (let i = 0; i < items.length; i += 3) {
                //push :三个为一组放进articleItems，filter:判断当前这一个是否为空
                this.tagArticles.push([items[i], items[i + 1], items[i + 2]].filter((item) => {
                        return item;
                    })
                );
            }
            this.$nextTick(() => {
                handleScroll();
            })
        },

        data() {
            return {
                tagArticles: [],
            };
        },
        methods: {},
    };
</script>

<style scoped>
    .table-show .article-list-row {
        margin-bottom: 30px;
    }
</style>