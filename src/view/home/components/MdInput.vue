<template>
    <div class="comment-input">
        <mavon-editor
            v-model="content"
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
</template>

<script>
export default {
  name:'MDInput',
    props:{
        item:Object,
    },
    mounted(){
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
            content:'',
        }
    },
    methods:{
         change(value, render) {
                this.html = render;
            },
    }
}
</script>

<style scoped>
.comment-input {
    margin: 30px 0;
}
</style>