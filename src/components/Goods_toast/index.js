import router from '../../router'
import store from '../../store'
import {queryDetail} from "../../api"

import toastComponent from './Goods_toast'

export default {
  install(Vue) {
    // 返回一个 扩展实例构造器,
    const ToastConstructor = Vue.extend(toastComponent)
    // 实例化一个 toast.vue
    const toastDom = new ToastConstructor({
      el: document.createElement('div'),
      router,
      store,
    })
    // 把 实例化的 toast.vue 添加到 body 里
    document.body.appendChild(toastDom.$el)
    // 定义接口函数 接收商品id
    let showToast = function (id,isCar=false) {
      toastDom.isCar = isCar
      toastDom.trans=true
      toastDom.showWrap=true
      queryDetail({id}).then(res =>　{
        toastDom.info=res.result
        toastDom.img_url = res.result.mains[0].tab_image_url
      })
    }
    Vue.prototype.$goods_toast = showToast
  }
}


