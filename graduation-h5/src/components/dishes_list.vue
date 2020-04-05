<template>
  <el-container>
    <el-backtop></el-backtop>
    <el-header
      style="text-align: right; font-size: 16px"
      v-loading.fullscreen.lock="fullscreenLoading"
    >
      <el-button @click="onCompleteTotal" type="success">全部完成</el-button>
    </el-header>

    <el-main>
      <el-card v-for="o in this.DishesArr" :key="o._id" class="box-card">
        <el-row type="flex" align="middle" style="margin-bottom : 0.5rem">
          <el-col :span="8">
            <el-tag type="info" style="font-size:1.5rem ">{{o.tableID}}桌</el-tag>
          </el-col>
          <el-col :span="8">
            <el-tag type="success" style="font-size:1.5rem ">下单时间：{{o.timePart}}</el-tag>
          </el-col>

          <el-col :span="8" :push="5">
            <el-button type="primary" @click="onCompleteTable(o._id)">整桌订单已完成</el-button>
          </el-col>
        </el-row>

        <el-table
          :data="o.list"
          stripe
          border
          v-loading="o.loading"
          element-loading-text="正在提交订单"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <el-table-column prop="dishname" label="菜名"></el-table-column>
          <el-table-column prop="Spicy" label="辣度">
            <template slot-scope="scope">{{scope.row.Spicy ? scope.row.Spicy : '默认'}}</template>
          </el-table-column>
          <el-table-column prop="format" label="尺寸">
            <template slot-scope="scope">{{scope.row.format ? scope.row.format : '默认'}}</template>
          </el-table-column>
          <el-table-column prop="num" label="数量">
            <template slot-scope="scope">{{scope.row.num ? scope.row.num : 1}}</template>
          </el-table-column>
          <el-table-column prop="sum" label="总价">
            <template slot-scope="scope">{{scope.row.sum ? scope.row.sum : '积分兑换'}}</template>
          </el-table-column>
          <el-table-column prop="dishprice" label="单价">
            <template slot-scope="scope">{{scope.row.dishprice ? scope.row.dishprice : '积分兑换'}}</template>
          </el-table-column>
          <el-table-column prop="remarkTem" label="备注">
            <template slot-scope="scope">{{scope.row.remarkTem ? scope.row.remarkTem : '无备注'}}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="small"
                @click="onComplete(o._id,scope.row.dishesId)"
              >已完成</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
import { targetUrl, targetWs } from "../constants/request";

export default {
  name: "DishesList",
  data() {
    return {
      DishesArr: [],
      fullscreenLoading: false
    };
  },
  // 组件创建时初始化websocket连接,开启连接并准备接受信息
  created() {
    this.getDishesArr();
    this.initWebSocket();
  },
  // 组件销毁时关闭websocket连接
  destroyed() {
    this.websock.websocketclose();
  },
  methods: {
    // 整合websocket方法,包括  开启连接  连接错误  接受信息  关闭连接
    initWebSocket: function() {
      this.websock = new WebSocket(`${targetWs}/submitMenu`);
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
    },
    // websocket开启时调用方法
    websocketonopen: function() {
      console.log("WebSocket连接成功");
      // this.websock.send("连接成功");
    },
    // websocket连接错误时调用方法
    websocketonerror: function(e) {
      console.log("WebSocket连接发生错误");
    },
    // websocket接受信息时调用方法
    websocketonmessage: function(data) {
      console.log(data);
      // 重新刷新菜单
      this.getDishesArr();
    },
    // websocket关闭时调用方法
    websocketclose: function(e) {
      console.log('close')
      // console.log("connection closed (" + e.code + ")");
    },
    async getDishesArr() {
      axios.get(`${targetUrl}/dishes/getTable`).then(({ data }) => {
        const newData = data.map(i => ({ ...i, loading: false }));
        this.DishesArr = newData;
      });
    },

    onCompleteTotal() {
      this.fullscreenLoading = true;
      axios.get(`${targetUrl}/dishes/completeTotal`).then(res => {
        this.$message("所有订单已完成！");
        this.getDishesArr();
        this.fullscreenLoading = false;
      });
    },

    onComplete(id, itemId) {
      const { DishesArr } = this;
      const currentTable = DishesArr.find(i => i._id === id);
      currentTable.loading = true;

      axios
        .get(`${targetUrl}/dishes/completeOneOrder?id=${id}&itemId=${itemId}`)
        .then(res => {
          this.$message("订单已完成！");
          this.getDishesArr();
          currentTable.loading = false;
        });
    },
    onCompleteTable(id) {
      const { DishesArr } = this;
      const currentTable = DishesArr.find(i => i._id === id);
      currentTable.loading = true;
      // this.loading = true;
      axios.get(`${targetUrl}/dishes/completeOneTable?id=${id}`).then(res => {
        this.$message("订单已完成！");
        this.getDishesArr();
        currentTable.loading = false;
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
