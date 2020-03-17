<template>
  <div class="background">
    <div class="wrap">
      <div class="opacity"></div>
      <div class="content">
        <div style="text-align : center">
          <el-input v-model="inputAccount" placeholder="请输入账号"></el-input>
          <el-input
            type="password"
            v-model="inputPassword"
            style="margin-top : 1rem"
            placeholder="请输入密码"
          ></el-input>
          <el-button @click="login" style="width : 10rem ;margin-top : 1rem" type="primary">登录</el-button>
          <el-button @click="register" style="width : 10rem ;margin-top : 1rem" type="primary">注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      inputAccount: "",
      inputPassword: ""
    };
  },
  methods: {
    login(e) {
      const { inputAccount, inputPassword } = this;
      const obj = { inputAccount, inputPassword };
      axios
        .post("http://localhost:3001/user/login", obj, {
          headers: { "Content-Type": "application" }
        })
        .then(res => {
          console.log(res);
          res.status === 200 && this.$router.push("/dishes/tableList");
          res.status === 203 && this.$message(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    register(e) {
      this.$router.push({ name: "register" });
    }
  }
};
</script>

<style lang='scss' scoped>
.wrap {
  width: 30rem;
  height: 15rem;
  position: relative;
  overflow: hidden;
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
    padding: 4rem;
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

  background-image: url("http://www.linyuchen-pic.xyz/images/2020/03/14/95j6mk.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 0;
}
</style>