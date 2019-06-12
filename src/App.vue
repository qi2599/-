<template>
  <div style="height: 100%">
    <router-view></router-view>
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
</style>
