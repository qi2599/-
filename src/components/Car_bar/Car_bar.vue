<template>
	<div id="car_bar">
    <div class="check"  @click="toggle_all">
      <div>全选</div>
      <CheckIcon :value="chack_all"></CheckIcon>
    </div>
    <div class="car_info">
      <p>合计：<span>￥{{total}}</span> 元</p>
      <p>可得积分：{{total_virtual}}</p>
    </div>
    <div class="buy_btn" @click="to_pay">结算({{all_qty}})</div>
  </div>
</template>

<script>
  import { CheckIcon } from 'vux'
  import {queryUpdata} from '../../api'
  export default {
    props:{
      car_list: Array,
      chack_id: String,
      chack_all: Boolean,
      toggle_all: Function,
      total: Number,
      all_qty: Number,
      total_virtual: Number
    },
    methods:{
      to_pay(){
        if (!this.chack_id){
          this.$myToast.show({text:'商品选择了咩?',time:2000})
          return
        }
        this.$store.commit('setToPay',{val:true})
        
        let flag=0
        let length=0
        this.$myLoading.show('加载中...')
        this.car_list.forEach(item =>{
          if(item.qtyChanged){
            length++
          }
        })
        if(!length){
          this.$myLoading.hide()
          this.$router.push({name:'pay',query:{ids:this.chack_id,total:this.total,total_virtual:this.total_virtual}})
          return
        }
        this.car_list.forEach(item =>{
          if(item.qtyChanged){
            queryUpdata({id:item.ref_product_id, custId:localStorage.app_uid, qty:item.qty, sendQty:2}).then(()=>{
              flag++
              if(flag === length){
                this.$myLoading.hide()
                this.$router.push({name:'pay',query:{ids:this.chack_id,total:this.total,total_virtual:this.total_virtual}})
              }
            })
          }
        })
      }
    },
    components:{
      CheckIcon
    }
  }
</script>

<style lang="less" scoped>
  #car_bar{
    position: fixed;
    bottom: 122/@rem;
    width: 100%;
    height: 100/@rem;
    line-height: 100/@rem;
    font-size: 0.9rem;
    background: @gray1;
    display: flex;
    justify-content: space-between;
    .check{
      padding-left: 30/@rem;
      width: 140/@rem;
      > :first-child{
        float: right;
      }
    }
    .car_info{
      padding-top: 10/@rem;
      line-height: 40/@rem;
      span{
        color: @c2;
        font-weight: bold;
        font-family: Helvetica;
      }
    }
    .buy_btn{
      width: 180/@rem;
      background: @c2;
      color: white;
      text-align: center;
      font-family: Helvetica;
      font-weight: bold;
    }
  }
</style>
