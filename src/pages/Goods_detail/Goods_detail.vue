<template>
	<div id="goods_detail">
    <img :src="img_url" class="img">
    <div class="head">
      <div class="price">￥{{info.wap_price}}元/{{info.unit}}</div>
      <div class="limit">{{info.buy_lower_limit}}{{info.unit}}起购，限购{{info.buy_upper_limit}}{{info.unit}}</div>
      <div class="sale">3个月销量：{{info.sales_volume}}</div>
    </div>
    <div class="table">
      <div class="t_head">{{info.product_name}}</div>
      <div class="t_body clearfix">
        <div>商品ID：</div>
        <div>{{info.id}}</div>
        <div>箱格：</div>
        <div>{{info.specifications}}</div>
        <div>保质期：</div>
        <div>{{info.quality_time}}</div>
        <div>生产日期：</div>
        <div>{{info.product_time}}</div>
        <div>建议零售：</div>
        <div>{{info.retail_price}}</div>
        <div>商品条码：</div>
        <div>{{info.bar_code}}</div>
      </div>
    </div>
    <Detail_bar></Detail_bar>
  </div>
</template>

<script>
  import Detail_bar from '../../components/Detail_bar/Detail_bar'
  import {queryDetail} from "../../api";
  export default {
    data(){
      return {
        info:{},
        img_url:''
      }
    },
    components:{
      Detail_bar
    },
    created() {
      queryDetail({id:this.$route.query.id}).then(res =>　{
        this.info=res.result
        this.img_url = res.result.mains[0].tab_image_url
      })
    }
  }
</script>

<style lang="less" scoped>
  #goods_detail{
    background: white;
    height: 100%;
    .img{
      width: 600/@rem;
      display: block;
      margin: 0 auto;
    }
    .head{
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 20/@rem;
      font-size: 0.9rem;
      .price{
        color: @c2;
        font-size: 1.3rem;
      }
    }
    .table{
      padding: 20/@rem;
      .t_head{
        line-height: 2rem;
        text-align: center;
        background: @c1;
        color: white;
        border-radius: 10/@rem 10/@rem 0 0;
      }
      .t_body{
        background: @gray2;
        line-height: 1.6rem;
        font-size: 0.9rem;
        padding-bottom: 0.4rem;
        border-radius: 0 0 10/@rem 10/@rem;
        div{
          float: left;
        }
        > :nth-child(2n-1){
          width: 22%;
          text-align: right;
          color: @gray5;
        }
        > :nth-child(2n){
          width: 30%;
        }
        > :nth-child(4n+2){
          width: 20%;
        }
      }
    }
  }
</style>
