import vue from 'vue'
import router from '../../router'
import store from '../../store'
import {queryDetail} from "../../api"

import toastComponent from './Goods_toast'

// 返回一个 扩展实例构造器,
const ToastConstructor = vue.extend(toastComponent)

// 定义弹出组件的函数 接收商品id
function showToast(id,isCar=false) {
  // 实例化一个 toast.vue
  const toastDom = new ToastConstructor({
    el: document.createElement('div'),
    router,
    store,
    data() {
      return {
        id:id,
        info: '',
        img_url: '',
        showWrap:true,
        trans:false,
        boxout: false,
      }
    },
    methods:{
      toggle_show(){
        toastDom.trans = false
        toastDom.boxout = true
        // 等动画完成后关闭页面
        setTimeout(() => {
          toastDom.showWrap=false
        } ,200)
      },
      add_car(){
        if(isCar){
          this.$myToast.show({text:'已经加入购物了'})
          return;
        }
        let {info} = toastDom
        if(info.product_time == '无库存'){
          this.$myToast.show({text:'无库存，补货中'})
          return
        }
        if(localStorage.isLogin){
          this.$myLoading.show('正在添加...')
          let callback = ()=>{
            this.$myLoading.hide()
            this.$myToast.show({text:'添加成功',icon: 'success'})
          }
          this.$store.dispatch('addCar',{queryData:{id:info.id, qty:1, price:info.wap_price,custId:localStorage.app_uid},callback})
        }else {
          this.$myToast.show({text:'您还没有登录哦'})
        }
      },
      to_car(){
        this.$router.replace('/car')
        toastDom.toggle_show()
      }
    }
  })
  // 由于元素首次渲染还没有结束，延迟添加opcity: 1
  setTimeout(() => {
    toastDom.trans=true
  } ,20)
  
  queryDetail({id:toastDom.id}).then(res =>　{
    toastDom.info=res.result
    toastDom.img_url = res.result.mains[0].tab_image_url
  })
  
  // 把 实例化的 toast.vue 添加到 body 里
  document.body.appendChild(toastDom.$el)
  
}

// 注册为全局组件的函数
export default function(){
  // 将组件注册到 vue 的 原型链里去,
  // 这样就可以在所有 vue 的实例里面使用 this.$goods_toast()
  vue.prototype.$goods_toast = showToast
}


