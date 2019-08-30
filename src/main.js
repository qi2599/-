import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import myLoading from './plugin/loading'
import myToast from './plugin/toast'
import Goods_toast from './components/Goods_toast'
import myConfirm from './plugin/confirm'
import jcBanner from './plugin/jc-banner'
Vue.use(Goods_toast)
Vue.use(myLoading)
Vue.use(myToast)
Vue.use(myConfirm)
Vue.use(jcBanner)

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
