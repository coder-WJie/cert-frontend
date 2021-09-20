<template>
  <div>
    <el-descriptions  labelClassName="descriptions" title="带边框列表" :column="1" border>
      <template slot="extra">
        <el-button type="primary" size="normal" @click="editEventData"
          >编辑</el-button
        >
      </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          大赛名称
        </template>
        ICPC
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          大赛介绍
        </template>
        国际大学生程序设计竞赛（英文全称：International Collegiate Programming
        Contest（简称ICPC））是由国际计算机协会（ACM）主办的，一项旨在展示大学生创新能力、团队精神和在压力下编写程序、分析和解决问题能力的年度竞赛。经过近40年的发展，ACM国际大学生程序设计竞赛已经发展成为全球最具影响力的大学生程序设计竞赛。赛事目前由AWS、华为和Jetbrains
        [5] 赞助。
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          主办单位
        </template>
        教育部
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          赛事承办方
        </template>
        <el-tag size="small">东北大学秦皇岛分校</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          比赛时间
        </template>
        9月8号
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 编辑比赛表单
      editEventForm: {
        event: "",
        organizer: "",
        undertaker: "",
        competitionLevel: "",
        date: "",
        administrator: "",
      },
    };
  },
  created() {
    // 从vuex拿到该比赛的信息
    // dom中的描述信息和vuex里的数据双向绑定
  },
  methods: {
    editEventData() {
      console.log(`---------editEventData-------------`);
      // post 提交数据修改数据库的比赛信息
      // 请求成功后，修改vuex里存储的数据
    },
  },
};
</script>

<style>
.el-descriptions {
  margin-top: 10px;
}
.descriptions{
    min-width:150px;
}
</style>