<template>
	<div class="goods_car">
    <div class="check" @click="check_icon=!check_icon">
      <CheckIcon :value="check_icon"></CheckIcon>
    </div>
    <div class="img">
      <img :src="info.tab_image_url">
      <div v-if="info.store_amount <= 0" class="mask">补货中</div>
    </div>
    <div class="goods_info">
      <div class="name">
        <div v-if="info.support_virtual === '2'" class="att">积分</div>
        <span class="ellipsis">{{info.product_name}}</span>
      </div>
      <div class="norm"><div>建议零售:{{info.retail_price}} 规格: {{info.specifications}}</div></div>
      <div class="footer">
        <div class="price">￥{{info.wap_price}}/{{info.unit}}</div>
        <x-number fillable ></x-number>
      </div>
    </div>
  </div>
</template>

<script>
  import { XNumber, CheckIcon } from 'vux'
  
  export default {
    data(){
      return {
        check_icon: true
      }
    },
    props:{
      info: Object
    },
    components: {
      XNumber,
      CheckIcon
    }
  }
</script>

<style lang="less" scoped>
  .goods_car{
    background: white;
    width: 700/@rem;
    height: 200/@rem;
    margin: 10/@rem auto;
    padding: 10/@rem;
    border-radius: 10/@rem;
    .check{
      width: 64.4/@rem;
      float: left;
      padding: 77/@rem 0;
    }
    .img{
      position: relative;
      height: 200/@rem;
      width: 200/@rem;
      float: left;
      margin-right: 10/@rem;
      img{
        width: 100%;
      }
      .mask{
        position: absolute;
        bottom: 0;
        width: 200/@rem;
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        color: white;
        background: rgba(0,0,0,0.5);
      }
    }
    .goods_info{
      float: left;
      width: 425.6/@rem;
      .name{
        padding-top: 20/@rem;
        .att{
          float: left;
          font-size: 0.7rem;
          line-height: 1rem;
          padding: 0 3/@rem;
          background: @c2;
          color: white;
          border-radius: 3/@rem;
          margin-right: 10/@rem;
        }
        span{
          display: block;
        }
      }
      .norm{
        font-size: 0.8rem;
        line-height: 30/@rem;
        color: @gray5;
        position: relative;
        height: 90/@rem;
        div{
          position: absolute;
          top: 20/@rem;
          margin: auto;
        }
      }
      .footer{
        position: relative;
        .price{
          float: left;
          color: @c2;
          font-size: 1.2rem;
          line-height: 56/@rem;
        }
        .weui-cell{
          padding: 0;
          &:before{
            border: none;
          }
        }
      }
    }
  }
</style>
