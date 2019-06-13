<template>
  <div id="car">
    <div class="head">
      <div class="title">购物车</div>
      <div class="del">删除</div>
    </div>
    <div class="icon_car">
      <div class="iconfont icongouwuche"></div>
      <div class="text">购物车里没有商品哦~~~</div>
      <a href="javascript:;">添加商品</a>
    </div>
    <Goods_car></Goods_car>
    <Goods_car></Goods_car>
    <Goods_car></Goods_car>
    <Goods_car></Goods_car>
    <Goods_car></Goods_car>
    <Goods_car></Goods_car>
    <Goods_car></Goods_car>
    <Goods_car></Goods_car>
    <Goods_car></Goods_car>
  </div>
</template>

<script>
  import Goods_car from '../../components/Goods_show/Goods_car.vue'
  export default {
    components: {
      Goods_car
    },
    created() {
      window.scrollTo(0,0)
    }
  }
</script>

<style lang="less" scoped>
#car{
  padding: 107/@rem 0 122/@rem;
  .head{
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2;
    height: 107/@rem;
    line-height: 107/@rem;
    font-size: 1.2rem;
    text-align: center;
    background: @c1;
    color: white;
    .del{
      position: absolute;
      right: 40/@rem;
      top: 0;
      margin: 30/@rem 0;
      padding: 0 40/@rem;
      height: 47/@rem;
      line-height: 47/@rem;
      border-radius: 30/@rem;
      background: @gray5;
      color: white;
      font-size: 1rem;
    }
  }
  .icon_car{
    display: none;
    .icongouwuche{
      font-size: 5rem;
      text-align: center;
      color: @gray3;
      margin-top: 100/@rem;
    }
    .text{
      text-align: center;
      line-height: 3rem;
      color: @gray5;
    }
    a{
      display: block;
      width: 200/@rem;
      height: 60/@rem;
      line-height: 60/@rem;
      margin: 0 auto;
      text-align: center;
      color: @c1;
      border-radius: 10/@rem;
      border: 1px solid @c1;
    }
  }
}
</style>
