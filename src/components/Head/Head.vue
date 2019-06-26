<template>
  <div id="app_head">
    <div class="head">
      <div class="back iconfont iconarrow-left" @click="$router.go(-1)"></div>
      <div>{{text}}</div>
    </div>
    <div></div>
  </div>
</template>

<script>
  export default {
    props:{
      text: String
    }
  }
</script>

<style lang="less" scoped>
  #app_head{
    .head{
      position: fixed;
      width: 100%;
      top: 0;
      z-index: 2;
      color: white;
      height: 107/@rem;
      line-height: 107/@rem;
      background: @c1;
      text-align: center;
      letter-spacing: 1px;
      font-size: 1.2rem;
      .back{
        position: absolute;
        padding-left: 50/@rem;
        font-size: 1.5rem;
      }
    }
    :last-child{
      height: 107/@rem;
    }
  }
</style>
