<template>
    <div class="dashboard">
        <el-container class="app-container">
            <el-aside>
                <Sidebar />
            </el-aside>
            <el-container>
                <el-header>
                    <DashHeader />
                </el-header>
                <el-main>
                    <Content />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import DashHeader from "./components/Header";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
export default {
    name:'dashboard',
    data() {
        return {};
    },
    mounted() {},
    components: {
        DashHeader,
        Sidebar,
        Content,
    },
    methods: {},
};
</script>
<style scoped>
.dashboard {
    width: 100%;
    height: 100%;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
}
.el-aside {
    width: auto !important;
}
.el-header {
    padding: 0 !important;
}
.el-main {
    padding: 4px 0 !important;
}

</style>
