<template>
  <div id="home">
    <div class="back_img">
      <div class="horn">
        <div class="iconfont iconhorn1"></div>
        <div class="text">天天饮百津，健康又开心。——百津饮料</div>
      </div>
      <div id="swiper_wrap">
        <Swiper :list="bannerImg" :dots-class="'swiper_dots'" :aspect-ratio="0.4" :auto="true" :show-desc-mask="false" :show-dots="true" :loop="true"></Swiper>
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
        <div class="brand_wrap">
          <div class="brand_item" v-for="item in brandList" :key="item.id" @click="$router.push({ name:'search', query:{id: item.ref_factor_id} })">
            <img :src="item.bar_image_url">
            <div>{{item.bar_name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="sale">
      <div class="head">促·销·商·品</div>
      <Goods_home :goodsList="goodsList" ref="home_goods"></Goods_home>
    </div>
    <div class="iconfont" :class="{iconhuidaodingbu:is_to_top}" @click="to_top"></div>
    <div class="footer_text">~~~~到底了 (ˉ▽ˉ；)</div>
  </div>
</template>

<script>
  import Goods_home from '../../components/Goods_show/Goods_home'
  import {queryWapBar, getHomeGoods, queryCarNum,querySwiper} from '../../api'
  import BScroll from 'better-scroll'
  import { Swiper } from 'vux'
  
  export default {
    data () {
      return {
        bannerImg: [{url:"javascript:",img:""}],
        brandList: '',
        goodsList: '',
        searchTop: '',
        is_to_top: false,
        isSearchFixed: false,
      }
    },
    components: {
      Goods_home,
      Swiper
    },
    methods: {
      to_class_goods(classId){
        this.$router.push({name:'search', query:{classId}})
      },
      to_top(){
        let a = document.documentElement.scrollTop + document.body.scrollTop  // 滚动条位置
        let time_id = setInterval(()=>{
          a -= 25
          if(a <= 0){
            a=0
            clearInterval(time_id)
          }
          window.scrollTo(0,a)
        },(1))
      },
      homeScroll(){
        if(window.scrollY>this.searchTop) this.isSearchFixed = true
        else this.isSearchFixed = false
        
        if(window.scrollY>1500) this.is_to_top=true
        else this.is_to_top=false
        // 触发懒加载
        if(this.$refs.home_goods)this.$refs.home_goods.lazyloadFn()
      },
      buffer(fn, ms) {
        var timeout;
        return function() {
          if (timeout) return;
          var args = arguments;
          timeout = setTimeout(function() {
            timeout = null;
            fn.apply(null, args);
          }, ms);
        }
      }
    },
    created(){
      queryWapBar().then(res => {
        this.brandList = res.result
        this.$nextTick(()=>{
          // logo列表滑动
          new BScroll('.brand_list',{
            startX: 0,
            click: true,
            scrollX: true,
            // 忽略竖直方向的滚动
            scrollY: false,
            eventPassthrough: "vertical"
          })
        })
      }).catch(err=>{
        this.$myToast.show({text: '网络连接超时', icon: 'error', time:2000})
      })
      getHomeGoods().then(res => {
        this.goodsList = res.result
        this.$nextTick(()=>{
          this.$refs.home_goods.lazyloadFn()
        })
      })
      querySwiper().then(res => {
        this.bannerImg=[]
        res.result.forEach(item => {
          this.bannerImg.push({url: 'javascript:',img:item.tab_image_url})
        })
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
      // 是否创建本地搜索词
      if(localStorage){
        if(!localStorage.search){
          localStorage.setItem('search',JSON.stringify([]))
        }
      }
      window.scrollTo(0,this.scrolly)
    },
    mounted () {
      // 监听滚动条事件，限制触发频率
      window.onscroll=this.buffer(this.homeScroll,100)
      this.searchTop=this.$refs.search.offsetTop
    },
    watch: {
      '$route' (to, from) {
        if(!sessionStorage.homePositon || from.path == '/') sessionStorage.homePositon = ''
        if(to.path === "/home"){
          window.scrollTo(0,sessionStorage.homePositon)
          this.$nextTick(()=>{
            // logo列表滑动
            new BScroll('.brand_list',{
              startX: 0,
              click: true,
              scrollX: true,
              // 忽略竖直方向的滚动
              scrollY: false,
              eventPassthrough: "vertical"
            })
          })
        }
      }
    },
    beforeRouteLeave(to,from,next){//记录离开时的位置
      sessionStorage.homePositon = window.scrollY
      next()
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
        margin: 0 auto;
        border-radius: 10/@rem;
        background: @c1;
        overflow: hidden;
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
          border-radius: 10/@rem;
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
      border-radius: 0 0 10/@rem 10/@rem;
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
        position: relative;
        .brand_wrap{
          position: absolute;
          white-space: nowrap;
          .brand_item{
            display: inline-block;
            width: 160/@rem;
            text-align: center;
            font-size: 0.8rem;
            img{
              width: 100/@rem;
              height: 100/@rem;
            }
            div{
              line-height: 50/@rem;
            }
          }
        }
      }
    }
    .sale{
      margin-top: 16/@rem;
      background-color: white;
      border-radius: 10/@rem;
      min-height: 500/@rem;
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
    .iconhuidaodingbu{
      position: fixed;
      color: rgba(0,0,0,0.5);
      font-size: 2.5rem;
      bottom: 220/@rem;
      right: 100/@rem;
    }
    .footer_text{
      text-align: center;
      color: @gray5;
      line-height: 120/@rem;
    }
  }
</style>
