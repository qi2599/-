<template>
  <div style="height: 100%">
  
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    methods:{
      ...mapActions(['getClass'])
    },
    mounted() {
      this.getClass()
      // this.$store.dispatch('getClass')
    }
  }
</script>

<style lang="less" scoped>
</style>
