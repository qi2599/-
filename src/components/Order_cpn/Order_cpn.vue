<template>
	<div class="order">
    <div class="order_wrap" v-for="(item,index) in orders" :key="index" @click="$store.commit('setDetails',{val:item.details})">
      <div class="head vux-1px-b">
        <span>订单({{item.bill_id}})</span>
        <span class="time">{{item.creat_time}}</span>
      </div>
      <div class="content">
        <div class="qty_totail">共 {{item.qty_total}} 件</div>
        <img :src="info.tab_image_url" v-for="(info,indexs) in item.details.slice(0,3)" :key="indexs">
      </div>
      <div class="footer vux-1px-t clearfix">
        <div class="price">订单总金额：<span>{{item.total_sale_price}}</span> 元 使用金币：{{item.use_coin}}</div>
        <div class="status">{{item.bill_simple_status}}</div>
      </div>
    </div>
    <div class="btn" v-show="btnShow" @click="$emit('getOrders')">
      <XButton>加载更多</XButton>
    </div>
  </div>
</template>

<script>
  import { XButton } from 'vux'
  export default {
    props:{
      orders:Array,
      btnShow:Boolean
    },
    components:{
      XButton,
    }
  }
</script>

<style lang="less" scoped>
.order{
  .order_wrap{
    margin: 20/@rem 10/@rem;
    background: white;
    border-radius: 10/@rem;
    color: @gray6;
    overflow: hidden;
    .head{
      line-height: 60/@rem;
      color: @c1;
      span{
        padding: 0 20/@rem;
      }
      .time{
        float: right;
      }
    }
    .content{
      padding: 10/@rem;
      .qty_totail{
        float: right;
        padding-top: 70/@rem;
        line-height: 40/@rem;
        width: 157.5/@rem;
        text-align: center;
        color: @c3;
      }
      img{
        padding: 10/@rem;
        width: 157.5/@rem;
        height: 157.5/@rem;
      }
    }
    .footer{
      line-height: 60/@rem;
      div{
        padding: 0 20/@rem;
      }
      .price{
        float: right;
        span{
          color: @c3;
        }
      }
      .status{
        color: @c2;
      }
    }
  }
  .btn{
    margin: 20/@rem 10/@rem;
  }
}
</style>
