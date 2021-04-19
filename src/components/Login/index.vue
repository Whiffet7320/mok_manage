<template>
  <div id="login">
    <div class="loginConbox">
      <div class="loginBox">
        <div class="loginCon">
          <el-card shadow="always" class="login-module" v-if="smdl">
            <div slot="header" class="clearfix formTitlt">
              <span>知识库管理后台</span>
            </div>
            <el-form
              :model="loginForm"
              ref="loginForm"
              status-icon
              label-width="100px"
              :rules="rules"
              class="demo-ruleForm"
            >
              <el-form-item prop="username">
                <i class="el-icon-user"></i>
                <el-input
                  type="text"
                  v-model="loginForm.username"
                  auto-complete="off"
                  placeholder="请输入账号"
                  class="el-inp"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <i class="el-icon-unlock"></i>
                <el-input
                  type="password"
                  v-model="loginForm.password"
                  auto-complete="off"
                  placeholder="请输入密码"
                  class="el-inp"
                  @keyup.enter.native="submitForm"
                ></el-input>
              </el-form-item>
              <el-form-item prop="checkPass" v-if="!this.isRegister">
                <i class="el-icon-unlock"></i>
                <el-input
                  type="password"
                  v-model="loginForm.checkPass"
                  auto-complete="off"
                  placeholder="请确认密码"
                  class="el-inp"
                  @keyup.enter.native="submitForm"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <div class="registerLogin">
                  <el-button
                    v-if="this.isRegister"
                    type="success"
                    class="subBtn"
                    @click="submitForm"
                    >登录</el-button
                  >
                  <el-button
                    v-else
                    type="success"
                    class="subBtn"
                    @click="registerUser"
                    >注册</el-button
                  >
                  <span
                    class="register"
                    v-if="this.isRegister"
                    @click="register"
                    >注册账号</span
                  >
                  <span
                    class="register"
                    v-if="!this.isRegister"
                    @click="registerLogin"
                    >立即登录</span
                  >
                </div>
              </el-form-item>
              <!-- <el-form-item>
                <el-button class="subBtn" @click="submitForm"
                  >立即注册</el-button
                >
              </el-form-item> -->
            </el-form>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.loginForm.checkPass !== "") {
          this.$refs.loginForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.loginForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      smdl: true,
      loginForm: {
        username: "",
        checkPass: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      isRegister: true,
    };
  },
  methods: {
    // 注册
    async registerUser() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          const obj = {
            ...this.loginForm,
          };
          delete obj.checkPass;
          this.$api.register(this.loginForm).then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.$message({
                message: "注册成功",
                type: "success",
              });
              setTimeout(() => {
                this.isRegister = true;
              }, 500);
            } else {
              this.$message.error("注册失败");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    register() {
      this.isRegister = false;
    },
    // 立即登录
    registerLogin() {
      this.isRegister = true;
    },
    // 登录
    async submitForm() {
      const res = await this.$api.login({
        username: this.loginForm.username,
        password: this.loginForm.password,
      });
      if (res.code == 200) {
        console.log(res.data);
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("isLogin", true);
        sessionStorage.setItem("userid", res.data.userid);
        this.$message({
          message: "登录成功",
          type: "success",
        });
        setTimeout(() => {
          this.$router.push({ path: "/" });
          this.$router.go(0);
        }, 500);
      } else {
        this.$message.error(res.msg);
      }
    },
  },
};
</script>
<style lang="scss">
#login {
  width: 100%;
  height: 100vh;
  background-color: #ddd;
  .registerLogin {
    width: 100%;
    display: flex;
    transform: translate(14%, 10%);
    .subBtn {
      width: 70%;
    }
    .register {
      color: #409eff;
      margin-left: 20px;
      transform: translateY(10px);
    }
  }
  .loginConbox {
    background: #ddd;
  }
  .header {
    height: 60px;
    position: relative;
    background: #2d3a4b;
    /*border-bottom: 1px solid rgba(255, 255, 255, 0.3);*/
    .logo {
      margin-left: 30px;
      width: 500px;
      float: left;
      height: 40px;
      padding-top: 10px;
      img {
        height: 100%;
      }
    }
  }

  .loginBox {
    .iconcolor {
      color: #409eff;
    }

    padding: 74px 0 118px;

    .loginCon {
      width: 990px;
      margin: auto;
      position: relative;
      height: 388px;

      .el-card__header {
        border-bottom: 0px;
        background-color: #2d3a4b;
        color: #fff;
      }
      .title {
        font-size: 36px;
        font-weight: 600;
        color: #ffffff;
        width: 500px;
        float: left;
        margin-top: 0px;
        &:first-child {
          font-size: 34px;
          margin-top: 50px;
          margin-bottom: 30px;
        }
      }
      .login-module {
        width: 600px;
        height: 350px;
        margin-top: 60px;
        border: none;
        position: absolute;
        top: 80%;
        left: 50%;
        transform: translate(-50%, -50%);

        .formTitlt {
          font-size: 18px;
          font-weight: 400;

          .titIconbox {
            float: left;
            height: 38px;
            width: 38px;
            margin-top: -8px;
            margin-right: 16px;
            border: 2px solid #fff;
            img {
              width: 100%;
              height: 100%;
            }
            .pointer {
              cursor: pointer;
            }
            .my-logo {
              margin-right: 30px;
            }
          }
        }

        .smalltxt {
          text-align: right;

          .a {
            text-decoration: none;
            color: #999999;
            font-size: 12px;
            margin-left: 8px;
          }
        }
      }
      .demo-ruleForm {
        position: absolute;
        top: 56%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .el-form-item__content {
        margin-left: 0px !important;
        display: flex;
        .el-icon-user,
        .el-icon-unlock {
          font-size: 30px;
          line-height: 40px;
          margin-right: 20px;
        }
        .el-inp {
          width: 260px;
        }
      }
    }

    .el-input__inner,
    .el-button,
    .el-card,
    .el-message {
      border-radius: 0px !important;
    }

    .el-form-item__content .ico {
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: 999;
      width: 40px;
      height: 39px;
      text-align: center;
      border-right: 1px solid #ccc;
    }

    .ewmbox {
      width: 100%;
      height: 240px;
      margin-top: -25px;

      .ewm {
        width: 140px;
        height: 140px;
        margin: 20px auto;

        p {
          font-size: 12px;
          padding-left: 40px;
          margin: 0;
        }
      }

      .ewmicon {
        width: 140px;
        margin: 20px auto 0;

        .iconfont {
          float: left;
        }

        p {
          font-size: 12px;
          padding-left: 40px;
          margin: 0;
        }
      }
    }
  }
}
</style>
