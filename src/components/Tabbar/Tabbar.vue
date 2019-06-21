<template>
  <div class="tabbar-wrap vux-1px-t" :class="{barShow: isShow}">
    <div class="item" :class="{active: '/home' === $route.path}" @click="goTo('/home')">
      <div class="iconfont" :class="{iconhome: '/home' !== $route.path}"></div>
      <div class="iconfont" :class="{iconhome_active: '/home' === $route.path}"></div>
      <span>首页</span>
    </div>
    <div class="item" :class="{active: '/sort' === $route.path}" @click="goTo('/sort')">
      <div class="iconfont" :class="{iconsort: '/sort' !== $route.path}"></div>
      <div class="iconfont" :class="{iconsort_active: '/sort' === $route.path}"></div>
      <span>分类</span>
    </div>
    <div class="item car" :class="{active: '/car' === $route.path}" @click="goTo('/car')">
      <div class="iconfont" :class="{iconcar: '/car' !== $route.path}"></div>
      <div class="iconfont" :class="{iconcar_active: '/car' === $route.path}"></div>
      <span>购物车</span>
      <div class="icon" v-show="$store.state.cartsum"><div>{{$store.state.cartsum}}</div></div>
    </div>
    <div class="item" :class="{active: '/me' === $route.path}" @click="toMe('/me')">
      <div class="iconfont" :class="{iconpersonal: '/me' !== $route.path}"></div>
      <div class="iconfont" :class="{iconpersonal_active: '/me' === $route.path}"></div>
      <span>个人中心</span>
    </div>
  </div>
</template>

<script>
export default {
  data (){
    return {
      isShow: true
    }
  },
  methods: {
    goTo (path) {
      this.$router.push(path)
    },
    toMe (path) {
      this.$router.replace(path)
    }
  },
  watch:{
    $route(to){
      if(!(to.path=='/home' || to.path=='/sort' || to.path=='/car' || to.path=='/me')){
        this.isShow=false
      }else {
        this.isShow=true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tabbar-wrap{
  position: fixed;
  z-index: 2;
  bottom: -130/@rem;
  width: 100%;
  height: 122/@rem;
  box-sizing: border-box;
  padding: 5px 10px 10px;
  background: white;
  display: flex;
  color: @c1;
  transition: 0.3s bottom;
  .item{
    flex-grow: 1;
    margin: 0 auto;
    text-align: center;
    font-size: 0.8rem;
    div{
      font-size: 1.5rem;
      line-height: 2rem;
    }
    &.car{
      position: relative;
      .icon{
        position: absolute;
        background: @c2;
        top: 0;
        min-width: 31.34/@rem;
        right: 50/@rem;
        border-radius: 20/@rem;
        div{
          font-size: 0.7rem;
          line-height: 22/@rem;
          color: white;
          padding: 5/@rem;
          font-family: Helvetica;
        }
      }
    }
  }
  .active{
    color: @c3;
  }
}
  .barShow{
    bottom: 0;
  }
</style>
