<template>
    <div class="table-show">
        <el-row
                v-for="(items, index) in articleItems"
                :key="index"
                :gutter="30"
                class="article-list-row fadeInUp"
        >
            <el-col
                    :span="8"
                    v-for="(item, index1) in items"
                    :key="index1"
                    class="article-list-col"
            >
                <table-item :item="item" :key="index1"/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import TableItem from "@/view/home/components/showItem/TableItem";
    

    export default {
        name: "AllAritcs",
        mounted() {
            const items = this.$store.state.allArticles;
            for (let i = 0; i < items.length; i += 3) {
                //push :三个为一组放进articleItems，filter:判断当前这一个是否为空
                this.articleItems.push(
                    [items[i], items[i + 1], items[i + 2]].filter((item) => {
                        return item;
                    })
                );
            }
           
        },
        props: {},
        components: {
            TableItem,
        },
        data() {
            return {
                articleItems: [],
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