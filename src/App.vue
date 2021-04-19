<template>
  <div id="app">
    <Layout />
    <!-- <Login /> -->
  </div>
</template>

<script>
// import Login from "./components/Login";
import Layout from "./components/Layout";
export default {
  name: "App",
  components: {
    // Login,
    Layout,
  },
  mounted() {
    const oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src = "https://gosspublic.alicdn.com/aliyun-oss-sdk-4.4.4.min.js";
    document.body.appendChild(oScript);
  },
};
</script>

<style>
@import "./assets/reset.css";
/* *{
  margin: 0;
  padding: 0;
} */
</style>
