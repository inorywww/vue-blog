<template>
    <div class="right-tags fadeInUp">
        <div class="tags-title">
            <h3>全部标签</h3>
        </div>
        <el-card :body-style="{ padding: '0px' }">
            <div class="tags-body">
                <router-link
                    v-for="(item, index) in tags"
                    :key="index"
                    :to="`/tags/${item.tagName}`"
                >
                    <el-tag type="info" effect="dark">
                        {{ `${item.tagName}[${item.totalNum}]` }}
                    </el-tag>
                </router-link>
            </div>
        </el-card>
    </div>
</template>

<script>
import { getAllTags } from "@/api";
export default {
    name: "RightTags",
    mounted() {
        getAllTags()
            .then((res) => {
                if (res.status == 200) {
                    this.tags = res.data;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    },
    data() {
        return {
            tags: [],
        };
    },
    methods: {},
};
</script>

<style scoped>
.tags-body .el-tag {
    margin: 4px 8px;
    cursor: pointer;
}
.el-tag--dark.el-tag--info{
    background-color: var(--themeBodyColor) !important;
    border: #e0e0e0 !important;
    color:var(--themeFontColor);
    transition: all .5s;
}
.el-tag--dark.el-tag--info:hover{
    transform: scale(1.2);
}
</style>
