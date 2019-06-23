import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueScroller from 'vue-scroller'
import { ConfirmPlugin } from 'vux'
import myLoading from './plugin/loading'
import myToast from './plugin/toast'
import Goods_toast from './components/Goods_toast'
Vue.use(VueScroller )
Vue.use(ConfirmPlugin)
Vue.use(Goods_toast)
Vue.use(myLoading)
Vue.use(myToast)

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
