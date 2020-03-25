<template>
  <el-container style="border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246) ; position:relative">
      <div style="position:fixed ; left : 0 ; width : 200px">
        <el-menu :default-active="this.$route.path" router style="min-height : 60rem">
          <!-- LOGO -->
          <div style="display : flex ; justify-content : center">
            <img
              src="https://tse3-mm.cn.bing.net/th/id/OIP.K4-UcxsltoxOo6pHEsBnDwHaHP?w=202&h=193&c=7&o=5&dpr=1.25&pid=1.7"
              alt
              style="border-radius : 50% ; width :150px ; height : auto ; margin-bottom : 20px "
            />
          </div>

          <!-- 导航栏 -->
          <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.navItem }}</span>
          </el-menu-item>
        </el-menu>
      </div>
    </el-aside>

    <router-view></router-view>
  </el-container>
</template>

<script>
export default {
  name: "Layout",
  data() {
    return {
      navList: [
        { name: "/dishes/tableList", navItem: "菜单", icon: "el-icon-menu" },
        {
          name: "/recycleList",
          navItem: "历史订单",
          icon: "el-icon-document"
        },
        {
          name: "/dishes/commodity",
          navItem: "商品页面",
          icon: "el-icon-s-order"
        },
        {
          name: "/specialList",
          navItem: "可兑换商品",
          icon: "el-icon-setting"
        }
      ]
    };
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
