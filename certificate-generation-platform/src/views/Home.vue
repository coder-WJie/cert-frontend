<template>
  <el-container>
    <el-header height="160px">中国大学生竞赛项目证书生成平台</el-header>
    <el-main>
      <!-- 表格区域 -->
      <el-table fit :data="tableData" stripe border style="width: 100%">
        <el-table-column prop="event" label="比赛项目"> </el-table-column>
        <el-table-column prop="undertaker" label="承办方"> </el-table-column>
        <el-table-column prop="competitionLevel" label="比赛等级">
        </el-table-column>
        <el-table-column prop="administrator" label="管理员"> </el-table-column>
        <el-table-column label="操作" width="400">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-search"
              circle
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              >查询</el-button
            >
            <el-button
              size="mini"
              icon="el-icon-edit"
              circle
              type="primary"
              @click="handleDelete(scope.$index, scope.row)"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-check"
              circle
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
              >生成</el-button
            >
            <el-button
              size="mini"
              type="success"
              icon="el-icon-check"
              circle
              @click="handleDelete(scope.$index, scope.row)"
              >下载</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          event: "ICPC",
          undertaker: "东北大学秦皇岛分校",
          competitionLevel: "国家级",
          administrator: "张三",
        },
        {
          event: "ICPC",
          undertaker: "东北大学秦皇岛分校",
          competitionLevel: "国家级",
          administrator: "张三",
        },
        {
          event: "ICPC",
          undertaker: "东北大学秦皇岛分校",
          competitionLevel: "国家级",
          administrator: "张三",
        },
        {
          event: "ICPC",
          undertaker: "东北大学秦皇岛分校",
          competitionLevel: "国家级",
          administrator: "张三",
        },
        {
          event: "ICPC",
          undertaker: "东北大学秦皇岛分校",
          competitionLevel: "国家级",
          administrator: "张三",
        },
        {
          event: "ICPC",
          undertaker: "东北大学秦皇岛分校",
          competitionLevel: "国家级",
          administrator: "张三",
        },
        {
          event: "ICPC",
          undertaker: "东北大学秦皇岛分校",
          competitionLevel: "国家级",
          administrator: "张三",
        },
        {
          event: "ICPC",
          undertaker: "东北大学秦皇岛分校",
          competitionLevel: "国家级",
          administrator: "张三",
        },
      ],
    };
  },
};
</script>

<style scoped>
.el-container {
  width: 100%;
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 160px;
  font-size: 50px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}
</style>