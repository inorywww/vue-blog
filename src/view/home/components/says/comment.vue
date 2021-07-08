<template>
    <div class="comment-box" >
        <div class="comment-input">
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
        </div>
        <div class="comment-info">
            <div class="info-box">
                <div class="content">
                    <span class="iconfont icon-name"> </span>
                    <el-input
                        v-model="markdownForm.username"
                        placeholder="在这儿输入昵称"
                    >
                    </el-input>
                </div>
                <div class="email">
                    <span class="iconfont icon-emailFilled"> </span>
                    <el-input
                        v-model="markdownForm.email"
                        placeholder="在这儿输入邮箱"
                    >
                    </el-input>
                </div>
            </div>
            <el-button type="success" class="send" @click="send">
                发送
            </el-button>
        </div>
    </div>
</template>

<script>
import{sendMessage} from '@/api';
import { checkInput, alertInfo,} from "@/utils/index";
export default {
    name: "comment",
    props: {
        item: Object,
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
            markdownForm: {
                username: "",
                email: "",
                content: "",
            },
        }
    },
    methods: {
        change(value, render) {
            this.html = render;
        },
        send() {
            // 判断输入是否正确
            if (checkInput(this.markdownForm) === "success") {
                this.markdownForm["time"] = new Date().getTime();
                this.markdownForm["id"] = this.item.sayID;
                const sendInfo = {
                    type: "saysMessage",
                    info: this.markdownForm,
                };
                sendMessage(sendInfo)
                    .then((res) => {
                        if (res.status == 201) {
                            this.markdownForm = {};
                            alertInfo("发送成功，请静候回复~", "success");
                            this.sonKey = new Date().getTime();
                        }
                    })
                    .catch(() => {
                        alertInfo("发送失败，服务器错误≧ ﹏ ≦", "error");
                    });
            }
        },
    },
};
</script>

<style scoped>

.comment-box{
    margin: 0 auto;
}
.comment-input {
    margin: 30px auto;
    position: relative;
}

.comment-info{
    width: 80%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.comment-info .info-box{
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-right: 30px;
}
.comment-info .info-box > div{
    padding: 4px 0;
    display: flex;
    align-items: center;
}
.comment-info .info-box .iconfont{
    font-size: 2rem;
    margin-right: 12px;
}
.send {
    margin: 12px 0;
    height: 50%;
}

@media (max-width: 650px) {
    .comment-info{
        width: 100%;
    }
    .comment-info .info-box{
        justify-content:flex-start
    }
}

@media (min-width: 651px) and (max-width: 1300px) {
    .comment-info{
        width: 100%;
    }
}
</style>