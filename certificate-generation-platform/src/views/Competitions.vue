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
            v-model="searchEvent"
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
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加比赛对话框 -->
    <el-dialog ref="addMatchForm" title="添加比赛" :visible.sync="addEventDialogVisible">
      <el-form :model="newEventForm">
        <el-form-item label="管理员ID" :label-width="formLabelWidth">
          <el-input v-model="newEventForm.exclusiveId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="比赛名称" :label-width="formLabelWidth">
          <el-input v-model="newEventForm.matchName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="主办单位" :label-width="formLabelWidth">
          <el-input v-model="newEventForm.organizer" autocomplete="off"></el-input>
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
        <el-button @click="closeAddMatchForm">取 消</el-button>
        <el-button type="primary" @click="addNewEvent"
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
      searchEvent: "", // 查询参数
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
      // 添加新比赛表单
      newEventForm: {
        matchName: "",
        matchIntroduction: "",
        organizer: "",
        matchTime: "",
        certificateTime: "",
        exclusiveId: "",
      },
      formLabelWidth: "120px",
    };
  },
  created() {
    this.getEventsList();
  },
  methods: {
    // 请求比赛表格数据
    async getEventsList() {
      console.log(`---------getEventsList-------------`);
      console.log("this.searchEvent", this.searchEvent);
      const res = await this.$http.get(
        `/MatchInfo/queryMatchInfo/?matchName=${this.searchEvent}`,
        {
          matchName: this.searchEvent,
        }
      );
      console.log("获取比赛数据", res.data.data);
      if (res.data.code === !200) {
        return this.$message.error("获取比赛数据失败！");
      }
      // 表格渲染数据
      this.tableData = res.data.data;
    },
    async manage(index, eventData) {
      // 将当前比赛信息存入vuex
      console.log(`----------current------------`, eventData);
      // 获取vuex里的managerID 和 当前比赛id 进行鉴权
      let managerId = this.$store.state.managerId;
      // 请求比赛id
      const res = await this.$http.get(
        `/MatchInfo/getExclusiveId?matchName=${eventData.matchName}`
      );
      console.log("res", res);
      console.log("res.data.code", res.data.code);
      console.log("managerId", managerId);
      console.log("res.data.data", res.data.data);
      console.log("managerId === res.data.data", managerId === res.data.data);
      if (res.data.code === 200 && managerId === res.data.data) {
        console.log(`----------您可以管理该比赛------------`);
        this.$store.dispatch("setCurrentMatchData", eventData);
        this.$router.push({
          name: "EventItem",
          params: { eventData: eventData, index: index },
        });
      }
      // 没权限
      else return this.$message.error("您没有管理该比赛的权限！");
    },
    closeAddMatchForm() {
      console.log(`----------清空注册表单域，关闭对话框------------`);
      this.$refs.addMatchForm.resetFields();
      this.addEventDialogVisible = false;
    },
    // 添加新比赛
    async addNewEvent() {
      console.log("this.newE ventForm", this.newEventForm);
      const res = await this.$http.post(
        "/MatchInfo/addMatchInfo",
        this.newEventForm
      );
      console.log("res", res);
      if (res.data.code !== 200) {
        return this.$message.error("添加失败！");
      }
      // 更新表格数据
      this.getEventsList();
      this.addEventDialogVisible = false;
      return this.$message.success("添加成功！");
    },
    // 删除比赛
    handleDelete(index, matchData) {
      this.$alert("您确定要删除该比赛吗", "删除比赛操作", {
        confirmButtonText: "确定",
        callback: async (action) => {
          console.log("action", action);
          if (action === "confirm") {
            // delete 请求
            console.log("matchData.matchId", matchData.matchId);
            const res = await this.$http.delete(
              `/MatchInfo/deleteMatchInfo/?matchId=${matchData.matchId}`,
              {
                matchId: matchData.matchId,
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            console.log("delete  res", res);
            if (res.data.code !== 200) {
              return this.$message.error("删除失败！");
            }
            // 更新表格数据
            this.getEventsList();

            return this.$message({
              type: "success",
              message: `action: ${action}`,
            });
          }
          return this.$message({
            type: "info",
            message: `action: ${action}`,
          });
        },
      });
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