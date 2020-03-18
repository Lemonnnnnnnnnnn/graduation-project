<template>
  <el-container>
    <el-backtop></el-backtop>
    <el-header
      style="text-align: right; font-size: 16px"
      v-loading.fullscreen.lock="fullscreenLoading"
    >
      <span>商品列表</span>
    </el-header>

    <el-main class="scrollBar">
      <el-table height="650" :data="this.DishesArr">
        <el-table-column prop="dishname" label="菜名"></el-table-column>
        <el-table-column prop="dishphoto" label="图片"></el-table-column>
        <el-table-column prop="dishprice" label="单价"></el-table-column>
        <el-table-column prop="Spicy" label="辣度">
          <template slot-scope="scope">{{scope.row.Spicy ? '可选' : '默认'}}</template>
        </el-table-column>
        <el-table-column prop="format" label="尺寸">
          <template slot-scope="scope">{{scope.row.format ? '可选' : '默认'}}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="onModify(scope.row)" type="danger" size="small">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 弹窗 -->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <div class="vertical-level-center">
          <div style="white-space : nowrap">菜名：</div>
          <el-input type="text" v-model="dialogMsg.dishname" />
        </div>
        <div class="vertical-level-center" style="margin-top : 0.5rem">
          <div style="white-space : nowrap">图片：</div>
          <el-input type="text" v-model="dialogMsg.dishphoto" />
        </div>
        <div class="vertical-level-center" style="margin-top : 0.5rem">
          <div style="white-space : nowrap">价格：</div>
          <el-input type="text" v-model="dialogMsg.dishprice" />
        </div>
        <div class="vertical-level-center" style="margin-top : 0.5rem">
          <div style="white-space : nowrap">辣度：</div>
          <el-radio label="true" v-model="dialogMsg.Spicy">可选</el-radio>
          <el-radio label="false" v-model="dialogMsg.Spicy">默认</el-radio>
        </div>
        <div class="vertical-level-center" style="margin-top : 0.5rem">
          <div style="white-space : nowrap">尺寸：</div>
          <el-radio label="true" v-model="dialogMsg.format">可选</el-radio>
          <el-radio label="false" v-model="dialogMsg.format">默认</el-radio>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogCancel">取 消</el-button>
          <el-button type="primary" @click="dialogCertain">确 定</el-button>
        </span>
      </el-dialog>
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
      DishesArr: [],
      dialogVisible: false,
      dialogMsg: {}
    };
  },
  created() {
    this.getDishesArr();
  },
  methods: {
    getDishesArr() {
      this.fullscreenLoading = true;
      axios.get("http://localhost:3001/commodity/getList").then(({ data }) => {
        const newArr = [];
        data.forEach(i => {
          newArr.push({ ...i, active: false });
        });
        this.DishesArr = data;
        this.fullscreenLoading = false;
      });
    },
    onModify(data) {
      this.dialogVisible = true;
      this.dialogMsg = JSON.parse(JSON.stringify(data));
    },
    dialogCancel() {
      this.dialogVisible = false;
    },
    dialogCertain() {
      this.dialogVisible = false;
      const { dialogMsg } = this;
      const url = "http://localhost:3001/commodity/modify";
      axios
        .post(url, dialogMsg, {
          headers: { "Content-Type": "application" }
        })
        /**
         *  .then漏写了()=>，直接写了this.getDishesArr()
         *   依然执行了函数，但.then似乎无效了
         *   查阅官网
         *   注意：如果忽略针对某个状态的回调函数参数，或者提供非函数 (nonfunction) 参数，
         *   那么 then 方法将会 丢失关于该状态的回调函数信息 ，但是并不会产生错误。
         */
        .then(() => this.getDishesArr());
    }
  },
  components: {}
};
</script>

<style>
.cell {
  text-align: center;
}
.vertical-level-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
