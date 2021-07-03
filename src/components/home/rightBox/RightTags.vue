<template>
    <div class="right-tags fadeInUp">
        <div class="tags-title">
            <h4>全部标签</h4>
        </div>
        <el-card :body-style="{ padding: '0px' }">
            <div class="tags-body">
                <router-link v-for="(item,index) in tags" :key="index" :to="`/tags/${item.tagName}`">
                    <el-tag type="info" effect="dark">
                        {{ `${item.tagName}[${item.totalNum}]` }}
                    </el-tag>
                </router-link>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "RightTags",
        mounted() {
            this.axios.get('http://localhost:3000/tags').then(res => {
                this.tags = res.data;
            }).catch(err => {
                console.error(err);
            })
        },
        data() {
            return {
                tags:[],
            }
        },
        methods: {},
    }
</script>

<style scoped>
    .tags-body .el-tag{
        margin: 4px 8px;
        cursor: pointer;
    }
</style>
