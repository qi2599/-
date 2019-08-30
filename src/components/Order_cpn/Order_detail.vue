<template>
	<div id="order_detail" :class="{show:details}" @touchmove.prevent>
    <div class="order_goods"  @touchmove.stop>
      <div class="clearfix"></div>
      <div class="goods_wrap" v-for="(info,index) in details" :key="index">
        <div class="img">
          <img :src="info.tab_image_url">
        </div>
        <div class="info">
          <div class="name">{{info.product_name}}</div>
          <div class="specification">{{info.specifications}} 产地：{{info.producing_area}}</div>
          <div class="footer">
            <div class="num">x{{info.sale_qty}} {{info.product_sale_unit}}，小计：<span>{{info.price_total}}元</span></div>
            <div class="price">￥{{info.product_sale_price}}</div>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
    <div class="cloce">
      <div class="iconfont_box" @click="cloce">
        <div class="iconfont iconguanbi"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
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
  left: 0;
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
    max-height: 83%;
    max-width: 780px;
    padding: 0 20/@rem;
    margin: 0 auto;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
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
    width: 100%;
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
