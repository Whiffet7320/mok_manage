<template>
  <div class="layout">
    <el-container v-if="this.isLogin == 'true'">
      <el-header><Header /></el-header>
      <el-container>
        <el-aside>
          <Aside />
        </el-aside>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
    <Login v-else />
  </div>
</template>

<script>
import Login from "../Login";
import Header from "../Header";
import Aside from "../Aside";
export default {
  data() {
    return {
      isLogin: false,
    };
  },
  created(){
      this.isLogin = sessionStorage.getItem("isLogin");
  },
  components: {
    Login,
    Header,
    Aside,
  },
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  height: 60px;
  padding: 0 !important;
}
.el-container {
  height: calc(100vh - 60px);
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  width: 200px !important;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>