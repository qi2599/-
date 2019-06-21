<template>
  <div id="home">
    <div class="back_img">
      <div class="horn">
        <div class="iconfont iconhorn1"></div>
        <div class="text">天天饮百津，健康又开心。——百津饮料</div>
      </div>
      <div id="swiper_wrap">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" >
              <img src="./img/1.jpg">
            </div>
            <div class="swiper-slide" >
              <img src="./img/2.jpg">
            </div>
            <div class="swiper-slide" >
              <img src="./img/3.jpg">
            </div>
            <div class="swiper-slide" >
              <img src="./img/4.jpg">
            </div>
            <div class="swiper-slide" >
              <img src="./img/5.jpg">
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <div class="search_wrap" :class="{sreach_fixed: isSearchFixed}" ref="search">
        <router-link class="sreach iconfont iconsousuo" :to="{name: 'search_text'}"> 搜索</router-link>
      </div>
    </div>
    <div class="hot_sort">
      <div class="head">
        热·门·分·类
      </div>
      <div class="content clearfix">
        <a class="item" @click="to_class_goods('1e3559091a6347e2828d4d98a016dc5d')" href="javascript:;"><img src="./img/hot_sort1.png"></a>
        <a class="item" @click="to_class_goods('9fd092db0e25488ba5b1579ea0687e99')" href="javascript:;"><img src="./img/hot_sort2.png"></a>
        <a class="item" @click="to_class_goods('d4a37107ab944329ae1f3ac28629891b')" href="javascript:;"><img src="./img/hot_sort3.png"></a>
      </div>
    </div>
    <div id="brand" class="vux-1px-t">
      <div class="head">
        大·牌·臻·选
      </div>
      <div class="brand_list">
        <div class="swiper-wrapper" v-if="brandList">
          <router-link :to="{ name:'search', query:{id: item.ref_factor_id} }" v-for="item in brandList" :key="item.id" class="swiper-slide">
            <img :src="item.bar_image_url">
            <div>{{item.bar_name}}</div>
          </router-link>
        </div>
        <div v-else class="svg_wrap" style="padding-bottom: 0px; padding-top: 20px">
          <svg class="svg_spinner" style="stroke: #edd1b7;" slot="infinite-spinner" viewBox="0 0 64 64">
            <g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g></svg>
        </div>
      </div>
    </div>
    <div class="sale">
      <div class="head">促·销·商·品</div>
      <Goods2 :goodsList="goodsList" v-if="goodsList"></Goods2>
      <div v-else class="svg_wrap" style="padding-bottom: 500px; padding-top: 30px">
        <svg class="svg_spinner" style="stroke: #edd1b7;" slot="infinite-spinner" viewBox="0 0 64 64">
          <g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g></svg>
      </div>
    </div>
    <div class="footer_text">~~~~到底了 (ˉ▽ˉ；)</div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import Goods2 from '../../components/Goods_show/Goods2'
  import {queryWapBar, getHomeGoods, queryCarNum} from '../../api'
  export default {
    data () {
      return {
        bannerImg: [],
        brandList: '',
        goodsList: '',
        searchTop: '',
        isSearchFixed: false
      }
    },
    components: {
      Goods2
    },
    methods: {
      to_class_goods(classId){
        this.$router.push({name:'search', query:{classId}})
      },
      homeScroll(){
        if(window.scrollY>this.searchTop){
          this.isSearchFixed = true
        }else {
          this.isSearchFixed = false
        }
      }
    },
    created(){
      queryWapBar().then(res => {
        this.brandList = res.result
        this.$nextTick(()=>{
          // logo列表滑动
          new Swiper('#brand .brand_list', {
            freeMode: true,
            slidesPerView: 'auto',
            freeModeSticky: true,
          })
        })
      }).catch(err=>{
        this.$vux.toast.show({text: err, type: 'cancel'})
      })
      getHomeGoods().then(res => {
        this.goodsList = res.result
      })
      if(localStorage.isLogin){
        queryCarNum({custId: localStorage.app_uid}).then(res => {
          if (res.result.cartsum){
            this.$store.commit('setCarNum', {unm: res.result.cartsum})
          }else {
            this.$store.commit('setCarNum', {unm: ''})
          }
        })
      }
    },
    mounted () {
      // 监听滚动条、设置搜索元素到顶部的距离
      window.addEventListener('scroll', this.homeScroll)
      this.searchTop=this.$refs.search.offsetTop
      // 轮播图
      new Swiper('#swiper_wrap .swiper-container', {
        loop: true,
        observer:true, //修改swiper自己或子元素时，自动初始化swiper
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination'
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  #home{
    .back_img{
      height: 550/@rem;
      margin-bottom: -90/@rem;
      width: 100%;
      background-image: linear-gradient(to bottom, @c1 0%, @c1 85%, rgba(0,0,0,0) 100%);
      &:before{
        content: '';
        display: block;
        height: 2px;
      }
      .horn{
        width: 660/@rem;
        height: 66/@rem;
        background: @gray1;
        background-image: linear-gradient(to top, @gray3 0%, @gray1 50%);
        margin: 10/@rem auto 0;
        border-radius: 5px 5px 0 0;
        //box-shadow: 0 0 50px @gray5;
        position: relative;
        z-index: 1;
        .iconfont{
          float: left;
          line-height: 66/@rem;
          color: @c3;
          font-size: 40/@rem;
          margin-left: 20px;
        }
        .text{
          line-height: 66/@rem;
          font-size: 0.9rem;
          text-align: center;
        }
      }
      #swiper_wrap{
        width: 720/@rem;
        height: 280/@rem;
        background: @gray2;
        margin: 0 auto;
        border-radius: 5px;
        overflow: hidden;
        position: relative;
        z-index: 2;
        img{
          width: 100%;
          height: 100%;
        }
        .swiper-pagination-customs-active{
          background-color: @c1;
        }
      }
      .search_wrap{
        background: @c1;
        padding: 20/@rem 0;
        .sreach{
          display: block;
          width: 720/@rem;
          height: 58/@rem;
          line-height:  58/@rem;
          margin: 0 auto;
          text-align: center;
          background: white;
          border-radius: 5px;
        }
      }
      .sreach_fixed{
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 2;
        opacity: 0.9;
      }
    }
    .hot_sort{
      background-color: white;
      border-radius: 10/@rem 10/@rem 0 0;
      width: 720/@rem;
      margin: 0 auto;
      .head{
        text-align: center;
        line-height: 65/@rem;
        letter-spacing: 5/@rem;
        background-image: url("./img/sort_bg.png");
        background-repeat: no-repeat;
        background-size: 316/@rem;
        background-position: center center;
      }
      .content{
        padding-bottom: 20/@rem;
        height: 147/@rem;
        .item{
          float: left;
          margin-left: 16.5/@rem;
          img{
            width: 218/@rem;
            height: 144/@rem;
          }
        }
      }
    }
    #brand{
      background-color: white;
      overflow: hidden;
      border-radius: 0 0 5px 5px;
      width: 720/@rem;
      margin: 0 auto;
      .head{
        text-align: center;
        line-height: 65/@rem;
        letter-spacing: 5/@rem;
        background-image: url("./img/brand_bg.png");
        background-repeat: no-repeat;
        background-size: 316/@rem;
        background-position: center center;
      }
      .brand_list{
        padding: 0 20/@rem 20/@rem 20/@rem;
        height: 140/@rem;
        .swiper-wrapper{
          height: 140/@rem;
          .swiper-slide{
            width: 160/@rem;
            text-align: center;
            font-size: 0.8rem;
            img{
              width: 100/@rem;
              height: 100/@rem;
            }
          }
        }
      }
    }
    .sale{
      margin-top: 16/@rem;
      background-color: white;
      border-radius: 10/@rem;
      .head{
        text-align: center;
        line-height: 65/@rem;
        letter-spacing: 5/@rem;
        background-image: url("./img/sale_bg.png");
        background-repeat: no-repeat;
        background-size: 316/@rem;
        background-position: center center;
      }
    }
    .footer_text{
      text-align: center;
      color: @gray5;
      line-height: 120/@rem;
    }
  }
</style>
