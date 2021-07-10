<template>
    <div class="guestMessage">
        <div class="comment-box">
            <h2>留言</h2>
            <div class="comment-info">
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
            <div class="send">
                <el-button type="success" @click="send">发送</el-button>
            </div>
        </div>
        <el-divider></el-divider>
        <div class="message-box">
            <h1>所有留言</h1>
            <message-list :key="sonKey" :messageType="'guestMessage'" />
        </div>
    </div>
</template>

<script>
import { checkInput, alertInfo } from "@/utils/index";
import { sendMessage } from "@/api";
import MessageList from "./components/MessageList";
export default {
    name: "GuestMessage",
    components: {
        MessageList,
    },
    data() {
        return {
             toolbars: {
                    fullscreen: true, // 全屏编辑
                    htmlcode: true, // 展示html源码
                    preview: true, // 预览
                    imagelink: true, // 图片链接
                    code: true, // code
                },
            sonKey: "",
            markdownForm: {
                username: "",
                email: "",
                content: "",
            },
        };
    },
    methods: {
        change(value, render) {
            this.html = render;
        },
        send() {
            if (checkInput(this.markdownForm)) {
                this.markdownForm["time"] = new Date().getTime();
                const sendInfo = {
                    type: "guestMessage",
                    info: this.markdownForm,
                };
                sendMessage(sendInfo)
                    .then((res) => {
                        if (res.status == 200) {
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
.guestMessage {
    width: 60%;
    margin: 0 auto;
}
.comment-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 12px 0 30px;
}
.comment-info .content,.email {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
}
.comment-info .iconfont {
    margin-right: 12px;
    font-size: 2rem;
}
.send {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}
@media (max-width: 799px) {
    .guestMessage {
        width: 100%;
    }
    .comment-info{
        align-items: center;
        justify-content: center;
    }
}
@media (min-width: 800px) and (max-width: 1500px) {
    .guestMessage {
        width: 80%;
    }
}
</style>