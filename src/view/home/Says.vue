<template>
    <div class="says">
        <div class="says-list">
            <h1>碎碎念</h1>
            <says-item v-for="(item, index) in says" :item="item" :key="index"/>
        </div>
    </div>
</template>

<script>
    import{getAllSays} from '@/api'
    import SaysItem from './components/says/SaysItem';
    export default {
        name: 'Says',
        components: {
            SaysItem       
        },
        mounted(){
            getAllSays().then((res)=>{
                this.says = res.data;
            });
        },
        data() {
            return {
                says:[],
            }
        },
        methods:{
        },
    }
</script>

<style scoped>
    .says{
        width: 75%;
        margin: 0 auto;
    }
    .content-top{
        display: flex;
        flex-wrap: wrap;
    }
    @media (max-width:699px){
        .says{
            width: 100%;
        }
    }
    @media (min-width:700px) and (max-width:1300px){
        .says{
            width: 85%;
      }
    }
</style>
