<template>
  <div style="height: 100%">
    <transition>
      <router-view></router-view>
    </transition>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from './components/Tabbar/Tabbar'
export default {
  components: {
    Tabbar
  }
}
</script>

<style lang="less" scoped>
  .v-enter{
    opacity: 0;
    position: absolute;
    /*transform: translateX(100%);*/
  }
  
  .v-leave-to{
    opacity: 0;
    position: absolute;
    /*transform: translateX(-100%);*/
  }
  
  .v-enter-active,
  .v-leave-active{
    transition: all 0.5s ease;
  }
</style>
