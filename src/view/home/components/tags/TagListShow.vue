<template>
    <div class="list-show">
        <el-row
                v-for="(item, index) in tagArticles"
                :key="index"
                class="article-list-row"
        >
            <list-item  :item="item"/>
        </el-row>
    </div>
</template>

<script>
    import ListItem from "@/view/home/components/showItem/ListItem";
    import {getAllArticle} from "@/api";

    export default {
        name: "tagListShow",
        components: {ListItem},
        async mounted() {
            await getAllArticle().then((res) => {
                res.data.forEach((item) => {
                    item.tags.forEach((tag) => {
                        if (tag === this.$route.query.tagName) {
                            this.tagArticles.push(item);
                        }
                    });
                });
            });
          
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

</style>