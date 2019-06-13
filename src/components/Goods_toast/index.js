import vue from 'vue'
import router from '../../router'
import {queryDetail} from "../../api"

import toastComponent from './Goods_toast'

// 返回一个 扩展实例构造器,
const ToastConstructor = vue.extend(toastComponent)

// 定义弹出组件的函数 接收商品id
function showToast(id) {
  
  // 实例化一个 toast.vue
  const toastDom = new ToastConstructor({
    el: document.createElement('div'),
    router,
    data() {
      return {
        id:id,
        info: '',
        img_url: {},
        showWrap:true,
        showContent:false
      }
    },
    methods:{
      toggle_show(){
        toastDom.showContent = false
        // 等动画完成后关闭页面
        setTimeout(() => {
          toastDom.showWrap=false
        } ,200)
      },
      add_car(){
        this.$vux.toast.show({
          text: '添加成功'
        })
      },
      to_car(){
        this.$router.replace('/car')
        toastDom.toggle_show()
      }
    }
  })
  queryDetail({id:toastDom.id}).then(res =>　{
    toastDom.info=res.result
    toastDom.img_url = res.result.mains[0].tab_image_url
  })
  
  // 把 实例化的 toast.vue 添加到 body 里
  document.body.appendChild(toastDom.$el)
  
  // 由于元素首次渲染还没有结束，延迟添加opcity: 1
  setTimeout(() => {
    toastDom.showContent=true
  } ,10)
}

// 注册为全局组件的函数
function registryToast() {
  // 将组件注册到 vue 的 原型链里去,
  // 这样就可以在所有 vue 的实例里面使用 this.$goods_toast()
  vue.prototype.$goods_toast = showToast
}

export default registryToast
