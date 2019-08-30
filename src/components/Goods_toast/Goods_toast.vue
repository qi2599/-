<template>
  <div id="goods_toast" v-show="showWrap" :class="trans?'maskin':'maskout'" @touchmove.prevent>
    <div class="box" :class="{boxin: trans, boxout: boxout}">
      <div class="content">
        <div class="img">
          <img :src="img_url" v-if="img_url">
          <div v-else class="svg_wrap">
            <img src="../../common/img/loadding.svg">
          </div>
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        info: '',
        img_url: '',
        showWrap:false,
        trans:false,
        boxout: false,
        isCar: false
      }
    },
    methods:{
      toggle_show(){
        this.trans = false
        this.boxout = true
        this.info = ''
        this.img_url = ''
        // 等动画完成后关闭页面
        setTimeout(() => {
          this.showWrap=false
          this.boxout = false
        } ,300)
      },
      add_car(){
        if(this.isCar){
          this.$myToast.show({text:'已经加入购物了',time:2000})
          return;
        }
        let {info} = this
        if(info.product_time == '无库存'){
          this.$myToast.show({text:'无库存，补货中',time:2000})
          return
        }
        if(localStorage.isLogin){
          this.$myLoading.show('正在添加...')
          let callback = ()=>{
            this.$myLoading.hide()
            this.$myToast.show({text:'添加成功',icon: 'success'})
          }
          this.$store.dispatch('addCar',{queryData:{id:info.id, qty:1, price:info.wap_price,custId:localStorage.app_uid},callback})
        }else {
          this.$myToast.show({text:'您还没有登录哦',time:2000})
        }
      },
      to_car(){
        this.$router.replace('/car')
        this.toggle_show()
      }
    }
  }
</script>

<style lang="less" scoped>
  #goods_toast{
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 999;
    background: rgba(0,0,0,0.8);
    transition: opacity 0.3s;
    .box{
      transform: scale(1.5);
      opacity: 0;
      transition: all 0.3s;
      position: absolute;
      height: 1032/@rem;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      .content{
        width: 650/@rem;
        height: 832/@rem;
        background: white;
        border-radius: 55/@rem;
        margin: 0 auto 50/@rem;
        .img{
          width: 520/@rem;
          height: 520/@rem;
          padding: 30/@rem 65/@rem 20/@rem;
          img{
            width: 100%;
          }
          .svg_wrap{
            width: 40%;
            margin: 0 auto;
            img{
              margin-top: 150/@rem;
            }
          }
        }
        .head{
          color: @c2;
          height: 50/@rem;
          line-height: 50/@rem;
          .price{
            width: 30%;
            float: left;
            text-align: center;
            font-size: 1.2rem;
          }
          .name{
            width: 70%;
            float: right;
            text-align: center;
            font-size: 1rem;
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
            width: 32%;
            height: 45/@rem;
          }
          > :nth-child(4n+2){
            width: 20%;
          }
        }
      }
      .button{
        padding: 0 50/@rem;
        font-size: 0;
        text-align: center;
        .close, .to_car, .add_car{
          width: 216.5/@rem;
          text-align: center;
          line-height: 50/@rem;
          font-size: 0.9rem;
          color: @c4;
          display: inline-block;
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
  }
  #goods_toast.maskin {
    opacity: 1;
  }
  #goods_toast.maskout {
    opacity: 0;
  }
  #goods_toast {
    .boxin{
      transform: scale(1);
      opacity: 1;
    }
    .boxout{
      transform: scale(0.6);
      opacity: 0;
    }
  }
  
</style>
