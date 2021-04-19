<template>
  <div class="Addknowledge">
    <p>新增知识库</p>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动名称：">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="分类：">
        <el-cascader
          v-model="value"
          :options="options"
          @change="optionsChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="简要描述：">
        <div id="editor"></div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import E from "wangeditor";
export default {
  computed: {
    ...mapState(["editKContentByIdObj"]),
  },
  data() {
    return {
      form: {
        title: null,
        region: "",
        content: "",
      },
      options: [{ value: "zhinan", label: "指南" }],
      typeId: null,
      value: null,
    };
  },
  async created() {
    //   编辑按钮进来的
    if (this.editKContentByIdObj) {
      this.selectKType();
      this.typeId = this.editKContentByIdObj.typeId;
      console.log(this.editKContentByIdObj);
      this.form.title = this.editKContentByIdObj.title;
      const res = await this.$api.selectKTypeById(
        this.editKContentByIdObj.typeId
      );
      const parentId = res.data[0].parentId;
      this.value = [parentId, this.editKContentByIdObj.typeId];
      this.editor.txt.html(this.editKContentByIdObj.content);
    } else {
      this.selectKType();
    }
  },
  methods: {
    async onSubmit() {
      this.form.content = document.getElementsByClassName(
        "w-e-text"
      )[0].innerHTML; //获取富文本里面的内容
      let myres = null;
      if (!this.editKContentByIdObj) {
        const obj = {
          content: this.form.content,
          title: this.form.title,
          typeId: this.typeId,
          userid: sessionStorage.getItem("userid"),
        };
        myres = await this.$api.insertKContent(obj);
      } else {
        const obj = {
          content: this.form.content,
          title: this.form.title,
          typeId: this.typeId,
          userid: sessionStorage.getItem("userid"),
          id: this.editKContentByIdObj.id,
        };
        myres = await this.$api.updateKContent(obj);
      }

      if (myres.code == 200) {
        this.$message({
          message: "发布成功",
          type: "success",
        });
        setTimeout(() => {
          this.$router.push({ name: "PersonalCenter" });
        }, 1000);
      } else {
        this.$message.error("发布失败");
      }
    },
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
    optionsChange(value) {
      console.log(value[value.length - 1]);
      this.typeId = value[value.length - 1];
    },
    //将文件转为blob类型
    readFileAsBuffer(file) {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.readAsDataURL(file);
        reader.onload = function () {
          const base64File = reader.result.replace(
            /^data:\w+\/\w+;base64,/,
            ""
          );
          resolve(new window.OSS.Buffer(base64File, "base64"));
        };
      });
    },
  },
  mounted() {
    this.editor = new E("#editor");
    this.editor.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      "strikeThrough",
      "indent",
      "lineHeight",
      "foreColor",
      "backColor",
      "list",
      "justify",
      "emoticon",
      "image",
      "table",
      "undo",
      "redo",
    ];
    // this.editor.config.uploadImgServer = "/upload-img";
    this.editor.config.uploadImgShowBase64 = true; // 使用 base64 保存图片
    this.editor.config.customUploadImg = async function (
      resultFiles,
      insertImgFn
    ) {
      // resultFiles 是 input 中选中的文件列表
      // insertImgFn 是获取图片 url 后，插入到编辑器的方法
      console.log(resultFiles);
      var reader = new FileReader();
      reader.readAsDataURL(resultFiles[0]); //通过文件流将文件转换成Base64字符串
      reader.onloadend = function () {
        //将转换结果赋值给img标签
        // preview.src = reader.result;
        //输出结果
        console.log(reader.result);
        insertImgFn(reader.result);
      };
      //   file_re = await that.readFileAsBuffer(resultFiles[0]);
    };
    this.editor.create();
    this.editor.txt.html(this.content);
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

/deep/ #editor div {
  margin: 0;
}
/deep/ #editor {
  width: 840px;
}
/deep/ #editor .w-e-toolbar {
  z-index: 1 !important;
}
/deep/ #editor .w-e-text-container {
  z-index: 0 !important;
}
</style>