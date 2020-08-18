import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle);

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
