import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueScroller from 'vue-scroller'
import { ConfirmPlugin } from 'vux'
import myLoading from './plugin/loading'
import myToast from './plugin/toast'
import Goods_toast from './components/Goods_toast'
import loading from './common/img/loadding.svg'
import VueLazyload from 'vue-lazyload'

Vue.use(VueScroller)
Vue.use(ConfirmPlugin)
Vue.use(Goods_toast)
Vue.use(myLoading)
Vue.use(myToast)

Vue.use(VueLazyload, {
  loading,
  preLoad:0,
  listenEvents:[]
})

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
