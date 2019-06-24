<template>
  <div style="width: 100%">
    <div id="car" @touchstart="head_bar">
      <div class="head" :class="{is_head: is_head_bar}">
        <div class="title">购物车</div>
        <div class="del" @touchend="del">删除</div>
      </div>
      <div class="goods_wrap" v-if="car_list.length">
        <Goods_car :info="info" :chack_item="chack_item" :set_total="set_total" v-for="(info, index) in car_list" :key="index"></Goods_car>
      </div>
      <div class="icon_car" v-else>
        <div class="iconfont icongouwuche"></div>
        <div class="text">购物车里没有商品哦~~~</div>
        <router-link to="/home">添加商品</router-link>
      </div>
      <Car_bar v-if="car_list.length" :chack_all="chack_all" :toggle_all="toggle_all" :total="total" :total_virtual="total_virtual" :all_qty="all_qty" :chack_id="chack_id" :car_list="car_list"></Car_bar>
    </div>
  </div>
</template>

<script>
  import Goods_car from '../../components/Goods_show/Goods_car.vue'
  import Car_bar from '../../components/Car_bar/Car_bar'
  import {queryCar, queryCarNum, queryDelCar} from  '../../api'
  import floatObj from '../../../static/js/floatObj.js'
  import loading from '../../plugin/loading/loading'
  export default {
    data(){
      return {
        is_head_bar: false,
        car_list: [],
        chack_all: false,
        total: 0,
        total_virtual: 0,
        all_qty: 0,
        chack_id: '',
        no_updata: false
      }
    },
    methods:{
      del(){
        if(this.chack_id){
          this.$vux.confirm.show({
            content: '确认删除选中商品吗？',
            onCancel : () => {
              return
            },
            onConfirm : () => {
              this.$myLoading.show('正在删除...')
              queryDelCar({custId: localStorage.app_uid,ids:this.chack_id}).then(()=>{
                this.$myLoading.hide()
                this.getCarNum()
                this.get_car_list()
              })
            }
          })
        }else {
          this.$myToast.show({text:'商品选择了咩?',time:2000})
        }
      },
      set_total(){
        this.total= 0
        this.all_qty= 0
        this.total_virtual=0
        this.chack_id= ''
        let chack_id= ''
        this.car_list.forEach(item => {
          if(item.isChack){
            this.all_qty += +item.qty
            this.total = floatObj.add(this.total, floatObj.multiply(item.wap_price,item.qty))
            chack_id += (item.ref_product_id+',')
            if (item.support_virtual === '2'){
              this.total_virtual = floatObj.add(this.total_virtual, floatObj.multiply(item.wap_price,item.qty))
            }
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
      getCarNum(){
        if(localStorage.isLogin){
          queryCarNum({custId: localStorage.app_uid}).then(res => {
            if (res.result.cartsum){
              this.$store.commit('setCarNum', {unm: res.result.cartsum})
            }else {
              this.$store.commit('setCarNum', {unm: ''})
            }
          })
        }
      },
      get_car_list(){
        if(!localStorage.isLogin){
          return
        }
        this.$myLoading.show('加载中...')
        queryCar({custId: localStorage.app_uid}).then(res => {
          res.result.forEach(item=>{
            item.isChack=true
            item.qtyChanged=false
          })
          this.car_list = res.result
          this.$myLoading.hide()
          this.set_total()
          this.toggle_all()
        })
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
      Car_bar,
      loading
    },
    created() {
      window.scrollTo(0,0)
      this.get_car_list()
      this.getCarNum()
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
        color: @gray2;
        border: @gray2 1px solid;
        font-size: 1rem;
      }
    }
    .icon_car{
      .icongouwuche{
        font-size: 5rem;
        text-align: center;
        color: @gray3;
        margin-top: 120/@rem;
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
