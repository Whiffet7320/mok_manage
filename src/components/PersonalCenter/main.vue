<template>
  <div class="personalCenter">
    <div class="myflex">
      <p>个人中心</p>
      <el-button @click="toHome" type="success">返回首页</el-button>
    </div>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="分类：">
        <el-cascader
          v-model="value"
          :options="options"
          @change="optionsChange"
          :props="{ checkStrictly: true }"
          clearable
        ></el-cascader>
      </el-form-item>
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
        <el-button type="danger" @click="add">新增</el-button>
      </el-form-item>
    </el-form>
    <span>你已发布的知识库：</span>
    <el-table class="myTable" :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="title" label="标题"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="Edit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button @click="deletesee(scope.row)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="this.handleSizeChange"
      @current-change="this.handleCurrentChange"
      :current-page="this.personalPage"
      :page-sizes="[10, 15, 20, 50]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["personalPage", "personalPageSize"]),
  },
  data() {
    return {
      searchObj: {
        title: "",
        region: "",
      },
      formInline: {
        user: "",
        region: "",
      },
      tableData: [],
      value: "",
      options: [],
      typeId: null,
      // 分页
      total: 0,
    };
  },
  created() {
    this.getData();
    this.selectKType();
  },
  methods: {
    async getData() {
      const obj = {
        typeId: this.typeId,
        userid: sessionStorage.getItem("userid"),
      };
      const res = await this.$api.selectKContent(
        obj,
        this.searchObj.title,
        this.personalPage,
        this.personalPageSize
      );
      this.tableData = res.data;
      this.total = res.total;
      console.log(res);
    },
    toHome() {
      this.$router.push({ name: "home" });
    },
    // 获取分类列表
    async selectKType() {
      const res = await this.$api.selectKType();
      console.log(res);
      const newOp = [...res.data];
      newOp.forEach((ele) => {
        ele.label = ele.typename;
        ele.value = ele.id;
        ele.children = ele.type;
        ele.type.forEach((item) => {
          item.label = item.typename;
          item.value = item.id;
        });
      });
      console.log(newOp);
      this.options = newOp;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("personalPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("personalPage", val);
    },
    // 搜素
    onSubmit() {
      this.getData();
    },
    // 新增
    add() {
      this.$store.commit("editKContentByIdObj", null);
      this.$router.push({ name: "AddKnowledge" });
    },
    // 重置
    onReset() {
      this.searchObj.title = "";
      this.typeId = null;
      this.value = "";
      this.getData();
    },
    optionsChange(value) {
      console.log(value[value.length - 1]);
      this.typeId = value[value.length - 1];
    },
    // 编辑
    Edit(row) {
      console.log(row);
      this.$store.commit("editKContentByIdObj", row);
      this.$router.push({ name: "AddKnowledge" });
    },
    // 删除
    async deletesee(row) {
      await this.$api.deleteKContent(row.id);
      this.getData();
    },
  },
  watch: {
    personalPage: function (page) {
      this.$store.commit("personalPage", page);
      this.getData();
    },
    personalPageSize: function (pageSize) {
      this.$store.commit("personalPageSize", pageSize);
      this.getData();
    },
  },
};
</script>

<style lang="scss" scoped>
.personalCenter {
  p {
    font-size: 36px;
    margin-bottom: 20px;
  }
  .myTable {
    margin-top: 10px;
  }
  .myflex {
    display: flex;
    align-items: center;
    button {
      margin-left: 20px;
      transform: translateY(-8px);
    }
  }
}
</style>