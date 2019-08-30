window.onload = function(){
  // 解决点击延时
  if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);
    }, false);
  }
  // 滑动窗口input失去焦点
  set_blur()
  function set_blur() {
    let inp = document.getElementsByTagName("input")
    // 获取到的 inp 是动态的，当 DOM 中新增了 input 标签，这里的 inp 会自动更新
    window.addEventListener('touchstart', function(){
      for (let i=0,lenght=inp.length; i<lenght; i++){
        inp[i].blur()
      }
    })
  }
}
window.onresize = htmlFont()
function htmlFont(){
  let w, styleNode, mobileReg = /iPhone|iPad|iPod|Android|UCWEB|huawei|xiaomi|oppo|vivo|meizu|Samsung|mobile/i
  resetFont()
  return resetFont
  function resetFont(){
    styleNode = document.querySelector('#html-font')
    if(mobileReg.test(navigator.userAgent)){
      w = (document.documentElement.clientWidth || document.body.clientWidth)/25
      if(styleNode){
        styleNode.innerHTML = "html{font-size:"+w+"px;}"
      }else{
        styleNode = document.createElement('style')
        styleNode.innerHTML = "html{font-size:"+w+"px;}"
        styleNode.id = 'html-font'
        document.head.appendChild(styleNode)
      }
    }else if(styleNode) styleNode.innerHTML = ""
  }
}

// 图片懒加载
window.$lazyloadFn = function (el) {
  if(el === undefined) return
  let index = 0
  let scrolly = el.scrollTop || el.pageYOffset || 0
  let oldScroll = 0
  let timeId
  el.addEventListener('scroll',lazyload)
  forFn()
  function lazyload(){
    scrolly = el.scrollTop || el.pageYOffset || 0
    if(scrolly < oldScroll && scrolly > 5) return
    if(scrolly - oldScroll > 300) forFn()
    clearInterval(timeId)
    timeId = setTimeout(forFn,200)
  }
  function forFn() {
    let imgs = document.querySelectorAll('[data-src]')
    if(imgs.length === 0){
      el.removeEventListener('scroll',lazyload)
      return
    }
    if(scrolly > oldScroll) oldScroll = scrolly
    if(index === imgs.length) el.removeEventListener('scroll',lazyload)
    if(el === window){
      for (let i=index,length=imgs.length; i<length; i++){
        if(imgs[i].getBoundingClientRect().top-window.innerHeight<0){
          imgs[i].src = imgs[i].getAttribute("data-src")
          index++
        }else break
      }
    }else {
      for (let i=index,length=imgs.length; i<length; i++){
        if(imgs[i].offsetTop <= el.clientHeight + el.scrollTop){
          imgs[i].src = imgs[i].getAttribute("data-src")
          index++
        }else break
      }
    }
  }
}

if(!window.Promise) {
  document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
}
