<template>
  <div class="detail">
    <p>添加统计分析图层</p>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="区域表" prop="region">
        <el-select
          v-if="!this.StatisticalAnalysisLayerObj"
          v-model="ruleForm.region"
          @change="changeClick"
          placeholder="请选择活动区域"
        >
          <el-option
            label="基本农田保护图斑"
            value="GCS330300G100202_JBNTBHTB_2017"
          ></el-option>
          <el-option
            label="基本农田保护地块"
            value="GCS330300G100202_JBNTBHPK_2017"
          ></el-option>
        </el-select>
        <el-input
          v-else
          :disabled="true"
          v-model="this.StatisticalAnalysisLayerObj.layerName"
        ></el-input>
      </el-form-item>
      <el-form-item label="表" prop="tableData">
        <el-table :data="ruleForm.tableData" style="width: 100%">
          <el-table-column prop="name" label="字段名称"> </el-table-column>
          <el-table-column prop="remarks" label="别名（对应注释）">
            <template scope="scope">
              <div class="input-box">
                <el-input
                  size="small"
                  v-model="scope.row.remarks"
                  @keyup.enter.native="editEnter(scope.row)"
                ></el-input>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["StatisticalAnalysisLayerObj"]),
  },
  data() {
    return {
      propertyShowLayerId: null,
      id: null,
      ruleForm: {
        region: "",
        tableData: [],
      },
      rules: {
        region: [
          { required: true, message: "请选择区域表", trigger: "change" },
        ],
      },
    };
  },
  async created() {
    if (this.StatisticalAnalysisLayerObj) {
      const res = await this.$api.getTableInformationByTableName(
        this.StatisticalAnalysisLayerObj.layerid
      );  
      console.log(res);
      this.ruleForm.tableData = res.data;
    }
    console.log(this.StatisticalAnalysisLayerObj);
    this.getData();
  },
  methods: {
    async getData() {
      if (this.propertyShowLayerId) {
        const res2 = await this.$api.getTableInformationByTableName(
          this.propertyShowLayerId
        );
        this.ruleForm.tableData = res2.data;
      }
      const res = await this.$api.selectStatisticalAnalysisLayers(
        this.StatisticalAnalysisLayerObj.layerName
      );
      this.id = res.data[0].id;
      console.log(res.data[0])
      this.ruleForm.tableData.forEach((ele) => {
        res.data[0].PropertyShowLayerField.forEach((item) => {
          if (ele.name == item.field) {
            ele.remarks = item.alias;
            ele.mycheck = item.isShow;
          }
        });
      });
    },
    async changeClick(val) {
      console.log(val);
      const res = await this.$api.getTableInformationByTableName(val);
      console.log(res);
      this.getData();
      this.ruleForm.tableData = res.data;
    },
    //   保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async editEnter(row) {
      console.log(row);
      const obj = {
        alias: row.remarks,
        field: row.name,
        statisticalAnalysisLayerId: this.id,
      };
      const res = await this.$api.insertStatisticalAnalysisLayerField(obj);
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: "保存成功",
          type: "success",
        });
        this.getData();
      } else {
        this.$message.error("保存失败");
      }
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