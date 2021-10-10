<template>
  <div>
     <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 用户列表区域 -->
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column prop="username" label="用户" width="180"> </el-table-column>
      <el-table-column prop="role" label="角色" width="180"> </el-table-column>
      <el-table-column prop="exclusiveId" label="比赛管理ID"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  methods: {
    async getUsersList() {
      const res = await this.$http.get('findAll')
      console.log('res',res);
      if(res.data.code == 200) {
        console.log(`---------getUsersList-------------`);
        this.tableData = res.data.data.map(item => {
          return {
            username: item.userName,
            role: '管理员',
            exclusiveId: item.exclusiveId
          }
        })
        console.log('this.tableData',this.tableData);
      }

    }
  },
  created() {
    this.getUsersList()
  },
  data() {
    return {
      tableData: [
        
      ],
    };
  },
};
</script>

<style>
</style>