import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import VueLazyload from 'vue-lazyload'

import toast from 'components/common/toast/index'

Vue.config.productionTip = false

Vue.use(toast);
Vue.use(VueLazyload,{
  loading: require('./assets/img/loading.gif')
});

Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
