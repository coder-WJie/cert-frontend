<template>
  <div>
    <!-- 搜索与添加区域 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input
          placeholder="请输入队伍序列号"
          v-model="teamNumber"
          clearable
          @clear="getCertsList"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getCertsList"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="genAllCerts"
          >一键生成所有证书</el-button
        >
      </el-col>
      <el-col :span="4">
        <el-button type="success" @click="downloadAllCerts"
          >一键下载所有证书</el-button
        >
      </el-col>
    </el-row>

    <el-table :data="tableData" stripe border :fit="true" style="width: 100%">
      <el-table-column prop="teamName" label="获奖团队" width="180">
      </el-table-column>
      <el-table-column prop="teamMember" label="参赛队员" width="180">
      </el-table-column>
      <el-table-column prop="id" label="参赛队员ID" width="180">
      </el-table-column>
      <el-table-column prop="teamTeacher" label="指导老师" width="180">
      </el-table-column>
      <el-table-column prop="awardLevel" label="奖项级别" width="180">
      </el-table-column>
      <el-table-column prop="awardInfo" label="奖项信息" width="180">
      </el-table-column>
      <el-table-column prop="teamId" label="队伍序列号" width="180">
      </el-table-column>
      <el-table-column prop="schoolId" label="所在学校序号" width="180">
      </el-table-column>
      <el-table-column prop="schoolName" label="参赛校名" min-width="140px">
      </el-table-column>
      <el-table-column label="操作" min-width="120px" fixed="">
        <template>
          <el-button size="mini" type="primary">下载证书</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="form.page"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        page: 1,
        teamId: "",
      },
      teamNumber: "",
      tableData: [],
      certsUrlList: [],
      total: 15,
      src: "", // 测试
    };
  },
  computed: {
    matchId() {
      return this.$store.state.currentMatchData.matchId;
    },
  },
  created() {
    this.getCertsList();
    this.getCertsTotal();
  },
  methods: {
    // 获取所有证书数据
    async getCertsList() {
      console.log(`----------getCertsList------------`);
      const res = await this.$http.get(
        `/AwardInfo/queryPage?page=${this.form.page}`
      );
      if (res.data.code == 200) {
        console.log("getCertsList", res);
        this.tableData = res.data.data;
        // 存进vuex里
        this.$store.dispatch("setCurrentMatchCert", res.data.data);
      }
    },
    // 数据总数
    async getCertsTotal() {
      const res = await this.$http.get(
        `/AwardInfo/getRowCount?matchId=${this.$store.state.currentMatchData.matchId}`
      );
      if (res.data.code == 200) {
        console.log("getCertsTotal", res);
        this.total = res.data.data;
      }
    },
    // 一键获取所有证书url
    async genAllCerts() {
      console.log("this.tableData", this.tableData);

      const res = await this.$http.get(
        `/AwardInfo/findAllCertificateUrl/?matchId=${this.$store.state.currentMatchData.matchId}`
      );
      console.log("getAllCerts res", res);
      if (res.data.code === 200) {
        this.certsUrlList = res.data.data;
        return this.$message.success("生成成功！");
      }
      return this.$message.error("生成失败！");
    },
    // 下载图片地址和图片名
    downloadImage(imgsrc, name) {
      console.log(`----------downloadImage------------`);
      const image = new Image();
      // 解决跨域 Canvas 污染问题
      image.setAttribute("crossOrigin", "Anonymous");
      image.onload = function () {
        // debugger
        console.log(`----------onload in------------`);
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);

        canvas.toBlob((blob) => {
          console.log(`----------blob------------`);
          console.log("blob", blob);
          let url = URL.createObjectURL(blob);
          console.log("url", url);
          let a = document.createElement("a");
          let event = new MouseEvent("click");
          a.download = name || "default.jpg";
          a.href = url;
          a.dispatchEvent(event);
          URL.revokeObjectURL(url); // 内存管理,将这句代码注释掉,则将以 blob:http 开头的url复制到浏览器地址栏有效,否则无效.
        });
      };
      image.src = imgsrc + "?v=" + Date.now(); // 加时间戳防止cdn缓存

      console.log(`----------src imgsrc------------`, image.src);
    },
    // 一键下载所有证书
    downloadAllCerts() {
      this.certsUrlList.forEach((cert) => {
        const certName =
          cert.schoolName +
          "-" +
          cert.teamName +
          "-" +
          cert.teamMember +
          "-" +
          cert.identifier;
        const certUrl = cert.certificateUrl;
        this.downloadImage(certUrl, certName);
      });
      console.log(`----------downloadAllCerts------------`);
    },
    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.form.page = val;
      this.getCertsList();
    },
  },
};
</script>

<style >
.el-row {
  margin-top: 10px;
}
</style>