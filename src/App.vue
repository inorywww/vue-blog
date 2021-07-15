<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'App',
        components: {
        },
        mounted(){
        },
        data() {
            return {
               
            }
        },
        methods:{
        },
    }
</script>

<style>
    body{
        margin: 0;
        padding: 0;
    }
    .el-collapse{
        border: none !important;
        border-radius: 10px !important;
        /* padding: 8px 16px; */
    }
    .el-collapse-item__header{
        background-color: var(--themeCardColor) !important;
        color:var(--themeFontColor) !important;
        border: none !important;
        font-size: 1.5rem !important;
        font-weight: 600 !important;
        padding: 4px 12px;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%),
        0 4px 6px -2px rgb(0 0 0 / 5%);
    }
    .el-collapse-item__wrap{
        background-color: var(--themeCardColor) !important;
        border: none !important;
    }
    .el-collapse-item__content{
        padding: 0 !important;
    }
    .upload-container > .el-form-item__content{
        display: flex !important;
    }
    .upload-container > .el-form-item__content .upload-btn{
        margin-left: 12px;
    }
    
</style>
