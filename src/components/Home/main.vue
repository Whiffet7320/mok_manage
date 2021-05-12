<template>
  <div class="home">
    <p>模块列表</p>
    <el-form :inline="true" :model="searchObj" class="demo-form-inline">
      <!-- <el-form-item label="分类：">
        <el-cascader
          v-model="value"
          :options="options"
          @change="optionsChange"
          :props="{ checkStrictly: true }"
          clearable
        ></el-cascader>
      </el-form-item> -->
      <el-form-item label="关键字：">
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
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onAdd">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column :show-overflow-tooltip="true" fixed prop="id" label="id"> </el-table-column>
      <el-table-column :show-overflow-tooltip="true" fixed prop="text" label="工具栏名称"> </el-table-column>
      <el-table-column :show-overflow-tooltip="true" fixed prop="modular" label="模块"> </el-table-column>
      <el-table-column :show-overflow-tooltip="true" fixed prop="icon" label="图标"> </el-table-column>
      <el-table-column :show-overflow-tooltip="true" fixed="right" label="操作" width="240">
        <template slot-scope="scope">
          <!-- <el-button
            @click="distributionNav(scope.row)"
            type="text"
            size="small"
            >分配导航栏</el-button
          >
          <el-button
            @click="distributionTool(scope.row)"
            type="text"
            size="small"
            >分配工具栏</el-button
          > -->
          <el-button @click="modify(scope.row)" type="text" size="small"
            >修改</el-button
          >
          <el-button type="text" size="small" @click="deleteDetails(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="this.handleSizeChange"
      @current-change="this.handleCurrentChange"
      :current-page="this.page"
      :page-sizes="[10, 15, 20, 50]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.total"
    >
    </el-pagination>
    <!-- 分配模块 -->
    <el-dialog
      title="分配模块"
      :visible.sync="distributionDialogVisible"
      width="30%"
      :before-close="distributionHandleClose"
    >
      <el-form
        :model="distributionRuleForm"
        :rules="distributionRules"
        ref="distributionRuleForm"
        label-width="100px"
        class="demo-distributionRuleForm"
      >
        <el-form-item label="选择模块：" prop="text">
          <el-cascader
            v-model="distributionRuleForm.modules"
            :options="options"
            @change="modelhandleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="distributionSubmitForm"
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
    ...mapState(["page", "pageSize"]),
  },
  data() {
    return {
      searchObj: {
        title: "",
        // region: "",
      },
      tableData: [],
      total: 0,
      options: null,
      //   分配导航栏模块
      distributionDialogVisible: false,
      distributionData: null,
      distributionRuleForm: {
        modules: "",
      },
      distributionId: null,
      modelName: null,
      distributionRules: {
        text: [
          { required: true, message: "请输入工具栏名称", trigger: "blur" },
        ],
      },
      modelhandleChangeList: null,
    };
  },
  async created() {
    //   console.log(await this.$api.getToolbarSubmenuById(18))
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.getModules();
      this.total = res.data.length;
      this.tableData = res.data;
      this.getModulesByPage()
    },
    modelhandleChange(value) {
      console.log(value);
      this.modelhandleChangeList = value;
    },
    // 查询
    onSubmit() {},
    // 重置
    onReset() {},
    // 添加
    modify(row) {
      this.$router.push({ name: "details", params: { id: row.id } });
    },
    // 分配导航模块
    async distributionNav(row) {
      console.log(row);
      const res2 = await this.$api.getNavigationalbars(0);
      this.options = res2.data;
      console.log(this.options)
      this.options = this.options.filter(ele=>{
          console.log(ele)
          return ele.navigationalbarSubmenus
      })
      this.options.forEach((ele) => {
        ele.label = ele.text;
        ele.value = ele.id;
        if (
          ele.navigationalbarSubmenus &&
          ele.navigationalbarSubmenus.length > 0
        ) {
          ele.children = ele.navigationalbarSubmenus;
          ele.children.forEach((item) => {
            item.label = item.text;
            item.value = item.id;
          });
        }
      });
      console.log(this.options);
      this.modelName = "nav";
      this.distributionId = row.id;
      this.distributionDialogVisible = true;
    },
    // 分配工具模块
    async distributionTool(row) {
      console.log(row);
      const res2 = await this.$api.getToolbarByUserid(0);
      this.options = res2.data;
      this.options = this.options.filter((ele) => {
        return ele.type == "siderbar";
      });
      this.options.forEach((ele) => {
        ele.label = ele.text;
        ele.value = ele.id;
      });
      console.log(this.options);
      this.modelName = "tool";
      this.distributionId = row.id;
      this.distributionDialogVisible = true;
    },
    // 分配模块的保存按钮
    async distributionSubmitForm() {
      if (this.modelName == "nav") {
        const res = await this.$api.navigationalbarSubmenuaddModule(
          this.distributionId,
          this.modelhandleChangeList[1]
        );
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
      } else if (this.modelName == "tool") {
        const res = await this.$api.toolbaraddModule(
          this.distributionId,
          this.modelhandleChangeList[0]
        );
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
      }
    },
    onAdd() {
      this.$router.push({ name: "details" });
    },
    // 删除
    async deleteDetails(row) {
      await this.$api.delModuleById(row.id);
      this.getData();
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("pageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("page", val);
    },
    // 根据分页查询
    async getModulesByPage() {
      const obj = {
        pageNum: this.page,
        pageSize: this.pageSize,
      };
      const res = await this.$api.getModulesByPage(obj);
      console.log(res);
      this.tableData = res.data;
    },
    distributionHandleClose() {
      this.distributionDialogVisible = false;
    },
  },
  watch: {
    page: function (page) {
      this.$store.commit("page", page);
      this.getModulesByPage();
    },
    pageSize: function (pageSize) {
      this.$store.commit("pageSize", pageSize);
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
.demo-distributionRuleForm {
  .el-form-item {
    display: flex;
    /deep/ .el-form-item__label {
      width: 140px !important;
    }
    /deep/ .el-form-item__content {
      width: 300px;
      margin-left: 0px !important;
    }
  }
}
</style>