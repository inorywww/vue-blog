<template>
    <div class="right-tags fadeInUp">
        <div class="tags-title">
            <h3>全部标签</h3>
            <div class="seeMore">
                <router-link to="/tags">
                    <el-tag type="info" effect="dark"> 查看更多 </el-tag>
                </router-link>
            </div>
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
.tags-title {
    display: flex;
    justify-content: space-between;
}

.el-tag--dark.el-tag--info {
    background-color: var(--themeBodyColor) !important;
    border: #e0e0e0 !important;
    color: var(--themeFontColor);
    transition: all 0.5s;
    margin: 4px 8px;
    cursor: pointer;
}
.tags-body .el-tag--dark.el-tag--info:hover {
    transform: scale(1.2);
}
</style>
