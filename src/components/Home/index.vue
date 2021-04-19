<template>
  <div class="home">
    <p>知识库总列表</p>
    <el-form :inline="true" :model="searchObj" class="demo-form-inline">
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
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="title" label="标题"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="see(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button v-if="userObj.status == 1" type="text" size="small" @click="deletesee(scope.row)"
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
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["page", "pageSize", "treeForTypeId","userObj"]),
  },
  data() {
    return {
      searchObj: {
        title: "",
        region: "",
      },
      tableData: [],
      total: 0,
      options: [{ value: "zhinan", label: "指南" }],
      typeId: null,
      value: null,
      optionTypeId: null,
    };
  },
  async created() {
    const res = await this.$api.selectUserByUserId(sessionStorage.getItem("userid"))
    this.$store.commit('userObj',res.data)
    this.getData();
    this.selectKType();
  },
  methods: {
    async getData() {
      this.typeId = this.treeForTypeId;
      if (this.typeId) {
        const res1 = await this.$api.selectKTypeById(this.typeId);
        if (res1.data[0].type == 1) {
          this.value = [this.typeId];
        } else {
          const parentId = res1.data[0].parentId;
          this.value = [parentId, this.typeId];
        }
      }

      const obj = {
        typeId: this.typeId,
      };
      const res = await this.$api.selectKContent(
        obj,
        this.searchObj.title,
        this.page,
        this.pageSize
      );
      this.tableData = res.data;
      this.total = res.total;
    },
    // 搜索
    onSubmit() {
      this.typeId = this.value[this.value.length - 1]
      this.$store.commit("treeForTypeId", this.typeId);
      this.getData()
    },
    optionsChange(value) {
      this.optionTypeId = value[value.length - 1];
    },
    // 重置
    onReset() {
      this.searchObj.title = "";
      this.typeId = null;
      this.value = null;
      this.optionTypeId = null;
      this.$store.commit("treeForTypeId", null);
      this.getData()
    },
    // 获取分类列表
    async selectKType() {
      const res = await this.$api.selectKType();
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
      this.options = newOp;
    },
    // 查看
    async see(row) {
      const res = await this.$api.selectKContentById(row.id);
      this.$store.commit("selectKContentByIdObj", res.data);
      this.$router.push({ name: "SeeContent" });
    },
    // 删除
    async deletesee(row) {
      await this.$api.deleteKContent(row.id);
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
  },
  watch: {
    page: function (page) {
      this.$store.commit("page", page);
      this.getData();
    },
    pageSize: function (pageSize) {
      this.$store.commit("pageSize", pageSize);
      this.getData();
    },
    treeForTypeId: function (treeForTypeId) {
      this.$store.commit("treeForTypeId", treeForTypeId);
      this.getData();
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