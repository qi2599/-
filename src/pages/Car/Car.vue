<template>
  <div id="car" @touchstart="head_bar">
    <div class="head" :class="{is_head: is_head_bar}">
      <div class="title">购物车</div>
      <div class="del">删除</div>
    </div>
    <div class="goods_wrap" v-if="car_list.length">
      <Goods_car :info="info" v-for="(info, index) in car_list" :key="index"></Goods_car>
    </div>
    <div class="icon_car" v-else>
      <div class="iconfont icongouwuche"></div>
      <div class="text">购物车里没有商品哦~~~</div>
      <a href="javascript:;">添加商品</a>
    </div>
  </div>
</template>

<script>
  import Goods_car from '../../components/Goods_show/Goods_car.vue'
  import {queryCar} from  '../../api'
  export default {
    data(){
      return {
        is_head_bar: false,
        car_list: ''
      }
    },
    methods:{
      head_bar(ev){
        ev = ev || event
        let touch=ev.changedTouches[0]
        let startY=touch.clientY
        ev.target.addEventListener('touchmove', (ev) => {
          ev = ev || event
          let touch=ev.changedTouches[0]
          let nowY=touch.clientY
          if(nowY-startY > 0){
            this.is_head_bar=false
          } else {
            this.is_head_bar=true
          }
        })
      }
    },
    components: {
      Goods_car
    },
    created() {
      window.scrollTo(0,0)
      queryCar({custId: localStorage.app_uid}).then(res => {
        this.car_list = res.result
      })
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
    transition: top 0.2s;
    &.is_head{
      top: -107/@rem;
    }
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
    .icongouwuche{
      font-size: 5rem;
      text-align: center;
      color: @gray3;
      margin-top: 100/@rem;
    }
    .text{
      text-align: center;
      line-height: 6rem;
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
