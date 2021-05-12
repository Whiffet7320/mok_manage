<template>
  <div class="main">
    <p>导航栏列表</p>
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

    <!-- <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="id" label="id"> </el-table-column>
      <el-table-column fixed prop="text" label="工具栏名称"> </el-table-column>
      <el-table-column fixed prop="modular" label="模块"> </el-table-column>
      <el-table-column fixed prop="icon" label="图标"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="modify(scope.row)" type="text" size="small"
            >修改</el-button
          >
          <el-button type="text" size="small" @click="deleteDetails(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table> -->
    <el-tree
      show-checkbox
      :data="data"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data.text }}</span>
        <span>
          <el-button
            v-if="data.children"
            type="text"
            size="mini"
            @click="() => addSubmenu(data)"
          >
            添加子菜单
          </el-button>
          <el-button
            v-if="data.model"
            type="text"
            size="mini"
            @click="() => addToolModel(data)"
          >
            添加模块
          </el-button>
          <el-button
            v-if="data.model"
            type="text"
            size="mini"
            @click="() => seeSubmenuModel(data)"
          >
            查看模块
          </el-button>
          <el-button type="text" size="mini" @click="() => append(data)">
            修改
          </el-button>
          <el-button type="text" size="mini" @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
    <!-- 修改 -->
    <el-dialog
      title="修改"
      :visible.sync="editDialogVisible"
      width="30%"
      :before-close="editHandleClose"
    >
      <el-form
        :model="editRuleForm"
        :rules="editRules"
        ref="editRuleForm"
        label-width="100px"
        class="demo-editRuleForm"
      >
        <el-form-item
          v-if="editRuleForm.isShow"
          label="是否添加模块："
          prop="type"
        >
          <el-select
            @change="setModule"
            v-model="editRuleForm.type"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="editRuleForm.type == '是'"
          label="模块名称："
          prop="modular"
        >
          <el-input v-model="editRuleForm.modular"></el-input>
        </el-form-item>
        <el-form-item label="图标：" prop="icon">
          <el-input v-model="editRuleForm.icon"></el-input>
        </el-form-item>
        <el-form-item label="导航栏名称：" prop="text">
          <el-input v-model="editRuleForm.text"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editSubmitForm('editRuleForm')"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 子菜单 -->
    <el-dialog
      title="修改"
      :visible.sync="SubmenuDialogVisible"
      width="30%"
      :before-close="SubmenuHandleClose"
    >
      <el-form
        :model="SubmenuRuleForm"
        :rules="SubmenuRules"
        ref="SubmenuRuleForm"
        label-width="100px"
        class="demo-SubmenuRuleForm"
      >
        <el-form-item label="工具栏名称：" prop="text">
          <el-input v-model="SubmenuRuleForm.text"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="SubmenuSubmitForm('SubmenuRuleForm')"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 查看模块 -->
    <el-dialog
      title="导航栏模块"
      :visible.sync="seeModelDialogVisible"
      width="50%"
      :before-close="seeModelHandleClose"
    >
      <el-table :data="seeModeltableData" style="width: 100%">
        <el-table-column
          :show-overflow-tooltip="true"
          fixed
          prop="id"
          label="id"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          fixed
          prop="text"
          label="导航栏名称"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          fixed
          prop="modular"
          label="模块"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          fixed
          prop="icon"
          label="图标"
        >
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 添加模块 -->
    <el-dialog
      title="添加模块"
      :visible.sync="addModelDialogVisible"
      width="50%"
      :before-close="addModelHandleClose"
    >
      <el-table :data="addModeltableData" border style="width: 100%">
        <el-table-column label="选择添加模块">
          <template slot-scope="scope">
            <!-- <input type="text" v-model="scope.row.checkedFather" /> -->
            <el-checkbox
              v-model="scope.row.mycheck"
              @change="check(scope)"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="id" label="id">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="text"
          label="工具栏名称"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="modular"
          label="模块"
        >
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="icon" label="图标">
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
        :total="this.addModelTotal"
      >
      </el-pagination>
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
    const data = [];
    return {
      searchObj: {
        title: "",
        // region: "",
      },
      tableData: [],
      total: 0,
      options: [
        { value: "是", label: "是" },
        { value: "否", label: "否" },
      ],
      data: JSON.parse(JSON.stringify(data)),
      editDialogVisible: false,
      editData: null,
      editRuleForm: {
        type: "",
        modular: "",
        icon: "",
        text: "",
        isShow: true,
      },
      editRules: {
        type: [{ required: true, message: "请选择", trigger: "change" }],
        activeicon: [
          { required: true, message: "请输入激活后的图标", trigger: "blur" },
        ],
        icon: [{ required: true, message: "请输入图标", trigger: "blur" }],
        modular: [{ required: true, message: "请输入模块", trigger: "blur" }],
        text: [
          { required: true, message: "请输入工具栏名称", trigger: "blur" },
        ],
      },
      //   子菜单
      SubmenuDialogVisible: false,
      SubmenuData: null,
      SubmenuRuleForm: {
        text: "",
      },
      SubmenuRules: {
        text: [
          { required: true, message: "请输入工具栏名称", trigger: "blur" },
        ],
      },
      //   查看模块
      seeModelDialogVisible: false,
      seeModeltableData: [],
      //   添加模块
      addModelDialogVisible: false,
      addModeltableData: [],
      addModelTotal: 0,
      addModelArr: [],
      toolbarId: null,
      modelState: null,
    };
  },
  async created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res2 = await this.$api.getModules();
      this.addModelTotal = res2.data.length;
      this.addModeltableData = res2.data;
      this.getModulesByPage();
      const res = await this.$api.getNavigationalbars(0);
      //   this.total = res.data.length;
      this.data = res.data;
      console.log(res.data);
      this.data.forEach((ele) => {
        ele.disabled = true;
        if (ele.navigationalbarSubmenus) {
          ele.children = ele.navigationalbarSubmenus;
          //   console.log(ele.children)
          ele.children.forEach((item) => {
            item.model = true;
            item.disabled = true;
          });
        }
      });
    },
    setModule(e) {
      console.log(e);
      if (e == "否") {
        // this.editRuleForm.modular = null;
      }
    },
    // 修改按钮
    append(data) {
      this.editRuleForm.isShow = false;
      console.log(data);
      if (data.icon) {
        this.editDialogVisible = true;
        this.editData = data;
        this.editRuleForm = { ...this.editData };
        if (data.modular) {
          //   this.editRuleForm.type = "是";
          this.$set(this.editRuleForm, "type", "是");
        } else {
          //   this.editRuleForm.type = "否";
          this.$set(this.editRuleForm, "type", "否");
          this.editRuleForm.modular = null;
        }
        console.log(this.editRuleForm);
      } else {
        this.SubmenuDialogVisible = true;
        this.SubmenuData = data;
        this.SubmenuRuleForm = { ...this.SubmenuData };
        console.log(this.SubmenuRuleForm);
      }
    },
    // 删除
    async remove(node, data) {
      console.log(node, data);
      if (data.icon) {
        const res = await this.$api.delNavigationalbarByid(data.id);
        console.log(res);
        this.getData();
      } else {
        const res = await this.$api.delNavigationalbarSubmenuById(data.id);
        console.log(res);
        this.getData();
      }
    },
    // 添加模块
    addToolModel(data) {
      console.log(data);
      this.addModelArr = [];
      if (data.modules && data.modules.length > 0) {
        data.modules.forEach((ele) => {
          // console.log(ele)
          this.addModelArr.push(ele.id);
        });
      }
      this.toolbarId = data.id;
      console.log(this.addModelArr);
      this.addModeltableData.forEach((ele) => {
        if (this.addModelArr.indexOf(ele.id) > -1) {
          this.$set(ele, "mycheck", true);
        } else {
          this.$set(ele, "mycheck", false);
        }
      });
      this.addModelDialogVisible = true;
    },
    async check(scope) {
      console.log(scope.row.mycheck, this.toolbarId);
      if (scope.row.mycheck) {
        const res = await this.$api.navigationalbarSubmenuaddModule(
          scope.row.id,
          this.toolbarId
        );
        if (res.code == 200) {
          this.$message({
            message: "保存成功",
            type: "success",
          });
          this.addModelArr.push(scope.row.id);
          this.getData();
        } else {
          this.$message.error("保存失败");
        }
      } else {
        const res = await this.$api.delModule(
          scope.row.id,
          this.toolbarId
        );
        console.log(res)
        if (res.code == 200) {
          this.$message({
            message: "保存成功",
            type: "success",
          });
          const index = this.addModelArr.indexOf(scope.row.id)
          this.addModelArr.splice(index,1);
          this.getData();
        } else {
          this.$message.error("保存失败");
        }
      }
    },
    // 查看模块
    seeSubmenuModel(data) {
      console.log(data.modules);
      this.seeModelDialogVisible = true;
      this.seeModeltableData = data.modules;
    },
    // 添加子菜单
    async addSubmenu(data) {
      this.SubmenuRuleForm.id = null;
      this.SubmenuRuleForm.text = null;
      this.SubmenuDialogVisible = true;
      console.log(data);
      this.SubmenuData = data;
      //   this.SubmenuRuleForm = { ...this.SubmenuData };
    },
    // 查询
    onSubmit() {},
    // 重置
    onReset() {},
    // 添加
    onAdd() {
      this.editDialogVisible = true;
      this.editData = null;
      this.editRuleForm = {};
      this.editRuleForm.isShow = true;
    },
    editHandleClose() {
      this.editDialogVisible = false;
    },
    SubmenuHandleClose() {
      this.SubmenuDialogVisible = false;
    },
    seeModelHandleClose() {
      this.seeModelDialogVisible = false;
    },
    addModelHandleClose() {
      this.addModelDialogVisible = false;
    },
    // 子菜单保存
    async SubmenuSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.SubmenuRuleForm.id) {
            const obj = {
              navigationalbarId: this.SubmenuRuleForm.toolbarId,
              text: this.SubmenuRuleForm.text,
              id: this.SubmenuRuleForm.id,
            };
            this.$api.updateNavigationalbarSubmenu(obj).then((res) => {
              console.log(res);
              if (res.code == 200) {
                this.$message({
                  message: "保存成功",
                  type: "success",
                });
                this.SubmenuDialogVisible = false;
                this.getData();
              } else {
                this.$message.error("保存失败");
              }
            });
          } else {
            const obj = {
              navigationalbarId: this.SubmenuData.id,
              text: this.SubmenuRuleForm.text,
            };
            this.$api.addNavigationalbarSubmenu(obj).then((res) => {
              console.log(res);
              if (res.code == 200) {
                this.$message({
                  message: "保存成功",
                  type: "success",
                });
                this.SubmenuDialogVisible = false;
                this.getData();
              } else {
                this.$message.error("保存失败");
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 添加/修改
    async editSubmitForm(formName) {
      console.log(this.editData);
      //   const that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.editData) {
            //   修改
            // const obj = { ...this.editData };
            console.log(this.editRuleForm);
            const obj = {
              modular: this.editRuleForm.modular,
              icon: this.editRuleForm.icon,
              text: this.editRuleForm.text,
              id: this.editRuleForm.id,
            };
            console.log(obj);
            this.$api
              .updateNavigationalbar(obj)
              .then((res) => {
                if (res.code == 200) {
                  this.$message({
                    message: "保存成功",
                    type: "success",
                  });
                  this.getData();
                } else {
                  this.$message.error("保存失败");
                }
              })
              .then(() => {
                this.editDialogVisible = false;
              });
          } else {
            //   新增
            const obj = { ...this.editRuleForm };
            obj.userid = 0;
            this.$api
              .addNavigationalbar(obj)
              .then((res) => {
                if (res.code == 200) {
                  this.$message({
                    message: "保存成功",
                    type: "success",
                  });
                  this.getData();
                } else {
                  this.$message.error("保存失败");
                }
              })
              .then(() => {
                this.editDialogVisible = false;
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
      this.addModeltableData = res.data;
      this.addModeltableData.forEach((ele) => {
        if (this.addModelArr.indexOf(ele.id) > -1) {
          this.$set(ele, "mycheck", true);
        } else {
          this.$set(ele, "mycheck", false);
        }
      });
      console.log(this.addModeltableData);
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
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.demo-editRuleForm,
.demo-SubmenuRuleForm {
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
/deep/ .el-tree-node {
  border-bottom: 1px solid #ccc !important;
}
</style>