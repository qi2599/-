<template>
  <div id="goods_toast" v-if="showWrap" :class="showContent?'fadein':'fadeout'" @touchstart.prevent="">
      <div class="content">
        <div class="img">
          <img :src="img_url">
        </div>
        <div class="head clearfix">
          <div v-show="info">
            <div class="price">￥{{info.wap_price}}元/{{info.unit}}</div>
            <div class="name ellipsis">{{info.product_name}}</div>
          </div>
        </div>
        <div class="th">
          <div v-show="info">
            {{info.buy_lower_limit}}{{info.unit}}起购，限购{{info.buy_upper_limit}}{{info.unit}}，3个月销量：{{info.sales_volume}}
          </div>
        </div>
        <div class="tbody clearfix">
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
      <div class="button clearfix">
        <div class="close" @click="toggle_show">
          <div class="iconfont_box">
            <div class="iconfont iconguanbi"></div>
          </div>
          <div>关闭</div>
        </div>
        <div class="to_car" @click="to_car">
          <div class="iconfont_box">
            <div class="iconfont iconcar_active"></div>
          </div>
          <div>前往购物车</div>
        </div>
        <div class="add_car" @click="add_car">
          <div class="iconfont_box">
            <div class="iconfont iconaddcart"></div>
          </div>
          <div>添加至购物车</div>
        </div>
      </div>
    </div>
</template>

<script>
</script>

<style lang="less" scoped>
  #goods_toast{
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    z-index: 2;
    background: rgba(0,0,0,0.9);
    opacity: 0;
    transform: scale(0.3);
    transition: all 0.2s;
    .content{
      width: 650/@rem;
      height: 832/@rem;
      background: white;
      border-radius: 50/@rem;
      margin: 50/@rem auto;
      .img{
        width: 570/@rem;
        height: 570/@rem;
        padding: 10/@rem 40/@rem 0;
        img{
          width: 100%;
        }
      }
      .head{
        color: @c2;
        height: 50/@rem;
        line-height: 50/@rem;
        font-size: 1.2rem;
        .price{
          width: 30%;
          float: left;
          text-align: center;
        }
        .name{
          width: 70%;
          float: right;
          text-align: center;
        }
      }
      .th{
        background: @gray6;
        text-align: center;
        color: white;
        height: 50/@rem;
        line-height: 50/@rem;
        font-size: 0.8rem;
      }
      .tbody{
        height: 132/@rem;
        padding: 15/@rem 10/@rem;
        background: @c1;
        color: white;
        line-height: 1.5rem;
        border-radius: 0 0 50/@rem 50/@rem;
        div{
          float: left;
          font-size: 0.85rem;
        }
        > :nth-child(odd){
          width: 23%;
          text-align: right;
          color: @gray4;
        }
        > :nth-child(even){
          width: 30%;
          height: 45/@rem;
        }
        > :nth-child(4n+2){
          width: 20%;
        }
      }
    }
    .button{
      padding: 0 50/@rem;
      .close, .to_car, .add_car{
        width: 216.6/@rem;
        text-align: center;
        line-height: 2.5rem;
        font-size: 0.9rem;
        color: @c4;
        float: left;
      }
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
  #goods_toast.fadein {
    opacity: 1;
    transform: scale(1);
  }
  #goods_toast.fadeout {
    opacity: 0;
    transform: scale(0.3);
  }
</style>
