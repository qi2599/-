<template>
	<div id="detail_bar" class="vux-1px-t">
    <div class="item">
      <div class="iconfont iconhome_active" @click="go_home"></div>
      <div>首页</div>
    </div>
    <div class="item">
      <div class="iconfont iconkefu"></div>
      <div>客服</div>
    </div>
    <div class="item">
      <div class="iconfont iconcar_active"></div>
      <div>购物车</div>
    </div>
    <div class="item" @touchend="goback">
      <div class="iconfont iconarrow-left"></div>
      <div>返回</div>
    </div>
    <div class="add_car">
      <div>加入购物车</div>
    </div>
  </div>
</template>

<script>
  export default {
    methods:{
      goback(){
        this.$router.go(-1)
      },
      go_home(){
        this.$router.push('/home')
      }
    },
  }
</script>

<style lang="less" scoped>
  #detail_bar{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100/@rem;
    display: flex;
    text-align: center;
    background: white;
    .item{
      flex-grow: 1;
      font-size: 0.8rem;
      line-height: 1.3rem;
      padding-top: 10/@rem;
      .iconfont{
        font-size: 1.2rem;
      }
      &:active{
        background: @gray5;
      }
    }
    .add_car{
      flex-grow: 2.5;
      background: @c2;
      color: white;
      line-height: 100/@rem;
    }
  }
</style>
