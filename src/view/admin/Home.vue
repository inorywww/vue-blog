<template>
  <div class="home" v-if="dataFlage">
      <el-row :gutter="40">
        <el-col class="base-info-container" :span="8">
            <el-card>
                <div class="user-info">
                    <div class="avatar">
                        <img src="/static/image/avatar.jpg" alt="image">
                    </div>
                    <div class="info">
                        <h1>admin</h1>
                        <h2>超级管理员</h2>
                    </div>
                </div>
                <el-divider></el-divider>
                    <div class="other-info">
                        <span>上次登录时间：</span>
                        <span>上次登录地点：</span>
                    </div>
            </el-card>
            <el-card style="margin:24px auto">
                <div class="www-info">
                    <h1>网站详情</h1>
                    <div class="data-info">
                        <router-link to="/dashboard/article/all" class="info-item">
                            <div class="img">
                                <img src="/static/image/文章.png" alt="image">
                            </div>
                            <div class="num-box">
                                <span class="num">{{homeInfo.articleInfo.num}}</span>
                                <span class="name">文章数量</span>
                            </div>
                        </router-link>
                        
                        <router-link to="/dashboard/say/all" class="info-item">
                            <div class="img">
                                <img src="/static/image/话题.png" alt="image">
                            </div>
                            <div class="num-box">
                                <span class="num">{{homeInfo.sayInfo.num}}</span>
                                <span class="name">碎语数量</span>
                            </div>
                        </router-link>

                        <router-link to="/dashboard/article/tags" class="info-item">
                            <div class="img">
                                <img src="/static/image/分类.png" alt="image">
                            </div>
                            <div class="num-box">
                                <span class="num">{{homeInfo.tagInfo.num}}</span>
                                <span class="name">分类数量</span>
                            </div>
                        </router-link>
                        <router-link to="/dashboard/message" class="info-item">
                            <div class="img">
                                <img src="/static/image/留言.png" alt="image">
                            </div>
                            <div class="num-box">
                                <span class="num">{{homeInfo.messageInfo.num}}</span>
                                <span class="name">消息数量</span>
                            </div>
                        </router-link>
                    </div>
                </div>
            </el-card>
        </el-col>
        <el-col class="recent-info-container" :span="16">
                <h1 class="course">网站记录</h1>
            <el-timeline>
                <el-timeline-item 
                    v-for="(item, index) in allCourse" :key="index"
                    :timestamp="item.time|moment('YYYY-MM-DD')" 
                    placement="top" 
                >
                    <el-card>
                        <h4>{{item.title}}</h4>
                        <p>{{item.content}}</p>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item :timestamp="nowTime" placement="top">
                     <el-card>
                        <div  class="addCoures">
                            <el-input placeholder="写个标题吧~" v-model="formCourse.title"></el-input>
                            <el-input placeholder="写个内容吧~" v-model="formCourse.content"></el-input>
                        </div>
                        <div class="submit-btn">
                            <el-button type="primary" @click="submitCourse">提交</el-button>
                        </div>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </el-col>
      </el-row>
        
  </div>
</template>

<script>
import moment from 'moment';
import { getHome, getCourse, addCourse } from "@/api/admin";
export default {
    name:'dashboardHome',
    components:{
        
    },
    async created(){
        await getHome().then(res => {
            if(res.status === 200){
                this.homeInfo = res.data;
            }
        });
        await getCourse().then(res => {
            if(res.status === 200){
                this.allCourse = res.data;
                this.dataFlage = true;
            }
        })
    },
    computed:{
        nowTime(){
            return moment().format("YYYY-MM-DD");
        }
    },
    data() {
        return {
            homeInfo:{},
            allCourse:[],
            formCourse:{},
            dataFlage:false,
        };
    },
    
    methods: {
        submitCourse(){
            addCourse(this.formCourse).then(res => {
                if(res.status === 200){
                    this.allCourse.push(res.data);
                    this.formCourse = {};
                }
            });

        }
    },
}
</script>

<style scoped>
.home{
    width: 80%;
    margin: 0 12px;
}

.base-info-container .user-info{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.base-info-container .user-info .avatar{
    width:150px;
    height: 150px;
}
.user-info .avatar img{
    max-width: 100%;
    max-height: 100%;
    border-radius: 50%;
}
.base-info-container .user-info h1{
    font-size: 3rem;
    margin: 0;
}
.base-info-container .other-info{
    width: 80%;
    margin: 0 auto;
}
.base-info-container .other-info span{
    font-size: 2rem;
    display: block;
}
.base-info-container .www-info h1{
    font-size: 2rem;
    margin: 0;
}
.data-info {
    display: flex;
    flex-wrap: wrap;
}
.info-item img{
    max-width: 80px;
    max-height: 80px;
}
.info-item{
    display: flex;
    align-items: center;
    flex: 0 0 50%;
}
.num-box .num{
    color: rgb(7, 119, 163);
    font-size: 3rem;
}
.num-box span{
    font-size: 2rem;
    margin: 0 8px;
    display: block;
}
.course{
    font-size: 2.5rem;
}
.addCoures{
    display: flex;
}
.addCoures .el-input{
    margin: 0 12px;
}
.submit-btn{
    margin:8px 8px 0;
    text-align: right;
}
</style>