<template>
  <div class="background">
    <div class="wrap">
      <div class="opacity"></div>
      <div class="content">
        <div style="width : 100% ; text-align:center">
          <el-row :gutter="20" type="flex" align="middle">
            <el-col :span="5">
              <span>账号：</span>
            </el-col>
            <el-col :span="14">
              <el-input v-model="inputAccount" placeholder="请输入账号"></el-input>
            </el-col>
            <el-col :span="4">
              <span>6位以上</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" align="middle" style="margin-top : 1rem">
            <el-col :span="5">
              <span>密码：</span>
            </el-col>
            <el-col :span="14">
              <el-input type="password" v-model="inputPassword" placeholder="请输入密码"></el-input>
            </el-col>
            <el-col :span="4">
              <span>6位以上</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" align="middle" style="margin-top : 1rem">
            <el-col :span="5">
              <span>确认密码：</span>
            </el-col>
            <el-col :span="14">
              <el-input type="password" v-model="inputPasswordSec" placeholder="请再次输入密码"></el-input>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" align="middle" style="margin-top : 1rem">
            <el-col :span="5">
              <span>邮箱：</span>
            </el-col>
            <el-col :span="14">
              <el-input v-model="inputMailAddress" placeholder="请输入邮箱"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="danger" @click="sendMail">发送验证码</el-button>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" align="middle" style="margin-top : 1rem">
            <el-col :span="5">
              <span>验证码：</span>
            </el-col>
            <el-col :span="14">
              <el-input v-model="inputCode" placeholder="请输入验证码"></el-input>
            </el-col>
          </el-row>

          <el-button
            @click="returnLogin"
            style="width : 10rem ;margin-top : 1rem"
            type="primary"
          >返回登陆</el-button>
          <el-button @click="register" style="width : 10rem ;margin-top : 1rem" type="primary">注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { targetUrl } from "../constants/request";
export default {
  data() {
    return {
      inputAccount: "",
      inputPassword: "",
      inputPasswordSec: "",
      inputMailAddress: "",
      inputCode: ""
    };
  },
  methods: {
    sendMail() {
      var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      pattern.test(this.inputMailAddress)
        ? axios
            .get(`${targetUrl}/user/sendMail?address=${this.inputMailAddress}`)
            .then(res => {
              if (res.status === 200) {
                window.localStorage.setItem("returnCode", res.data);
                this.$message("发送成功");
              } else {
                this.$message(res.data);
              }
            })
        : this.$message("邮箱格式错误！");
    },
    onCheck() {
      var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      const {
        inputAccount,
        inputPassword,
        inputMailAddress,
        inputCode,
        inputPasswordSec
      } = this;
      const returnCode = window.localStorage.getItem("returnCode");
      if (
        inputAccount.length > 5 &&
        inputPassword.length > 5 &&
        pattern.test(inputMailAddress) &&
        inputCode === returnCode &&
        inputPasswordSec === inputPassword
      ) {
        return true;
      } else {
        return false;
      }
    },
    register() {
      const { inputAccount, inputPassword, inputMailAddress } = this;
      const data = { inputAccount, inputPassword, inputMailAddress };

      this.onCheck()
        ? axios({
            url: `${targetUrl}/user/register`,
            method: "post",
            data,
            headers: {
              "Content-Type": "application"
            }
          })
            .then(res => {
              this.$router.push({ name: "login" });
              console.log(res);
              this.$message(res.data);
            })
            .catch(e => {
              this.$message("出错啦");
              console.log(e);
            })
        : this.$message("请检查数据是否符合要求！");
    },
    returnLogin() {
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style lang='scss' scoped>
.wrap {
  position: relative;
  overflow: hidden;
  width: 35rem;
  border-radius: 1rem;

  .opacity {
    position: absolute;
    background: #fff;
    opacity: 0.8;
    width: 100%;
    z-index: -1;
    height: 100%;
  }
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem;
  }
}
.background {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  z-index: -10;

  background-image: url("https://tse3-mm.cn.bing.net/th/id/OIP.16-xGqdRH5CtbAdOJG2GLwHaEK?w=300&h=168&c=7&o=5&dpr=1.25&pid=1.7");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 0;
}
</style>