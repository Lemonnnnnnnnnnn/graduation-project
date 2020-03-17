<template>
  <el-container>
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
          <el-table-column prop="Spicy" label="辣度"></el-table-column>
          <el-table-column prop="format" label="尺寸"></el-table-column>
          <el-table-column prop="num" label="数量"></el-table-column>
          <el-table-column prop="sum" label="总价"></el-table-column>
          <el-table-column prop="dishprice" label="单价"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
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

export default {
  name: "DishesList",
  data() {
    return {
      DishesArr: [],
      fullscreenLoading: false
    };
  },
  created() {
    this.getDishesArr();
    console.log("初次获取菜单");

    // 每三十秒获取一次菜单
    // setInterval(() => {
    //   this.getDishesArr();
    //   console.log("获取最新菜单");
    // }, 30000);
  },
  methods: {
    async getDishesArr() {
      axios.get("http://localhost:3001/dishes/getTable").then(({ data }) => {
        const newData = data.map(i => ({ ...i, loading: false }));
        this.DishesArr = newData;
      });
    },

    onCompleteTotal() {
      this.fullscreenLoading = true;
      axios.get(`http://localhost:3001/dishes/completeTotal`).then(res => {
        this.$message("所有订单已完成！");
        this.getDishesArr();
        currentTable.loading = false;
      });
    },

    onComplete(id, itemId) {
      const { DishesArr } = this;
      const currentTable = DishesArr.find(i => i._id === id);
      console.log(DishesArr);
      currentTable.loading = true;

      axios
        .get(
          `http://localhost:3001/dishes/completeOneOrder?id=${id}&itemId=${itemId}`
        )
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
      axios
        .get(`http://localhost:3001/dishes/completeOneTable?id=${id}`)
        .then(res => {
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
