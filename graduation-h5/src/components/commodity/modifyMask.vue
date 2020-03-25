<template>
  <el-dialog title="请添加/修改内容" :visible.sync="dialogVisible" width="30%">
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
      <el-input-number  v-model="dialogMsg.dishprice" />
    </div>
    <div class="vertical-level-center" style="margin-top : 0.5rem">
      <div style="white-space : nowrap">积分：</div>
      <el-input-number  v-model="dialogMsg.scores" />
    </div>
    <div class="vertical-level-center" style="margin-top : 0.5rem">
      <div style="white-space : nowrap">辣度：</div>
      <el-radio-group v-model="dialogMsg.Spicy">
        <el-radio :label="true">可选</el-radio>
        <el-radio :label="false">默认</el-radio>
      </el-radio-group>
    </div>
    <div class="vertical-level-center" style="margin-top : 0.5rem">
      <div style="white-space : nowrap">尺寸：</div>
      <el-radio-group v-model="dialogMsg.format">
        <el-radio :label="true">可选</el-radio>
        <el-radio :label="false">默认</el-radio>
      </el-radio-group>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogCancel">取 消</el-button>
      <el-button type="primary" @click="dialogCertain">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "modifyMask",
  props: ["dialogMsg", "dialogVisible"],
  methods: {
    dialogCancel() {
      console.log(this.dialogMsg)
      this.$emit("dialogCancel");
    },
    dialogCertain() {
      this.$emit("dialogCertain");
    }
  }
};
</script>

<style>
</style>