<template>
  <div class="message-list">
        <div v-for="(item, index) in messageItem" class="message-item" :key="index">
                <div class="user-info">
                    <div class="avatar">
                        <el-avatar :style="`background: ${getRandomColor()}`"> {{item.info.username[0]}} </el-avatar>
                    </div>
                    <div class="info">
                        <a class="shallow">{{item.info.username}}</a>
                        <a class="shallow">{{item.info.time|moment("YYYY-MM-DD")}}</a>
                    </div>  
                </div>
            <div class="content">
                <p>
                    {{item.info.content}}
                </p>
            </div>
        <el-divider v-if="index!==messageItem.length"></el-divider>    
        </div>
  </div>
</template>

<script>
import {getMessage} from "@/api";
import { compare } from "@/utils";
export default {
    name:'messages',
   async mounted(){
        await getMessage().then((res) => {
                this.messageItem = res.data.filter(item => {
                    return (item.type === this.messageType && item.info.id === Number(this.$route.params.id))
                });
                //排序 
                this.messageItem.sort(compare("id",'descending')); 
            })
    },
    props:{
        messageType:String,
    },
    data(){
        return {
            messageItem:[],
        }
    },
    methods:{
          getRandomColor(){
            const r = Math.floor(Math.random()*255);
            const g = Math.floor(Math.random()*255);
            const b = Math.floor(Math.random()*255);
            return `rgba(${r},${g},${b},0.8`
        }
    }
}
</script>

<style>
.message-item {
    padding: 16px 12px;
}
.message-item .user-info{
    display: flex;
}
.user-info .info{
    margin-left: 16px;
}
.user-info .info > a:nth-child(1){
    font-size: 1.5rem;
    display: block;
}
.user-info .info > a:nth-child(2){
    /* font-size: 1rem; */
     color: #b0b1b2;
}
</style>