import loadingComponent from './loading.vue'
let myLoading = null
export default {
  // 开发插件的 Vue 方法 install, 第一个参数为 Vue
  install(Vue) {
    if(!myLoading){
      let loading=Vue.extend(loadingComponent)
      myLoading = new loading({
        el: document.createElement('div'),
        // 如果需要可以引入router、store, 只能在 new 这里访问
      })
      document.body.appendChild(myLoading.$el)
    }
    let timeId1
    let timeId2
    let loadingMethods = {
      show(text) {
        clearInterval(timeId1)
        clearInterval(timeId2)
        myLoading.isShow = true
        myLoading.text = text
        setTimeout(()=>{
          myLoading.trans = true
        },20)
        timeId1=setTimeout(()=>{
          myLoading.text = '网络不稳定'
        },6000)
        timeId2 = setTimeout(()=>{
          this.hide()
        },8000)
      },
      hide(){
        clearInterval(timeId1)
        clearInterval(timeId2)
        myLoading.trans=false
        setTimeout(()=>{
          myLoading.text = '加载中...'
          myLoading.isShow = false
        },300)
      }
    }
    if(!Vue.prototype.$myLoading){
      Vue.prototype.$myLoading = loadingMethods
    }else {
      console.log('$myLoading 已被占用');
    }
  }
}
