<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
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
  #app{
    height: 100%;
  }
</style>
