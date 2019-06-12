import Vue from 'vue'
import App from './App'
import router from './router'
import VueScroller from 'vue-scroller'
import {ToastPlugin} from 'vux'
import  { LoadingPlugin } from 'vux'

Vue.use(VueScroller )
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: c => c(App),
  router
})

Vue.directive('focus',{
  inserted: function (el){
    el.focus()
  }
})
