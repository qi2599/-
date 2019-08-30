<template>
	<div id="goods_pay">
    <div class="item my-1px-b" v-for="(info, index) in car_goods" :key="index">
      <div class="img">
        <img :src="info.tab_image_url">
      </div>
      <div class="info">
        <div class="name">{{info.product_name}}</div>
        <div class="specification">规格：{{info.specifications}}，保质期：{{info.quality_time}}</div>
        <div class="footer">
          <div class="num">X {{info.qty}}</div>
          <div class="price">￥{{info.wap_price}}/{{info.unit}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      car_goods: Array
    }
  }
</script>

<style lang="less" scoped>
  #goods_pay{
    width: 94%;
    padding: 10/@rem;
    margin: 10/@rem auto;
    background: white;
    border-radius: 10/@rem;
    .my-1px-b:last-child:after{
      opacity: 0;
    }
    .item{
      padding: 10/@rem 0;
      display: flex;
      justify-content: space-around;
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
            font-size: 1.4rem;
          }
          .num{
            float: right;
            font-size: 1.3rem;
            padding-right: 10/@rem;
          }
        }
      }
    }
  }
</style>
