<template>
  <el-container style="border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-active="this.$route.path" router>
        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.navItem }}</span>
        </el-menu-item>
      </el-menu>
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
          name: "/dishes/recycleList",
          navItem: "历史订单",
          icon: "el-icon-document"
        },
        {
          name: "/dishes/commodity",
          navItem: "商品页面",
          icon: "el-icon-s-order"
        }
        // { name: "/test", navItem: "导航3" }
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
