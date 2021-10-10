<template>
  <div>
    <!-- 上传背景图 -->
    <el-upload
      ref="imgUpload"
      class="imgUpload"
      :action="`http://8.141.52.47:8081/MatchInfo/uploadimg?matchId=${matchId}`"
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
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件
      </div>
    </el-upload>

    <div class="img" >
      <img v-if="backgroundImgURL === '#'" :src="backgroundImgURL" alt="" style="width: 100%; height: 100px; object-fit: contain">
      <p v-else class="tipText">未上传证书背景图</p>
    </div>
    

    <!-- 上传 excel获奖数据 -->
    <el-upload
      ref="excelUpload"
      class="excelUpload"
      accept=".xlsx"
      :action="`http://8.141.52.47:8081/AwardInfo/parseExcel?matchId=${matchId}`"
      :file-list="excelList"
      :on-success="excelUploadSuccess"
      :on-error="excelUploadFail"
      :limit="1"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传excel文件，上传excel文件
      </div>
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
      backgroundImgURL: '#' // 默认展示 “未上传背景图”图
    };
  },
  computed: {
    matchId() {
      console.log(
        `----------${this.$store.state.currentMatchData.matchId}------------`
      );
      return this.$store.state.currentMatchData.matchId;
    }
  },
  created() {
    // 上传一次背景图，长期保存，直至替换
    /* this.fileList = JSON.parse(
      window.localStorage.getItem("certBackgroundImg")
    ); */
    // 部署后存储后端返回的url

    // console.log('this.fileList',this.fileList);
    // console.log(`----------file length------------`,this.fileList);
  },
  mounted() {
    // 上传一次背景图，长期保存，直至替换
    if(window.localStorage.getItem('certBackgroundImg')){
      this.backgroundImgURL = JSON.parse(
      window.localStorage.getItem("certBackgroundImg")
    );
    }
    console.log('backgroundImgURL',this.backgroundImgURL);
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
      let imgDOM = document.querySelector('img')
      imgDOM.src = file.url  // 上传成功展示背景图
      console.log('file.url',file.url);
      console.log('file',file);
      console.log('imgDOM.src',imgDOM.src);
      // 缓存到本地localStorage
      window.localStorage.setItem(
        "certBackgroundImgUrl",
        JSON.stringify(fileList.url)
      );
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
.imgUpload {
  /* width: 200px; */
}
</style>