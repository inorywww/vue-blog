<template>
    <div class="upload-image">
        <el-upload action="/api/article/upload" list-type="picture-card" :before-upload="beforeFileUpload">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
                <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    alt=""
                />
                <span class="el-upload-list__item-actions">
                    <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                    >
                        <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                    >
                        <i class="el-icon-download"></i>
                    </span>
                    <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                    >
                        <i class="el-icon-delete"></i>
                    </span>
                </span>
            </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogImageUrl: "",
            dialogVisible: false,
            disabled: false,
        };
    },
   
    methods: {
        submit(){
            this.$refs.upload.submit();
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        beforeFileUpload(file){
            console.log(file);
        },
    },
};
</script>

<style>
</style>