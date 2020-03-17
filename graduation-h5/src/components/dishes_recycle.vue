<template>
  <el-container>
    <el-header
      style="text-align: right; font-size: 16px"
      v-loading.fullscreen.lock="fullscreenLoading"
    >
      <el-button @click="onCompleteTotal" type="success">清空回收站</el-button>
    </el-header>

    <el-main>
      <el-card v-for="o in this.DishesArr" :key="o._id" class="box-card">
        <el-row>
          <el-col :span="12">
            <el-tag type="info" style="font-size:1.5rem ">{{o.tableID}}桌</el-tag>
          </el-col>
          <el-col :span="12" :push="4">
            <el-tag type="success" style="font-size:1.5rem ">下单时间：{{o.timeComplete}}</el-tag>
          </el-col>
        </el-row>

        <el-table
          :data="o.list"
          v-loading="loading"
          element-loading-text="正在提交订单"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <el-table-column prop="dishname" label="菜名"></el-table-column>
          <el-table-column prop="Spicy.name" label="辣度"></el-table-column>
          <el-table-column prop="format.name" label="尺寸"></el-table-column>
          <el-table-column prop="num" label="数量"></el-table-column>
          <el-table-column prop="sum" label="总价"></el-table-column>
          <el-table-column prop="dishprice" label="单价"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="danger" size="small">已完成</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  name: "DishesRecycle",
  data() {
    return {
      DishesArr: [],
      loading: false,
      fullscreenLoading: false
    };
  },
  created() {
    this.getDishesArr();
    console.log("初次获取回收站");

    // 每三十秒获取一次菜单
    // setInterval(() => {
    //   this.getDishesArr();
    //   console.log("获取最新菜单");
    // }, 30000);
  },
  methods: {
    async getDishesArr() {
      this.fullscreenLoading = true;
      axios.get("http://localhost:3001/recycle/getList").then(({ data }) => {
        console.log(data);
        this.DishesArr = data;
        this.fullscreenLoading = false;
      });
    }
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
.cell {
  text-align: center;
}
</style>
