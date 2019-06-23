import toastComponent from './toast.vue'
let myToast = null
export default {
  // 开发插件的 Vue 方法 install, 第一个参数为 Vue
  install(Vue) {
    if(!myToast){
      let toast=Vue.extend(toastComponent)
      myToast = new toast({
        el: document.createElement('div'),
        // 如果需要可以引入router、store, 只能在 new 这里访问
      })
      document.body.appendChild(myToast.$el)
    }
    let toastMethods = {
      show({text,icon,time=1000}) {
        myToast.isShow = true
        myToast.icon = icon
        myToast.text = text
        setTimeout(()=>{
          myToast.trans = true
        },20)
        setTimeout(()=>{
          this.hide()
        },time)
      },
      hide(){
        myToast.trans=false
        setTimeout(()=>{
          myToast.isShow = false
        },300)
      }
    }
    if(!Vue.prototype.$myToast){
      Vue.prototype.$myToast = toastMethods
    }else {
      console.log('$myToast 已被占用');
    }
  }
}
