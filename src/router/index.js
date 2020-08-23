import Vue from 'vue'
import Router from 'vue-router'
//引入组件
const Home = ()=> import('views/home/Home')
const Category = ()=> import('views/category/Category')
const Cart = ()=> import('views/cart/Cart')
const Profile = ()=>import ('views/profile/Profile')
const Details = ()=>import ('views/details/Details')

/**解决重复路由的报错，即重复点*************************/
const originalPush = Router.prototype.push
Router.prototype.replace = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
/********************************************************/

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path:'',
      redirect:'/home'
    },
    {
      path:'/home',
      component:Home,
      meta:{
        title:'首页' // 页面标题
      }
    },
    {
      path:'/category',
      component:Category,
      meta:{
        title:'分类'
      }
    },
    {
      path:'/cart',
      component:Cart,
      meta:{
        title:'购物车'
      }
    },
    {
      path:'/profile',
      component:Profile,
      meta:{
        title:'我的主页'
      }
    },
    {
      path:'/details/:iid',
      component:Details,
      meta:{
        title:'商品详情'
      }
    }
  ],
  mode:'history'
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

//导出路由
export default router
