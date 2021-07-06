<template>
    <div class="list-show">
        <el-row
                v-for="(item, index) in archiveItems"
                :key="index"
                class="article-list-row fadeInUp"
        >
            <list-item :item="item"/>
        </el-row>
    </div>
</template>

<script>
    import ListItem from "@/view/home/components/showItem/ListItem";
    import {getAllArticle} from "@/api";
    import {handleScroll,getYearMouth} from "@/utils";

    export default {
        name: "archiveListShow",
        components: {ListItem},
        async mounted() {
            await getAllArticle().then((res) => {
                this.archiveItems = res.data.filter(item => getYearMouth(item.releaseTime) === this.$route.params.yearMouthName);
            });
            this.$nextTick(() => {
                handleScroll();
            })
        },
        props:{
            showItems:Array,
        },
        data() {
            return {
                archiveItems: [],
            };
        },
        methods: {},
    };
</script>

<style scoped>

</style>