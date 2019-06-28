import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../pages/Home/Home.vue'
// import Sort from '../pages/Sort/Sort.vue'
// import Car from '../pages/Car/Car.vue'
// import Me from '../pages/Me/Me.vue'
const Home = () => import('../pages/Home/Home.vue')
const Sort = () => import('../pages/Sort/Sort.vue')
const Car = () => import('../pages/Car/Car.vue')
const Me = () => import('../pages/Me/Me.vue')
import Search from '../pages/Search/Search.vue'
import Search_text from '../pages/Search_text/Search_text.vue'
import Login from '../pages/Login/Login'
import Resetpwd from '../pages/Login/Resetpwd'
import Pay from '../pages/Pay/Pay'
// import Order from '../pages/Order/Order'
const Order = () => import('../pages/Order/Order')
import Addr from '../pages/Me/Addr'
import Change_pwd from '../pages/Me/Change_pwd'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home, meta:{ keepAlive: true }},
    { path: '/sort', component: Sort, meta:{ keepAlive: true }},
    { path: '/car', component: Car},
    { path: '/me', component: Me},
    { path: '/search', name:'search', component: Search},
    { path: '/search_text', name:'search_text', component: Search_text },
    { path: '/login', name:'login', component: Login},
    { path: '/resetpwd', name:'resetpwd', component: Resetpwd},
    { path: '/pay', name:'pay', component: Pay},
    { path: '/order', name:'order', component: Order },
    { path: '/addr', name:'addr', component: Addr },
    { path: '/change_pwd', name:'change_pwd', component: Change_pwd },
  ]
})
