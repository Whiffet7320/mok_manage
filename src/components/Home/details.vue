<template>
  <div class="details">
    <p>新增模块</p>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="图标：" prop="icon">
        <el-input v-model="ruleForm.icon"></el-input>
      </el-form-item>
      <el-form-item label="模块：" prop="modular">
        <el-input v-model="ruleForm.modular"></el-input>
      </el-form-item>
      <el-form-item label="工具栏名称：" prop="text">
        <el-input v-model="ruleForm.text"></el-input>
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
export default {
  data() {
    return {
      ruleForm: {
        icon: "",
        modular: "",
        text: "",
      },
      id: null,
      rules: {
        icon: [{ required: true, message: "请输入图标", trigger: "blur" }],
        modular: [{ required: true, message: "请输入模块", trigger: "blur" }],
        text: [
          { required: true, message: "请输入工具栏名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.id) {
            // 修改
            const obj = {
              icon: this.ruleForm.icon,
              modular: this.ruleForm.modular,
              text: this.ruleForm.text,
              id: this.id,
            };
            this.$api.updateModule(obj).then((res) => {
              console.log(res);
              if (res.code == 200) {
                this.$message({
                  message: "保存成功",
                  type: "success",
                });
              } else {
                this.$message.error("保存失败");
              }
              setTimeout(() => {
                this.$router.push({ name: "HomeMain" });
              }, 500);
            });
          } else {
            // 新增
            const obj = {
              icon: this.ruleForm.icon,
              modular: this.ruleForm.modular,
              text: this.ruleForm.text,
            };
            this.$api.addModule(obj).then((res) => {
              if (res.code == 200) {
                this.$message({
                  message: "保存成功",
                  type: "success",
                });
              } else {
                this.$message.error("保存失败");
              }
              setTimeout(() => {
                this.$router.push({ name: "HomeMain" });
              }, 500);
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  async created() {
    this.id = this.$route.params.id;
    if (this.id) {
      const res = await this.$api.getModuleById(this.id);
      console.log(res);
      this.ruleForm = res.data;
    }
  },
};
</script>

<style lang="scss" scoped>
p {
  font-size: 36px;
  margin-bottom: 30px;
}
.el-form-item {
  display: flex;
  /deep/ .el-form-item__label {
    width: 110px !important;
  }
  /deep/ .el-form-item__content {
    width: 300px;
    margin-left: 0px !important;
  }
}
</style>