<template>
  <el-container>
    <el-backtop></el-backtop>
    <el-header
      style="text-align: right; font-size: 16px"
      v-loading.fullscreen.lock="fullscreenLoading"
    >
      <span>商品列表</span>
    </el-header>

    <el-main>
      <el-table :data="this.DishesArr">
        <el-table-column prop="dishname" label="菜名"></el-table-column>
        <el-table-column prop="dishphoto" label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.dishphoto" style="width : 100% ; height : auto" alt="图片" />
          </template>
        </el-table-column>
        <el-table-column prop="dishprice" label="单价"></el-table-column>
        <el-table-column prop="scores" label="积分"></el-table-column>
        <el-table-column prop="Spicy" label="辣度">
          <template slot-scope="scope">{{scope.row.Spicy ? '可选' : '默认'}}</template>
        </el-table-column>
        <el-table-column prop="format" label="尺寸">
          <template slot-scope="scope">{{scope.row.format ? '可选' : '默认'}}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="onModify(scope.row)" type="warning" size="small">修改</el-button>
            <el-button @click="onRemove(scope.row)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 弹窗 -->
      <ModifyMask
        :dialogMsg="dialogMsg"
        :dialogVisible="dialogVisible"
        @dialogCancel="dialogCancel"
        @dialogCertain="dialogCertain"
      />
    </el-main>

    <img
      class="addIcon"
      @click="onAdd"
      src="http://www.linyuchen-pic.xyz/images/2020/03/25/add.png"
      alt="添加"
    />
  </el-container>
</template>

<script>
import axios from "axios";
import ModifyMask from "./modifyMask";
import { targetUrl } from "../../constants/request";

export default {
  name: "commodity",
  data() {
    return {
      fullscreenLoading: false,
      DishesArr: [],
      dialogVisible: false,
      dialogMsg: {},
      type: "modify"
    };
  },
  created() {
    this.getDishesArr();
  },
  methods: {
    getDishesArr() {
      this.fullscreenLoading = true;
      axios.get(`${targetUrl}/commodity/getList`).then(({ data }) => {
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
      this.type = "modify";
      this.dialogMsg = JSON.parse(JSON.stringify(data));
    },
    onAdd() {
      this.dialogVisible = true;
      this.type = "add";
      this.dialogMsg = {};
    },
    onRemove(data) {
      this.dialogMsg = JSON.parse(JSON.stringify(data));
      const { dialogMsg } = this;
      const url = `${targetUrl}/commodity/remove`;
      axios
        .post(url, dialogMsg, {
          headers: { "Content-Type": "application" }
        })
        .then(() => this.getDishesArr());
    },
    dialogCancel() {
      this.dialogVisible = false;
    },
    dialogCertain() {
      this.dialogVisible = false;
      const { dialogMsg, type } = this;
      let url = "";
      switch (type) {
        case "modify":
          {
            url = `${targetUrl}/commodity/modify`;
          }
          break;
        case "add":
          {
            url = `${targetUrl}/commodity/add`;
          }
          break;
      }

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

  components: {
    ModifyMask
  }
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

.addIcon {
  z-index: 99;
  position: fixed;
  right: 36px;
  bottom: 90px;
  width: 3rem;
  height: 3rem;
}
</style>
