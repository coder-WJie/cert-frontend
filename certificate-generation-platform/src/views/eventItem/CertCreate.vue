<template>
  <div>
    <!-- 上传 excel获奖数据 -->
    <el-upload
      accept=".xlsx"
      action="#"
      :file-list="fileList"
      :on-success="uploadSuccess"
      :on-error="uploadFail"
      :limit="1"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb，上传excel文件
      </div>
    </el-upload>
    <!-- 上传背景图 -->
    <el-upload
      ref="upload"
      action="#"
      list-type="picture-card"
      :multiple="false"
      :limit="1"
      :on-exceed="doDisable"
      :auto-upload="true"
      :on-success="uploadSuccess"
      :on-error="uploadFail"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
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
            @click="handleDownload(file)"
          >
            <i class="el-icon-download"></i>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
    data() {
        return {
            fileList: [],
            disable: false
        }
    },
    methods: {
         // 上传excel文件
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // excel文件上传成功
    uploadSuccess() {
      this.$message.success("excel文件上传成功！");
    },
    uploadFail() {
      this.$message.error("excel文件上传失败！");
    },
    // 证书背景图上传处理
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    doDisable() {
      this.$refs.upload.disabled = true;
    },
    }
};
</script>

<style scoped>
.el-upload {
    margin-top: 20px;
}
</style>