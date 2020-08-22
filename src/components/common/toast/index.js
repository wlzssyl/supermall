import Toast from './Toast'

const obj = {};

// obj.install = function(Vue) {
//   //1.创建组件构造器
//   const toastContrustor = Vue.extend(Toast);
//   //2.new一个刚创建的构造器
//   const toast = new toastContrustor();
//   //3.将创建的组件手动挂载到某个元素
//   toast.$mount(document.createElement('div'));
//   //4.toast.$el就是该div
//   const app = document.getElementById('app');
//   document.body.appendChild(toast.$el);
//   //5.给Vue原型ptototype设置该组件
//   Vue.prototype.$toast = Toast;
// }

export default obj