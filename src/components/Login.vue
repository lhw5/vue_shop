<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 这是表单的数据绑定对象
      loginForm: {
        username: "admin",
        password: "123456",
      },
      // 这是表单验证规则
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    }
  },
  methods: {
    resetLoginForm() {
      // console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post("login", this.loginForm)
        if (res.meta.status !== 200)
          return this.$message({
            message: "登录失败！",
            type: "error",
          })
        this.$message.success("登录成功！")
        // 1.将登录成功之后的token，保存到客户端的sessionStorage中
        //   1.1项目中出了登录之外的其他API接口，必须在登录之后才能访问
        //   1.2 token只应在当前网站打开期间生效，所以将token保存在 sessionStorage 中
        // console.log(res)
        window.sessionStorage.setItem("token", res.data.token)
        // 2．通过编程武导航跳转到后台主页，路由地址是 /home
        this.$router.push("/home")
      })
    },
  },
}
</script>

<style>
.login_container {
  height: 100%;
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
}
.login_box {
  width: 450px;
  height: 300px;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #dcdfe6;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.avatar_box {
  width: 100px;
  height: 100px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 7px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
.avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 50px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}

@media screen and (min-width: 414px) and (max-width: 450px) {
  .login_box {
    width: 400px !important;
    height: 296px !important;
  }
  .avatar_box {
    width: 80px !important;
    height: 80px !important;
    padding: 6px !important;
  }
}
@media screen and (max-width: 414px) {
  .login_box {
    width: 300px !important;
    height: 250px !important;
  }
  .avatar_box {
    width: 60px !important;
    height: 60px !important;
    padding: 5px !important;
  }
}
</style>