import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import api from './api/index';
import store from './store';


// router.beforeEach((to, from, next) => {
//   console.log(to)
//   // 如果有token 说明该用户已登陆
//   if (sessionStorage.getItem("isLogin")=='true') {
//     // 在已登陆的情况下访问登陆页会重定向到首页
//     next()
//   } else {
//     // 没有登陆则访问任何页面都重定向到登陆页
//   }
// });

Vue.prototype.$api = api

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  
}).$mount('#app')