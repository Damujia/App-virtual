import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import '@/style/index.less'
import 'vant/lib/icon/local.css';
import '@/util/rem.js'
import Vant from 'vant';
import 'vant/lib/index.css';
import api from './axios/api'
import { Notify } from 'vant';
import { Lazyload } from 'vant';

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // 获取令牌
  let dao = localStorage.getItem('addform')
  // 判断
  if (dao || to.path === '/login') {
    next()
  } else {
    next({ path: '/login' })
  }
})
Vue.prototype.$echarts = require('echarts')
Vue.prototype.$api = api
Vue.prototype.$ajax = axios
Vue.use(Lazyload, {
  lazyComponent: true,
});
Vue.use(Vant);
Vue.use(Notify);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
