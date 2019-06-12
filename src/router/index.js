import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home/Home.vue'
import Sort from '../pages/Sort/Sort.vue'
import Car from '../pages/Car/Car.vue'
import Me from '../pages/Me/Me.vue'
import Search from '../pages/Search/Search.vue'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/sort', component: Sort },
    { path: '/car', component: Car },
    { path: '/me', component: Me },
    { path: '/search', name:'search', component: Search }
  ]
})
