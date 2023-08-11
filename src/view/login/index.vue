<template>
  <div>
    <header class="clearfix">
      <img src="../../assets/logo.png" />
      <span class="title">ASG赛事后台管理系统</span>
    </header>
    <main>
      <div class="loginwrap">
        <div v-if="checkSlider" class="slider">
          <Slider @SliderSucess="SliderSucess" @closeSlider="closeSlider" />
        </div>
        <el-form v-if="!checkSlider" :model="userform" :rules="rules" class="demo-ruleForm">
          <p><i class="el-icon-user-solid"></i>ASG管理系统-登录</p>
          <div class="info">
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model="userform.username"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" @keyup.enter="submit">
              <el-input
                v-model="userform.password"
                :type="inputtype"
                placeholder="请输入密码"
              >
                <i @click="toggleEye" slot="suffix" :class="eye_status"></i>
              </el-input>
            </el-form-item>
            <el-button type="primary" style="width: 100%" @click="submit"
              >登录</el-button
            >
          </div>
        </el-form>
      </div>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import { loginUser } from "../../api/login/index";
import { getInfo } from "../../api/home";
import Slider from "./Slider.vue";
export default {
  name: "Login",
  components: {
    Slider,
  },
  data() {
    return {
      userform: {
        username: "",
        password: "",
      },
      checkSlider: false,
      eye_status: "el-icon-lock",
      inputtype: "password",
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    login() {
      loginUser(this.userform)
        .then((res) => {
          this.$message.success("登录成功！");
          this.$store.commit("setToken", res.data);
          this.$router.push("/index");
          this.initGetInfo()
        })
        .catch(() => {
          this.$message.error('账号或者密码错误！');
        });
    },
    initGetInfo() {
      getInfo()
        .then((res) => {
          console.log(res.data);
          this.$store.commit("getUserInfo", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toggleEye() {
      if (this.eye_status === "el-icon-lock") {
        this.eye_status = "el-icon-unlock";
        this.inputtype = "text";
      } else {
        this.eye_status = "el-icon-lock";
        this.inputtype = "password";
      }
    },
    submit() {
      // 切出滑块组件
      this.checkSlider = true;
    },
    // 滑块成功校验
    SliderSucess() {
      var that = this;
      setTimeout(function () {
        that.checkSlider = false;
      }, 1000);
      this.login();
    },
    closeSlider() {
      this.checkSlider = false;
    },
  },
};
</script>

<style scoped lang="less">
@title-font: 1.5rem;
// 头部
header {
  width: 100%;
  height: 70px;
  background-image: url("../../assets/banner.png");
  background-size: 100% 120%;
  img {
    float: left;
    display: inline;
    margin: 10px;
    width: 50px;
    height: 50px;
  }
  span {
    color: #fff;
    float: left;
    display: block;
    line-height: 70px;
    height: 70px;
    font-size: @title-font;
  }
}
// 中间部分
main {
  background-image: url("../../assets/background.png");
  width: 100%;
  height: 80vh;
  background-size: 100% 100%;
  position: relative;
  .loginwrap {
    height: 45vh;
    width: 500px;
    border: 1px solid #ddd;
    background-color: white;
    position: absolute;
    right: 100px;
    top: 10vh;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    .slider{
      width:100%;
      height:100%;
    }
    p {
      text-align: center;
      font-size: 22px;
      margin: 10px 0;
      i {
        color: orange;
      }
    }
    .info {
      width: 70%;
      margin: 0 auto;
      padding: 2%;
      .el-form-item {
        margin: 0;
        padding: 0;
        margin-bottom: 20px;
        &:nth-child(2) {
          margin-bottom: 30px;
        }
        .el-form-item__label {
          line-height: 30px;
        }
        .el-input {
          i {
            line-height: 40px;
            font-size: 22px;
          }
        }
      }
    }
  }
}
// 底部
footer {
  height: calc(100vh - 70px - 80vh);
  width: 100%;
  background-image: url("../../assets/footer.png");
  background-size: 100% 100%;
}
</style>
