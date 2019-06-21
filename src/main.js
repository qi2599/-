import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueScroller from 'vue-scroller'
import {ToastPlugin} from 'vux'
import  { LoadingPlugin } from 'vux'
import  { ConfirmPlugin } from 'vux'
import Goods_toast from './components/Goods_toast'
Vue.use(VueScroller )
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)
Vue.use(Goods_toast)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: c => c(App),
  router,
  store
})

Vue.directive('focus',{
  inserted: function (el){
    el.focus()
  }
})
