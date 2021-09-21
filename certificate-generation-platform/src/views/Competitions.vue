<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>比赛管理</el-breadcrumb-item>
      <el-breadcrumb-item>比赛列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="newEvent"
            clearable
            @clear="getEventsList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getEventsList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="1">
          <el-button type="primary" @click="addEventDialogVisible = true"
            >添加比赛</el-button
          >
        </el-col>
      </el-row>

      <!-- 表格区域 -->
      <el-table fit :data="tableData" stripe border style="width: 100%">
        <el-table-column prop="matchName" label="比赛项目"> </el-table-column>
        <el-table-column prop="organizer" label="主办单位"> </el-table-column>
        <el-table-column prop="matchId" label="比赛ID"> </el-table-column>
        <el-table-column prop="matchTime" label="举办时间"> </el-table-column>
        <el-table-column prop="certificateTime" label="证书时间">
        </el-table-column>
        <el-table-column prop="matchIntroduction" label="比赛介绍"> </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-search"
              size="mini"
              type="success"
              @click="manage(scope.$index, scope.row)"
              >管理比赛</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
           <!--  <el-button
              type="warning"
              icon="el-icon-check"
              circle
              size="mini"
              @click="handleGenerate(scope.$index, scope.row)"
              >生成</el-button
            >
            <el-badge :value="12" class="item">
              <el-button
                class="test"
                size="mini"
                type="success"
                icon="el-icon-check"
                circle
                @click="handleDownload(scope.$index, scope.row)"
                >下载</el-button
              > -->
            </el-badge>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加比赛对话框 -->
    <el-dialog title="添加比赛" :visible.sync="addEventDialogVisible">
      <el-form :model="newEventForm">
        <el-form-item label="比赛名称" :label-width="formLabelWidth">
          <el-input v-model="newEventForm.matchName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="主办单位" :label-width="formLabelWidth">
          <el-input v-model="newEventForm.organizer" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="比赛ID" :label-width="formLabelWidth">
          <el-input v-model="newEventForm.matchId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="比赛介绍" :label-width="formLabelWidth">
          <el-input v-model="newEventForm.matchIntroduction" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="比赛时间" :label-width="formLabelWidth">
          <el-input v-model="newEventForm.matchTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="证书时间" :label-width="formLabelWidth">
          <el-input v-model="newEventForm.certificateTime" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewEvent"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 生成证书对话框 -->
    <el-dialog title="证书生成" :visible.sync="generateDialogVisible">
      <!-- 上传 excel获奖数据 -->
      <el-upload
        class="upload-demo"
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
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="generateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="generateDialogVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newEvent: "", //新比赛
      tableData: [],
      /* tableData: [
        {
          event: "ICPC",
          organizer: "教育部",
          undertaker: "东北大学秦皇岛分校",
          competitionLevel: "国家级",
          date: "10月8日",
          administrator: "张三",
        },
        {
          event: "ICPC",
          organizer: "教育部",
          undertaker: "东北大学秦皇岛分校",
          competitionLevel: "国家级",
          date: "10月8日",
          administrator: "张三",
        },
        {
          event: "ICPC",
          organizer: "教育部",
          undertaker: "东北大学秦皇岛分校",
          competitionLevel: "国家级",
          date: "10月8日",
          administrator: "张三",
        },
        {
          event: "ICPC",
          organizer: "教育部",
          undertaker: "东北大学秦皇岛分校",
          competitionLevel: "国家级",
          date: "10月8日",
          administrator: "张三",
        },
        {
          event: "ICPC",
          organizer: "教育部",
          undertaker: "东北大学秦皇岛分校",
          competitionLevel: "国家级",
          date: "10月8日",
          administrator: "张三",
        },
        {
          event: "ICPC",
          organizer: "教育部",
          undertaker: "东北大学秦皇岛分校",
          competitionLevel: "国家级",
          date: "10月8日",
          administrator: "张三",
        },
        {
          event: "ICPC",
          organizer: "教育部",
          undertaker: "东北大学秦皇岛分校",
          competitionLevel: "国家级",
          date: "10月8日",
          administrator: "张三",
        },
        {
          event: "ICPC",
          organizer: "教育部",
          undertaker: "东北大学秦皇岛分校",
          competitionLevel: "国家级",
          date: "10月8日",
          administrator: "张三",
        },
      ], */
      addEventDialogVisible: false,
      generateDialogVisible: false,
      form: {
        backgroundImg: "",
        excelData: "",
      },
      // 添加新比赛表单
      newEventForm: {
        matchId: '',
        matchName: "",
        matchIntroduction: '',
        organizer: "",
        matchTime: "",
        certificateTime: "",
      },
      formLabelWidth: "120px",
      fileList: [],
      //  预览证书背景图
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
    };
  },
  created(){
    this.getEventsList()

  },
  methods: {
    // 请求比赛表格数据
    async getEventsList() {
      console.log(`---------getEventsList-------------`);
      const res = await this.$http.get('/MatchInfo/findAll')
      console.log('res',res);
      if(res.data.code === !200) {
        return this.$message.error("获取比赛数据失败！")
      }
      // 表格渲染数据
        this.tableData = res.data.data
    },
    manage(index, eventData) {
      this.$router.push({ name:"EventItem",params:{ eventData: eventData, index: index}})
    },
    handleEdit() {},
    handleDelete() {},
    handleGenerate() {
      this.generateDialogVisible = true;
    },
    handleDownload() {},
    // 添加新比赛
    async addNewEvent() {
      console.log('this.newE ventForm',this.newEventForm);
      const res = await this.$http.post('/MatchInfo/addMatchInfo',this.newEventForm)
      console.log('res',res);
      if(res.data.code !== 200) {
        return this.$message.error("添加失败！")
      }
      return this.$message.success("添加成功！")
    },
    // 删除比赛
    handleDelete(index, matchData) {
        this.$alert('您确定要删除该比赛吗', '删除比赛操作', {
          confirmButtonText: '确定',
          callback:async action => {
            console.log('action',action);
            if(action === 'confirm') {
              // delete 请求
              const res = await this.$http.get('/MatchInfo/deleteMatchInfo',{matchId: matchData.matchId})
              console.log('delete  res',res);
              if(res.data.code !== 200) {
                return this.$message.error("删除失败！")
              }
              // 更新表格数据
              this.getEventsList()

              return this.$message({
              type: 'success',
              message: `action: ${ action }`
            });
            } 
            return this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },
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
  },
};
</script>

<style scoped>
/deep/ .el-table .cell {
  height: 60px;
  display: flex;
  align-items: center;
}

/* .el-input {
  width: 200px;
} */
</style>