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
        <router-link class="sreach iconfont iconsousuo" :to="{name: 'search_type'}"> 搜索</router-link>
      </div>
    </div>
    <div class="hot_sort">
      <div class="head">
        热·门·分·类
      </div>
      <div class="content clearfix">
        <a class="item" href="javascript:;"><img src="./img/hot_sort1.png"></a>
        <a class="item" href="javascript:;"><img src="./img/hot_sort2.png"></a>
        <a class="item" href="javascript:;"><img src="./img/hot_sort3.png"></a>
      </div>
    </div>
    <div id="brand" class="vux-1px-t">
      <div class="head">
        大·品·牌
      </div>
      <div class="brand_list" v-if="brandList.length">
        <div class="swiper-wrapper">
          <router-link :to="{ name:'search', query:{id: item.ref_factor_id} }" v-for="item in brandList" :key="item.id" class="swiper-slide">
            <img :src="item.bar_image_url">
            <div>{{item.bar_name}}</div>
          </router-link>
        </div>
      </div>
      <img src="./img/brand.svg" v-else>
    </div>
    <div class="sale" :class="{sale_height: !goodsList.length}">
      <div class="head">促·销·商·品</div>
      <Goods2 :goodsList="goodsList"></Goods2>
    </div>
    <div class="footer_text">~~~~到底了 (ˉ▽ˉ；)</div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import Goods2 from '../../components/Goods_show/Goods2'
import {queryWapBar, getHomeGoods} from '../../api'
export default {
  data () {
    return {
      bannerImg: [],
      brandList:[],
      goodsList: [],
      searchTop: 0,
      isSearchFixed: false
    }
  },
  components: {
    Goods2
  },
  methods: {
    homeScroll(){
      if(window.scrollY>this.searchTop){
        this.isSearchFixed = true
      }else {
        this.isSearchFixed = false
      }
    },
    refresh(){},
    infinite(){},
    store_amount(){}
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
    })
    getHomeGoods().then(res => {
      this.goodsList = res.result
    })
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
    padding-bottom: 140/@rem;
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
        .swiper-wrapper{
          .swiper-slide{
            width: 120/@rem;
            margin: 0 20/@rem;
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
    .sale_height{
      height: 1500px;
    }
    .footer_text{
      text-align: center;
      color: @gray5;
      line-height: 100/@rem;
    }
  }
</style>
