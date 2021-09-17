<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 表单信息 -->
      <div class="avater_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <el-form
        :model="loginForm"
        ref="loginForm"
        :rules="loginFormRules"
        label-width="auto"
        class="login_form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="openRegisterDialog"
            >没有账号？点此注册账号</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <!-- 注册用户账号对话框 -->

    <el-dialog title="注册账号" :visible.sync="registerDialogVisiable">
      <el-form ref="registerForm" :model="form">
        <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
          <el-input v-model="form.username" :autofocus="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeRegisterForm">取 消</el-button>
        <el-button type="primary" @click="register">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },
      loginFormRules: {
        // 验证用户名
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        //验证密码的规则
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      registerDialogVisiable: false, // 注册对话框显示与隐藏
      form: {
        username: "",
        password: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    login() {
      console.log(`----------login------------`);
    },
    resetLoginForm() {
      console.log(`----------reset------------`);
      this.$refs.loginForm.resetFields();
    },
    openRegisterDialog() {
      this.registerDialogVisiable = true;
    },
    closeRegisterForm() {
      console.log(`----------清空注册表单域，关闭对话框------------`);
      this.$refs.registerForm.resetFields();
      this.registerDialogVisiable = false;
    },
    register() {
      // 注册接口post到后端
      console.log(`----------register------------`);
    },
  },
};
</script>

<style>
.login_container {
  width: 100%;
  height: 100%;
  background-image: url("../assets/login_background.jpeg");
  background-size: 100% 100%;
}
.login_container .login_box {
  width: 550px;
  height: 400px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avater_box {
  height: 130px;
  width: 130px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 50%;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
.avater_box img {
  width: 100%;
  height: 100%;
  border: 1px solid #eee;
  border-radius: 50%;
  /* padding: 10px; */
  background-color: #eee;
}
.login_form {
  position: absolute;
  top: 30%;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>