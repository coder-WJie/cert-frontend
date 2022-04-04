<template>
  <div>
    <!-- 上传背景图 -->
    <el-upload
      ref="imgUpload"
      class="imgUpload"
      :action="`https://ccpc-cert.acmclub.cn:8081/MatchInfo/uploadimg?matchId=${matchId}`"
      list-type="picture"
      show-file-list
      :file-list="fileList"
      :limit="1"
      :multiple="false"
      :auto-upload="true"
      :on-success="uploadSuccess"
      :on-error="uploadFail"
      :before-remove="handleRemove"
      :on-exceed="handleExceed"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">上传证书背景图</div>
    </el-upload>

    <!--   <div class="img" >
      <p v-if="backgroundImgURL !== '#'" class="tipText">未上传证书背景图</p>
      <img v-else :src="backgroundImgURL" alt="未上传证书背景图" style="width: 100%; height: 100px; object-fit: contain">
    </div> -->

    <!-- 上传 excel获奖数据 -->
    <el-upload
      ref="excelUpload"
      class="excelUpload"
      accept=".xlsx"
      :action="`https://ccpc-cert.acmclub.cn:8081/AwardInfo/parseExcel?matchId=${matchId}`"
      :file-list="excelList"
      :on-success="excelUploadSuccess"
      :on-error="excelUploadFail"
      :limit="1"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">上传获奖名单，excel文件</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [], // 证书背景图
      excelList: [], // 获奖名单excel表格
      disabled: false,
      backgroundImgURL: "#", // 默认展示 “未上传背景图”图
    };
  },
  computed: {
    matchId() {
      return this.$store.state.currentMatchData.matchId;
    },
  },
  mounted() {
    // 上传一次背景图，长期保存，直至替换
    // if (window.localStorage.getItem("certBackgroundImg")) {
    //   this.backgroundImgURL = JSON.parse(
    //     window.localStorage.getItem("certBackgroundImg")
    //   );
    // }
    // console.log("backgroundImgURL", this.backgroundImgURL);
  },
  methods: {
    // 上传excel文件
    excelUploadSuccess() {
      this.$message.success("excel文件上传成功！");
    },
    excelUploadFail() {
      this.$message.error("excel文件上传失败！");
    },
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
    // 证书背景图文件上传成功
    uploadSuccess(response, file, fileList) {
      this.$message.success("证书背景图上传成功！");
    },
    uploadFail() {
      this.$message.error("证书背景图上传失败！");
    },
    handleRemove(file) {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleExceed(files, fileList) {
      this.$message.info("超出限制上传文件数，请删除原背景图后上传！");
    },
    handleDownload(file) {
      console.log(file);
    },
    doDisable() {
      // this.$refs.upload.disabled = true;
    },
  },
};
</script>

<style scoped>
.el-upload {
  background-color: red;
  margin-top: 20px;
  margin-bottom: 20px;
}
.excelUpload {
  margin-bottom: 50px;
}
</style>