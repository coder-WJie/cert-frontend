<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>比赛管理</el-breadcrumb-item>
      <el-breadcrumb-item>比赛列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{ eventData.event }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 比赛管理导航区域 -->
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        active-text-color="#ffd04b"
        mode="horizontal"
        @select="handleSelect"
        router
      >
        <el-menu-item index="/certcreate">证书生成</el-menu-item>

        <el-menu-item index="/certmanage">证书管理 </el-menu-item>
        <el-menu-item index="/dataversion">获奖信息数据可视化 </el-menu-item>
        <el-menu-item index="/eventmanage">管理比赛信息</el-menu-item>
      </el-menu>
      <div>
        <router-view></router-view>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eventData: {},
      activeIndex: "/certcreate",
    };
  },
  mounted() {
    console.log("this.$route", this.$route);
    
    this.eventData = this.$route.params.eventData;

    this.$router.push('/certcreate')
  },
  methods: {
    // 导航控制页面
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.activeIndex = key
      if(key === '/certcreate') {
        this.$router.replace('/certcreate').catch(err => console.log(err))
      }else if(key === '/certmanage'){
        this.$router.replace('/certmanage').catch(err => console.log(err))
      } else if(key === '/eventmanage') {
        this.$router.replace('/eventmanage').catch(err => console.log(err))
      }else if(key === '/dataversion') {
        this.$router.replace('/dataversion').catch(err => console.log(err))
      }
    },
  },
};
</script>

<style>
</style>