<template>
	<div id="order_detail" :class="{show:details}" @touchstart.prevent="">
    <div class="order_goods">
      <scroller>
        <div class="clearfix"></div>
        <div class="goods_wrap" v-for="(info,index) in details" :key="index">
          <div class="img">
            <img :src="info.tab_image_url">
          </div>
          <div class="info">
            <div class="name">{{info.product_name}}</div>
            <div class="specification">{{info.specifications}} 产地：{{info.producing_area}}</div>
            <div class="footer">
              <div class="num"><span>x{{info.sale_qty}}</span> {{info.product_sale_unit}}，小计：<span>{{info.price_total}}元</span></div>
              <div class="price">￥{{info.product_sale_price}}</div>
            </div>
          </div>
          <div class="clear"></div>
        </div>
      </scroller>
    </div>
    <div class="cloce" @click="cloce">
      <div class="iconfont_box">
        <div class="iconfont iconguanbi"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        isShow: false
      }
    },
    computed:{
      details(){
        return this.$store.state.details
      }
    },
    methods:{
      cloce(){
        this.$store.commit('setDetails','')
      }
    }
  }
</script>

<style lang="less" scoped>
#order_detail{
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0,0,0,0);
  transform: scaleY(0);
  transition: background-color 0.2s, transform 0.2s;
  &.show{
    background-color: rgba(0,0,0,0.8);
    transform: scaleY(1);
  }
  .order_goods{
    position: absolute;
    top: 0/@rem;
    bottom: 170/@rem;
    left: 20/@rem;
    right: 20/@rem;
    margin: auto;
    .goods_wrap{
      padding: 10/@rem 0;
      margin: 20/@rem 0;
      border-radius: 10/@rem;
      background-color: white;
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
        padding: 10/@rem;
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
          .num{
            float: right;
            span{
              color: @c3;
            }
          }
        }
      }
    }
  }
  .cloce{
    position: absolute;
    bottom: 60/@rem;
    right: 225/@rem;
    width: 300/@rem;
    text-align: center;
    line-height: 50/@rem;
    font-size: 0.9rem;
    color: @c4;
    .iconfont_box{
      width: 100/@rem;
      height: 100/@rem;
      border-radius: 50/@rem;
      background: @gray7;
      margin: 0 auto;
      transition: 0.1s;
      &:active {
        background: @gray10;
        transform: scale(1.5);
      }
      .iconfont{
        line-height: 100/@rem;
        text-align: center;
        font-size: 1.2rem;
      }
      .iconaddcart{
        font-size: 1.9rem;
      }
    }
  }
}
</style>
