<template>
  <div class="aside">
    <el-row>
      <el-col :span="24">
        <el-menu
          :default-active="default_active"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-menu-item index="1" :route="{ name: 'HomeMain' }">
            <i class="el-icon-menu"></i>
            <span slot="title">模块管理</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>工具栏管理</span>
            </template>
            <el-menu-item index="2-1" :route="{ name: 'ToolbarMain' }"
              >菜单管理</el-menu-item
            >
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航栏管理</span>
            </template>
            <el-menu-item index="3-1" :route="{ name: 'NavbarMain' }"
              >菜单管理</el-menu-item
            >
            <!-- <el-menu-item index="3-2">子菜单管理</el-menu-item> -->
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>图层管理</span>
            </template>
            <el-menu-item
              index="4-1"
              :route="{ name: 'AttributeDisplayLayerMain' }"
              >属性显示图层</el-menu-item
            >
            <el-menu-item
              index="4-2"
              :route="{ name: 'StatisticalAnalysisLayerMain' }"
              >统计分析图层</el-menu-item
            >
            <el-menu-item
              index="4-3"
              :route="{ name: 'ConflictAnalysisLayerMain' }"
              >冲突分析图层</el-menu-item
            >
            <!-- <el-menu-item index="3-2">子菜单管理</el-menu-item> -->
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      default_active: null,
    };
  },
  watch: {
    $route(to, from) {
      console.log(from.path); //从哪来
      console.log(to.path); //到哪去
      if (to.path == "/") {
        this.default_active = "1";
      } else if (to.path == "/toolbar/") {
        this.default_active = "2-1";
      } else if (to.path == "/navbar/") {
        this.default_active = "3-1";
      } else if (to.path == "/attributeDisplayLayer/") {
        this.default_active = "4-1";
      } else if (to.path == "/statisticalAnalysisLayer/") {
        this.default_active = "4-2";
      }else if (to.path == "/conflictAnalysisLayer/") {
        this.default_active = "4-3";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>