<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header class="el-header" height="100px">
      <div>
        <img class="logoImg" src="../assets/header3.png" alt="" />
        <!-- <span>证书生成平台</span> -->
      </div>
      <el-button class="loginout" type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside class="el-aside" :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          text-color="#146d74"
          active-text-color="#333744"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu
            v-for="item in menulist"
            :key="item.id"
            :index="item.id + ''"
          >
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容主体区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      //左侧菜单数据
      menulist: [
        {
          authName: "比赛管理",
          id: 101,
          path: "competitions",
          children: [
            {
              authName: "比赛列表",
              id: 7,
              path: "competitions",
              children: [],
            },
          ],
        },
       /*  {
          authName: "权限管理",
          id: 103,
          path: "rights",
          children: [
            {
              authName: "角色列表",
              id: 5,
              path: "rights",
              children: [],
            },
            {
              authName: "权限列表",
              id: 6,
              path: "rights",
              children: [],
            },
          ],
        }, */
        {
          authName: "用户管理",
          id: 125,
          path: "users",
          children: [
            {
              authName: "用户列表",
              id: 4,
              path: "users",
              children: [],
            },
          ],
        },
      ],
      iconsObj: {
        125: "iconfont icon-user",
        103: "iconfont icon-tijikongjian",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-danju",
        145: "iconfont icon-baobiao",
      },
      isCollapse: true,
      activePath: "", //被激活的动态链接地址
    };
  },
  created() {
    // this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  mounted() {
    this.$router.push('/competitions')
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/");
    },
    //获取所有的菜单
    async getMenuList() {
      
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status !== 200) return this.$message.error(res.mes);
      this.menulist = res.data;
    },
    //点击按钮，实现菜单的折叠与展开
    toggleCollapse() {
      const _this = this
      console.log('_this',_this);
      this.isCollapse = !this.isCollapse;
    },
    saveNavState(activePath) {
      //保存链接的激活状态
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  background-color: #373d41;
  // background-image: url('../assets/header.png');
  // background-repeat: repeat-x;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.logoImg {
  position: absolute;
  width: 100%;
  height: 100px;
  object-fit: cover;
}
.loginout {
  position: absolute;
  right: 50px;
  z-index: 10000;
}
.el-aside {
  background-image: url("../assets/aside.png");
  background-size: 100% 100%;
  .el-menu {
    border-right: none;
    text-align: left;
    // background-color: #2fafd6;
  }
}
.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #146d74;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
</style>