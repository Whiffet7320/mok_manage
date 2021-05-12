<template>
  <div class="header">
    <div class="logo">
      <span class="title">空间工作底图系统</span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
  },
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
  },
};
</script>

<style scoped lang='scss'>
.header {
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  background-color: #545c64;
  .logo {
    position: absolute;
    left: 4%;
    .title {
      line-height: 60px;
      font-size: 30px;
      color: #fff;
    }
  }
}
</style>
