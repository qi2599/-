<template>
  <div id="car" @touchstart="head_bar">
    <div class="head" :class="{is_head: is_head_bar}">
      <div class="title">购物车</div>
      <div class="del">删除</div>
    </div>
    <div class="goods_wrap" v-if="car_list.length">
      <Goods_car :info="info" :chack_item="chack_item" v-for="(info, index) in car_list" :key="index"></Goods_car>
    </div>
    <div class="icon_car" v-else>
      <div class="iconfont icongouwuche"></div>
      <div class="text">购物车里没有商品哦~~~</div>
      <a href="javascript:;">添加商品</a>
    </div>
    <Car_bar v-if="car_list.length" :chack_all="chack_all" :toggle_all="toggle_all" :total="total" :all_qty="all_qty"></Car_bar>
  </div>
</template>

<script>
  import Goods_car from '../../components/Goods_show/Goods_car.vue'
  import Car_bar from '../../components/Car_bar/Car_bar'
  import {queryCar} from  '../../api'
  import floatObj from '../../../static/js/floatObj.js'
  export default {
    data(){
      return {
        is_head_bar: false,
        car_list: [],
        chack_all: false,
        total: 0,
        all_qty: 0,
        chack_id: ''
      }
    },
    methods:{
      set_total(){
        this.total= 0
        this.all_qty= 0
        this.chack_id= ''
        let chack_id= ''
        this.car_list.forEach(item => {
          if(item.isChack){
            this.total = floatObj.add(this.total, floatObj.multiply(item.wap_price,item.qty))
            this.all_qty += +item.qty
            chack_id += (item.ref_product_id+',')
          }
        })
        if (chack_id !== '') {
          chack_id = chack_id.substring(0, chack_id.lastIndexOf(','))
        }
        this.chack_id = chack_id
      },
      chack_item(){
        let flag = true
        this.car_list.forEach(item => {
          if(!item.isChack){
            flag=false
          }
        })
        if(flag){
          this.chack_all=true
        }else {
          this.chack_all=false
        }
        this.set_total()
      },
      toggle_all(){
        let flag = true
        this.car_list.forEach(item => {
          if(!item.isChack){
            flag=false
          }
        })
        if(flag){
          this.car_list.forEach(item =>{
            item.isChack=false
          })
          this.chack_all=false
        }else {
          this.car_list.forEach(item =>{
            item.isChack=true
          })
          this.chack_all=true
        }
        this.set_total()
      },
      head_bar(ev){
        if(this.car_list.length<=4){return}
        ev = ev || event
        let touch=ev.changedTouches[0]
        let startY=Math.floor(touch.clientY)
        let foo = ev=>{
          ev = ev || event
          let touch=ev.changedTouches[0]
          let nowY=Math.floor(touch.clientY)
          if(nowY-startY >= 0){
            this.is_head_bar=false
          } else {
            this.is_head_bar=true
          }
          ev.target.removeEventListener('touchend',foo)
        }
        ev.target.addEventListener('touchend',foo)
      }
    },
    components: {
      Goods_car,
      Car_bar
    },
    created() {
      window.scrollTo(0,0)
      this.$vux.loading.show({text: '加载中...'})
      queryCar({custId: localStorage.app_uid}).then(res => {
        res.result.forEach(item=>{
          item.isChack=false
        })
        this.car_list = res.result
        this.$vux.loading.hide()
        this.set_total()
      })
    }
  }
</script>

<style lang="less" scoped>
  #car{
    padding: 107/@rem 0 230/@rem;
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
