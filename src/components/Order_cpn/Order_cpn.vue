<template>
	<div>
    <div class="order_wrap" v-for="(item,index) in orders" :key="index">
      <div class="head vux-1px-b">
        <span>订单({{item.bill_id}})</span>
        <span class="time">{{item.creat_time}}</span>
      </div>
      <div class="content" v-for="(info,indexs) in item.details" :key="indexs">
        <div class="img">
          <img :src="info.tab_image_url">
        </div>
        <div class="info">
          <div class="name">{{info.product_name}}</div>
          <div class="specification">{{info.specifications}} 产地：{{info.producing_area}}</div>
          <div class="footer">
            <div class="num">x{{info.sale_qty}}{{info.product_sale_unit}} 小计：{{info.total}}</div>
            <div class="price">￥{{info.product_sale_price}}</div>
          </div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="footer vux-1px-t clearfix">
        <div class="price">订单总金额：{{item.total_sale_price}}元 使用金币：{{item.use_coin}}</div>
        <div>{{item.bill_simple_status}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      orders:Array
    }
  }
</script>

<style lang="less" scoped>
.order_wrap{
  margin: 10/@rem;
  background: white;
  border-radius: 10/@rem;
  color: @gray6;
  .head{
    line-height: 60/@rem;
    span{
      padding: 0 20/@rem;
    }
    .time{
      float: right;
    }
  }
  .content{
    padding: 10/@rem 0;
    display: flex;
    .img{
      text-align: center;
      width: 220/@rem;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 160/@rem;
        height: 160/@rem;
      }
    }
    .info{
      width: 440/@rem;
      padding: 10/@rem 20/@rem;
      .name{
        line-height: 50/@rem;
        font-size: 1.1rem;
      }
      .specification{
        font-size: 0.8rem;
        color: @gray5;
        line-height: 50/@rem;
      }
      .footer{
        line-height: 70/@rem;
        color: @c2;
        .price{
        }
        .num{
          float: right;
          padding-right: 10/@rem;
        }
      }
    }
  }
  .footer{
    line-height: 60/@rem;
    div{
      padding: 0 20/@rem;
    }
    .price{
      float: right;
    }
  }
}
</style>
