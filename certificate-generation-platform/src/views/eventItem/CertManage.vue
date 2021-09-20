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
      <el-col :span="1">
        <el-button type="primary" @click="downloadAllCerts"
          >一键下载所有证书</el-button
        >
      </el-col>
    </el-row>

    <el-table :data="tableData" stripe border :fit="true" style="width: 100%">
      <el-table-column prop="teamName" label="获奖团队" width="180">
      </el-table-column>
      <el-table-column prop="players" label="参赛队员" width="180">
      </el-table-column>
      <el-table-column prop="teacher" label="指导老师" width="180">
      </el-table-column>
      <el-table-column prop="level" label="奖项级别" width="180">
      </el-table-column>
      <el-table-column prop="info" label="奖项信息" width="180">
      </el-table-column>
      <el-table-column prop="serialNum" label="队伍序列号" width="180">
      </el-table-column>
      <el-table-column prop="schoolNum" label="所在学校序号" width="180">
      </el-table-column>
      <el-table-column prop="schoolName" label="参赛校名" min-width="140px">
      </el-table-column>
      <el-table-column label="操作" min-width="120px" fixed="">
        <template>
          <el-button size="mini" type="primary">下载证书</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
        teamNumber: '',
      tableData: [
        {
          teamName: "珠峰争霸",
          players: "张三 李四 王五",
          teacher: "大牛",
          level: "国家级",
          info: "一等奖",
          serialNum: "T0001",
          schoolNum: "U0001",
          schoolName: "东北大学秦皇岛分校",
        },
        {
          teamName: "珠峰争霸",
          players: "张三 李四 王五",
          teacher: "大牛",
          level: "国家级",
          info: "一等奖",
          serialNum: "T0001",
          schoolNum: "U0001",
          schoolName: "东北大学秦皇岛分校",
        },
        {
          teamName: "珠峰争霸",
          players: "张三 李四 王五",
          teacher: "大牛",
          level: "国家级",
          info: "一等奖",
          serialNum: "T0001",
          schoolNum: "U0001",
          schoolName: "东北大学秦皇岛分校",
        },
        {
          teamName: "珠峰争霸",
          players: "张三 李四 王五",
          teacher: "大牛",
          level: "国家级",
          info: "一等奖",
          serialNum: "T0001",
          schoolNum: "U0001",
          schoolName: "东北大学秦皇岛分校",
        },
        {
          teamName: "珠峰争霸",
          players: "张三 李四 王五",
          teacher: "大牛",
          level: "国家级",
          info: "一等奖",
          serialNum: "T0001",
          schoolNum: "U0001",
          schoolName: "东北大学秦皇岛分校",
        },
        {
          teamName: "珠峰争霸",
          players: "张三 李四 王五",
          teacher: "大牛",
          level: "国家级",
          info: "一等奖",
          serialNum: "T0001",
          schoolNum: "U0001",
          schoolName: "东北大学秦皇岛分校",
        },
        {
          teamName: "珠峰争霸",
          players: "张三 李四 王五",
          teacher: "大牛",
          level: "国家级",
          info: "一等奖",
          serialNum: "T0001",
          schoolNum: "U0001",
          schoolName: "东北大学秦皇岛分校",
        },
        {
          teamName: "珠峰争霸",
          players: "张三 李四 王五",
          teacher: "大牛",
          level: "国家级",
          info: "一等奖",
          serialNum: "T0001",
          schoolNum: "U0001",
          schoolName: "东北大学秦皇岛分校",
        },
        {
          teamName: "珠峰争霸",
          players: "张三 李四 王五",
          teacher: "大牛",
          level: "国家级",
          info: "一等奖",
          serialNum: "T0001",
          schoolNum: "U0001",
          schoolName: "东北大学秦皇岛分校",
        },
        {
          teamName: "珠峰争霸",
          players: "张三 李四 王五",
          teacher: "大牛",
          level: "国家级",
          info: "一等奖",
          serialNum: "T0001",
          schoolNum: "U0001",
          schoolName: "东北大学秦皇岛分校",
        },
        {
          teamName: "珠峰争霸",
          players: "张三 李四 王五",
          teacher: "大牛",
          level: "国家级",
          info: "一等奖",
          serialNum: "T0001",
          schoolNum: "U0001",
          schoolName: "东北大学秦皇岛分校",
        },
      ],
    };
  },
  methods: {
    // 获取所有证书数据
    getCertsList() {
        console.log(`----------getCertsList------------`);
    },
    downloadAllCerts() {
        console.log(`----------downloadAllCerts------------`);
    }
  },
};
</script>

<style >
.el-row {
    margin-top: 10px;
}
</style>