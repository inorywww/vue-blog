<template>
    <div class="right-say">
        <div class="say-title">
            <h4>碎碎念</h4>
        </div>
        <el-card :body-style="{ padding: '0px' }">
            <div class="say-body">
                <el-header class="say-header" style="padding: 0">
                    <div class="header-right">
                            <div class="user-avatar">
                                <router-link to="/about">
                                <img src="/static/image/avatar.jpg"/>
                                </router-link>
                            </div>
                        <div class="header-content">
                            <div class="content-top">
                                <router-link to="/about" class="user-name">
                                    inroyww
                                </router-link>
                                <a>5天前</a>
                            </div>
                            <div class="content-bottom">

                            </div>
                        </div>
                    </div>
                    <div class="header-left">
                    </div>
                </el-header>
                <el-main class="say-content">

                </el-main>
                <el-footer class="say-footer">

                </el-footer>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "RightSay",
        mounted() {
        },
        data() {
            return {}
        },
        methods: {},
    }
</script>

<style scoped>
    .say-body {
        padding: 12px;
    }
    .say-body .say-header{
        display: flex;
        align-items: center;
    }

    .say-header .header-right{
        display: flex;
    }
    .say-header .header-right .user-avatar {
        max-height: 40px;
        max-width: 40px;
     }

    .say-header .header-right .user-avatar img {
        max-height: 100%;
        max-width: 100%;
        border-radius: 50%;
    }
</style>
