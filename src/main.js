import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import toast from 'components/common/toast/index'

Vue.config.productionTip = false

Vue.use(toast);

Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})