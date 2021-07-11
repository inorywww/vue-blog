<template>
  <div class="article-container">
      <h1>文章管理</h1>
  </div>
</template>

<script>
import {getAllArticle} from '@/api/index';

export default {
    name:'dashboardArticles',
     mounted(){
        getAllArticle().then(res => {
            this.articles = res.data;
        })
    },
    data() {
        return {};
    },
    components: {
       
    },
    methods: {},
}
</script>

<style>

</style>