<template>
  <div class="main">
    <p>属性显示图层列表</p>
    <el-form :inline="true" :model="searchObj" class="demo-form-inline">
      <!-- <el-form-item label="关键字：">
        <el-input
          v-model="searchObj.title"
          @keyup.enter.native="onSubmit"
          placeholder=""
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onReset">重置</el-button>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onAdd">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column prop="layer_name" label="图层名称"> </el-table-column>
      <el-table-column prop="layer_id" label="图层id"> </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="editHandleClick(scope.row)"
            type="text"
            size="small"
            >编辑</el-button
          >
          <el-button
            @click="deleteHandleClick(scope.row)"
            type="text"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="this.handleSizeChange"
      @current-change="this.handleCurrentChange"
      :current-page="this.AttributeDisplayLayerPage"
      :page-sizes="[10, 15, 20, 50]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.total"
    >
    </el-pagination>
    <!-- 添加属性显示图层 -->
    <el-dialog
      title="添加属性显示图层"
      :visible.sync="addDialogVisible"
      width="30%"
      :before-close="addHandleClose"
    >
      <el-form
        :model="addRuleForm"
        :rules="addRules"
        ref="addRuleForm"
        label-width="100px"
        class="demo-addRuleForm"
      >
        <el-form-item label="图层id：" prop="layerId">
          <el-input
            v-model="addRuleForm.layerId"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="图层名称：" prop="layerName">
          <el-input
            v-model="addRuleForm.layerName"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addSubmitForm('addRuleForm')"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["AttributeDisplayLayerPageSize", "AttributeDisplayLayerPage"]),
  },
  data() {
    return {
      searchObj: {},
      tableData: [],
      //   添加属性显示图层
      addDialogVisible: false,
      addData: null,
      addRuleForm: {
        layerId: "",
        layerName: "",
      },
      addRules: {
        layerId: [{ required: true, message: "请输入图层id", trigger: "blur" }],
        layerName: [
          { required: true, message: "请输入图层名称", trigger: "blur" },
        ],
      },
      total: 0,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.selectPropertyShowLayers();
      console.log(res);
      this.total = res.data.length;
      this.tableData = res.data;
      this.getModulesByPage();
    },
    // 添加
    onAdd() {
      this.addDialogVisible = true;
    },
    // 编辑
    editHandleClick(row) {
      this.$store.commit("AttributeDisplayLayerObj", row);
      this.$router.push({ name: "AttributeDisplayLayerDetails" });
    },
    // 删除
    async deleteHandleClick(row) {
      await this.$api.deletePropertyShowLayer(row.id);
      this.getData();
    },
    // 添加保存
    addSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.addRuleForm);
          this.$api.insertPropertyShowLayer(this.addRuleForm).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: "保存成功",
                type: "success",
              });
              this.distributionDialogVisible = false;
              this.getData();
            } else {
              this.$message.error("保存失败");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("AttributeDisplayLayerPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("AttributeDisplayLayerPage", val);
    },
    async getModulesByPage() {
      const res = await this.$api.selectPropertyShowLayer(
        this.AttributeDisplayLayerPage,
        this.AttributeDisplayLayerPageSize,
      );
      console.log(res)
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
  },
  watch: {
    AttributeDisplayLayerPage: function (page) {
      this.$store.commit("AttributeDisplayLayerPage", page);
      this.getModulesByPage();
    },
    AttributeDisplayLayerPageSize: function (pageSize) {
      this.$store.commit("AttributeDisplayLayerPageSize", pageSize);
      this.getModulesByPage();
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  font-size: 36px;
  margin-bottom: 20px;
}
</style>