<template>
  <div class="says-item">
        <el-card :body-style="{ padding: '12px' }">
            <el-header class="says-header">
                <div class="header-right">
                    <div class="user-avatar">
                        <router-link to="/about">
                            <img :src="item.sayHeader.userAvatar" alt="image">
                        </router-link>
                    </div>
                    <div class="header-content">
                        <div class="content-top">
                            <router-link to="/about" class="user-name">
                                {{item.sayHeader.userName}}
                            </router-link>
                            <a class="shallow">{{item.sayHeader.releaseTime|moment("YYYY-MM-DD")}} </a>
                        </div>
                        <div class="content-footer">
                            <a class="shallow">
                                {{item.sayHeader.userIdentity}}
                            </a>
                        </div>
                    </div>
                </div>
                <div class="header-left">
                    <router-link :to="`/says/${item.sayID}`" class="iconfont icon-more"></router-link>
                </div>
            </el-header>
            <el-main class="says-body">
                 <div class="say-word">
                    <p class="fadeInUp">{{item.sayContent.content}}</p>
                </div>
                <div class="say-cover">
                    <img v-if="item.sayContent.coverSrc!==''" :src="item.sayContent.coverSrc" alt="cover">
                </div>
            </el-main>
            <el-footer class="says-footer">
                <div class="say-actions">
                    <div class="say-like">
                        <el-button type="info" plain>
                            <span class="iconfont icon-like">喜欢</span>
                        </el-button>
                    </div>
                    <div class="say-comment">
                        <el-button type="info" plain @click="comment">
                            <span class="iconfont icon-comment">评论</span>
                        </el-button>
                    </div>
                    <div class="say-forward">
                        <el-button type="info" plain>
                            <span class="iconfont icon-share">分享</span>
                        </el-button>
                    </div>
                </div>
            </el-footer>
           
             <div class="comment-input " v-show="isComment">
                    <mavon-editor
                        v-model="markdownForm.content"
                        ref="md"
                        @change="change"
                        placeholder="说点什么吧~"
                        :subfield="false"
                        toolbarsBackground="var(--themeBodyColor)"
                        previewBackground="var(--themeBodyColor)"
                        :toolbars="toolbars"
                        style="min-height: 200px"
                    />
                    <el-button type="success" class="send" @click="send">
                        发送
                    </el-button>
            </div>
             
        </el-card>
  </div>
</template>

<script>
import{sendSays} from '@/api';   
import {handleScroll} from "@/utils/index";
          
export default {
    name:'SaysItem',
    props:{
        item:Object,
    },
    components:{
    },
    mounted(){
        this.$nextTick(() => {
            handleScroll();
        })
    },
    data(){
        return{
            toolbars: {
                fullscreen: true, // 全屏编辑
                htmlcode: true, // 展示html源码
                preview: true, // 预览
                imagelink: true, // 图片链接
                code: true, // code
            },
            markdownForm:{
                content:'',
            },
            isComment:false,
            sonKey:'',
        }
    },
    methods:{
        change(value, render) {
            this.html = render;
        },
        comment(){
            this.isComment = !this.isComment
        },
        send() {
            this.markdownForm['id'] = this.item.sayID;
            if(sendSays(this.markdownForm)==='success'){
                 this.markdownForm.content = '';
                 this.sonKey = new Date().getTime();
            }
        }      
    }
}
</script>
<style scoped>
    .says-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .says-header .header-right {
        display: flex;
    }

    .header-right .user-avatar {
        max-height: 40px;
        max-width: 40px;
        margin-right: 12px;
    }

    .header-right .user-avatar img {
        max-height: 100%;
        max-width: 100%;
        border-radius: 50% !important;
    }

    .header-right .header-content .content-top {
        margin-bottom: 4px;
    }

    .header-right .header-content .content-top .user-name {
        padding-right: 8px;
    }

    .shallow {
        color: #B0B1B2;
    }

    .say-header .header-left {
        display: flex;
        padding-bottom: 16px;
        border-radius: 50%;
    }

    .says-body{
        padding: 0 !important;
    }
    .says-body .say-cover {
        margin: 12px auto 0;
        text-align: center;
        overflow: hidden;
        border-radius: 2%;
        max-height: 100%;
        max-width: 75%;
    }

    .says-body .say-cover img {
        width: 100%;
        height: 100%;
        transition: all .5s;
    }

     .says-body .say-cover img:hover {
        transform: scale(1.1);
    }
    .says-footer{
        height: auto !important;
    }
    .says-footer > div {
        display: flex;
    }

    .say-actions{
        margin: 16px 0 0;
        height: 50%;
    }
    .say-actions > div{
        width: 33%;
        height: 35px;
    }

    .say-actions > div:nth-child(2){
        padding: 0 16px;
    }
    
    .say-actions > div > .el-button{
        width: 100%;
        height: 100%;
    }

     .comment-input {
        margin: 30px 0 50px;
        position: relative;
    }
    .send{
        margin: 12px 0;
        position: absolute;
        right: 12px;
    }
</style>