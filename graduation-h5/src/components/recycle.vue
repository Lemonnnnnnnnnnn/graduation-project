<template>
  <el-container>
    <el-backtop ></el-backtop>
    <el-header
      style="text-align: right; font-size: 16px"
      v-loading.fullscreen.lock="fullscreenLoading"
    >
      <el-button @click="onCompleteTotal" type="success">清空回收站</el-button>
    </el-header>

    <div
      style="display:flex ; justify-content : center ; align-items:center ; min-height : 10rem"
      v-if="!this.DishesArr.length"
    >
      <span style="color:#67C23A">这里什么都没有哦</span>
    </div>

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
        </el-table>
      </el-card>

      <div
        v-if="this.DishesArr.length"
        style="margin : 3rem ;display : flex ; justify-content : center"
        class="block"
      >
        <el-pagination
          @current-change="onChangePage"
          background
          layout="prev, pager, next"
          :total="this.total"
        ></el-pagination>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  name: "recycle",
  data() {
    return {
      DishesArr: [],
      loading: false,
      fullscreenLoading: false,
      page: 1,
      total: 0
    };
  },
  created() {
    this.getRecycleList();
    console.log("初次获取回收站");

    // 每三十秒获取一次菜单
    // setInterval(() => {
    //   this.getDishesArr();
    //   console.log("获取最新菜单");
    // }, 30000);
  },
  methods: {
    async getRecycleList() {
      this.fullscreenLoading = true;
      axios
        .get(`http://localhost:3001/recycle/getList?page=${this.page}`)
        .then(({ data: { list, total } }) => {
          this.DishesArr = list;
          this.total = total;
          this.fullscreenLoading = false;
        });
    },
    onCompleteTotal() {
      this.fullscreenLoading = true;
      axios.get(`http://localhost:3001/recycle/clear`).then(() => {
        this.getRecycleList();
        this.fullscreenLoading = false;
      });
    },
    onChangePage(currentPage) {
      this.page = currentPage;
      this.getRecycleList();
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
