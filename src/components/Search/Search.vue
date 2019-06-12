<template>
  <div id="search" :class="{show: isMask}">
    <div class="head">
      <div class="back iconfont iconarrow-left" @click="goBack"></div>
      <div class="content">
        <input type="text" placeholder="饮料 / 酒 / 零食等" ref="search_input" @touchend="getFocus"/>
        <a href="javascript:;">搜索</a>
      </div>
      <div class="sort" @click="isMask = !isMask">
        <div></div>
        <div></div>
        <div></div>
        <p>分类</p>
      </div>
    </div>
    <div class="mask" :class="{mask_show: isMask}" @touchend.self="isMask = !isMask" @touchstart.prevent="">
      <div class="class_wrap">
        <div class="class1">
          <div class="swiper-wrapper">
            <div class="swiper-slide" :class="{active: isActive==0}" @click="addActive(0)">所有商品</div>
            <div class="swiper-slide" :class="{active: isActive==1}" @click="addActive(1)">所有商品</div>
            <div class="swiper-slide" :class="{active: isActive==2}" @click="addActive(2)">所有商品</div>
            <div class="swiper-slide" :class="{active: isActive==3}" @click="addActive(3)">所有商品</div>
            <div class="swiper-slide" :class="{active: isActive==4}" @click="addActive(4)">所有商品</div>
            <div class="swiper-slide" :class="{active: isActive==5}" @click="addActive(5)">所有商品</div>
            <div class="swiper-slide" :class="{active: isActive==6}" @click="addActive(6)">所有商品</div>
          </div>
        </div>
        <div class="class2 clearfix vux-1px-t">
          <div class="item">二级分类</div>
          <div class="item">二级分类</div>
          <div class="item">二级分类</div>
          <div class="item">二级分类</div>
          <div class="item">二级分类</div>
          <div class="item">二级分类</div>
          <div class="item">二级分类</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
export default {
  data () {
    return {
      isMask: false,
      isActive: 0
    }
  },
  methods: {
    goBack(){
      this.$router.go(-1)
    },
    addActive(index){
      this.isActive=index
    },
    getFocus(ev){
      ev.target.focus()
    }
  },
  mounted () {
    new Swiper('.class1', {
      freeMode: true,
      slidesPerView: 'auto',
      freeModeSticky: true
    })
  }
}
</script>

<style lang="less" scoped>
#search{
  position: fixed;
  top: 0;
  z-index: 2;
  &.show{
    height: 100%;
  }
  .head{
    position: relative;
    z-index: 3;
    background: @c1;
    height: 97/@rem;
    display: flex;
    align-items: center;
    .back{
      width: 110/@rem;
      color: white;
      font-size: 1.5rem;
      text-align: center;
    }
    .content{
      background: tan;
      width: 530/@rem;
      height: 60/@rem;
      border-radius: 35/@rem;
      overflow: hidden;
      input{
        width: 390/@rem;
        height: 60/@rem;
        padding-left: 20/@rem;
        border-radius: 0;
        border: none;
        outline: none;
        float: left;
        background: @gray2;
        &:focus{
          background: white;
        }
      }
      a{
        float: right;
        display: block;
        line-height: 60/@rem;
        text-align: center;
        width: 120/@rem;
        background: @c3;
        color: white;
      }
    }
    .sort{
      width: 110/@rem;
      div{
        width: 50/@rem;
        height: 1px;
        margin: 0 auto;
        margin-bottom: 10/@rem;
        background: white;
      }
      p{
        color: white;
        font-size: 0.8rem;
        text-align: center;
      }
    }
  }
  .mask{
    position: absolute;
    top: 97/@rem;
    height: 0;
    overflow: hidden;
    z-index: 2;
    background: rgba(0,0,0,0.5);
    .class_wrap{
      overflow: hidden;
      background: white;
      .class1{
        padding: 30/@rem 0;
        height: 60/@rem;
        .swiper-wrapper{
          .swiper-slide{
            line-height: 60/@rem;
            width: auto;
            padding: 0 20/@rem;
          }
          > :first-child{
            margin-left: 20/@rem;
          }
          > :last-child{
            margin-right: 20/@rem;
          }
          .active{
            background: @c3;
            color: white;
            border-radius: 30/@rem;
          }
        }
      }
      .class2{
        padding: 30/@rem 0;
        .item{
          color: @c1;
          background: @gray2;
          float: left;
          width: 151.5/@rem;
          margin: 20/@rem 18/@rem;
          font-size: 0.9rem;
          text-align: center;
          padding: 15/@rem 0;
          border-radius: 30/@rem;
        }
      }
    }
  }
  .mask_show{
    height: 100%;
  }
}
</style>
