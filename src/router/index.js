import Vue from 'vue'
import VueRouter from 'vue-router'
const Home=()=>import('../views/home/Home')
const Cart=()=>import('../views/cart/Cart')
const Cate=()=>import('../views/cate/Cate')
const Profile=()=>import('../views/profile/Profile')

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
//安装插件
Vue.use(VueRouter)
const routes=[
    {
      path:' ',
      redirect:'/home'
    },
    {
      path:'/home',
      component:Home
    },
    {
      path:'/cart',
      component:Cart
    },
    {
      path:'/cate',
      component:Cate
    },
    {
      path:'/profile',
      component:Profile
    }
    
]

//创建router
const router = new VueRouter({
  routes,
  mode:'history'
})

export default router