import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import antd from 'ant-design-vue';
import api from './request/api';

import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;
Vue.use(antd);
Vue.prototype.VUE_APP_BASE_URL = process.env.VUE_APP_BASE_URL;// 定义 BASE_URL
Vue.prototype.$api = api;// 定义 BASE_URL

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
