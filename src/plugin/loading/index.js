import vue from 'vue'
import loadingComponent from './loading'

// 返回一个 扩展实例构造器,
const vm = vue.extend(loadingComponent)

// 定义弹出组件的函数 接收商品id
function loading(id) {
  // 实例化一个 toast.vue
  const loading = new vm({
    el: document.createElement('div'),
    data() {
      return {
        showWrap:true,
        trans:false,
      }
    },
    methods:{
      toggle_show(){
        loading.trans = false
        // 等动画完成后关闭页面
        setTimeout(() => {
          loading.showWrap=false
        } ,200)
      }
    }
  })
  // 由于元素首次渲染还没有结束，延迟添加opcity: 1
  setTimeout(() => {
    loading.trans=true
  } ,20)
  
  // 把 实例化的 toast.vue 添加到 body 里
  document.body.appendChild(toastDom.$el)
  
}

// 注册为全局组件的函数
export default function(){
  // 将组件注册到 vue 的 原型链里去,
  // 这样就可以在所有 vue 的实例里面使用 this.$goods_toast()
  vue.prototype.$goods_toast = loading
}


