<template>
  <el-tree
    :data="data"
    :props="defaultProps"
    @node-click="handleNodeClick"
  ></el-tree>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["page", "pageSize"]),
  },
  data() {
    return {
      data: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      typeId: null,
    };
  },
  created() {
    this.selectKType();
  },
  methods: {
    handleNodeClick(data) {
      if (this.$route.path != "/") {
        this.$router.push({ name: "home" });
      }
      // 根据分类查
      this.$store.commit("treeForTypeId", data.id);
    },
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
      this.data = newOp;
    },
  },
};
</script>