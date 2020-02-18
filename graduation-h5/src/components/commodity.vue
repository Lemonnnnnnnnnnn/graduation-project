<template>
  <el-container>
    <el-header
      style="text-align: right; font-size: 16px"
      v-loading.fullscreen.lock="fullscreenLoading"
    >
      <span>商品列表</span>
    </el-header>

    <el-main>
      <el-table :data="this.DishesArr">
        <el-table-column prop="dishname" label="菜名"></el-table-column>
        <el-table-column prop="Spicy.name" label="辣度"></el-table-column>
        <el-table-column prop="format.name" label="尺寸"></el-table-column>
        <el-table-column prop="average" label="评分"></el-table-column>
        <el-table-column prop="dishphoto" label="图片"></el-table-column>
        <el-table-column prop="dishprice" label="单价"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="small">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  name: "commodity",
  data() {
    return {
      fullscreenLoading: false,
      DishesArr: []
    };
  },
  created() {
    this.getDishesArr();
  },
  methods: {
    getDishesArr() {
      this.fullscreenLoading = true;
      axios
        .get("http://localhost:3001/dishes/commodityList")
        .then(({ data }) => {
          console.log(data);
          this.DishesArr = data;
          this.fullscreenLoading = false;
        });
    }
  },
  components: {}
};
</script>

<style>
.cell {
  text-align: center;
}
</style>
