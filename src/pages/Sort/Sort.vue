<template>
  <div id="sort">
    <div class="head">
      <div class="content">
        <input type="text" placeholder="饮料 / 酒 / 零食等" ref="sort_inp" @click="set_focus"/>
        <a href="javascript:;">搜索</a>
      </div>
    </div>
    <div id="class_list">
      <div class="swiper-wrapper">
        <div class="swiper-slide vux-1px-b"
             :class="{active: id == item.id}"
             v-for="(item, index) in class1"
             :key="index" @click="get_class1(item.id)">
          {{item.name}}
        </div>
      </div>
    </div>
    <div class="goods_wrap">
      <scroller :on-infinite="infinite" ref="myscroller" >
        <div class="list_wrap">
          <Goods3 v-for="(item, index) in goodsList" :key="index" :info="item"></Goods3>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
  import {queryClass, queryGoods} from '../../api'
  import Goods3 from '../../components/Goods_show/Goods3.vue'
  import Swiper from 'swiper'
  export default {
    data(){
      return {
        class1: '',
        goodsList: '',
        pageNumber: 1,
        id: '0',
        parent_id: 0
      }
    },
    components:{
      Goods3
    },
    methods:{
      set_focus(ev){
        ev.target.focus()
      },
      get_class1(id){
        this.$vux.loading.show({text: 'Loading'})
        this.pageNumber=1
        queryGoods({pageNumber: 1, pageSize: 10, classId:id}).then(res => {
          this.goodsList = res.result
          this.id = id
          this.$refs.myscroller.scrollTo(0,10,false)
          this.$vux.loading.hide()
        })
      },
      infinite(done){
        let classId = this.id=='0'? '':this.id
        queryGoods({pageNumber: this.pageNumber+1, pageSize: 10, classId}).then(res => {
          if(res.result.length!=0){
            this.goodsList = [...this.goodsList,...res.result]
            this.pageNumber++
            done() //进行下一次加载操作
          }else{
            done(true)
          }
        })
      }
    },
    created(){
      queryClass({pageNumber : 1, pageSize : 50}).then(res => {
        this.class1 = [{id:0, name:'所有商品'},...res.result]
        this.$nextTick(() => {
          new Swiper('#class_list', {
            direction: 'vertical',
            freeMode: true,
            slidesPerView: 'auto',
            freeModeSticky: true
          })
        })
      })
      queryGoods({pageNumber: 1, pageSize: 10}).then(res => {
        this.goodsList = res.result
      })
    },
  }
</script>

<style lang="less" scoped>
  #sort{
    height: 100%;
    .head{
      position: fixed;
      top: 0;
      z-index: 2;
      background: @c1;
      height: 70/@rem;
      padding: 18.5/@rem 50/@rem;
      .content{
        background: tan;
        width: 650/@rem;
        height: 70/@rem;
        border-radius: 10/@rem;
        overflow: hidden;
        input{
          width: 510/@rem;
          height: 70/@rem;
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
          line-height: 70/@rem;
          text-align: center;
          width: 120/@rem;
          background: @c3;
          color: white;
          font-size: 1.2rem;
        }
      }
    }
    #class_list{
      position: fixed;
      top: 107/@rem;
      bottom: 122/@rem;
      width: 163/@rem;
      background: white;
      text-align: center;
      overflow: hidden;
      .swiper-wrapper{
        height: auto;
        top: 0/@rem;
        bottom: 150/@rem;
        .swiper-slide{
          margin: 0 auto;
          height: 100/@rem;
          line-height: 100/@rem;
        }
        .active{
          background: @gray2;
          box-sizing: border-box;
          border-left: 10/@rem solid @c3;
        }
      }
    }
    .goods_wrap{
      position: absolute;
      top: 107/@rem;
      left: 163/@rem;
      bottom: 122/@rem;
      width: 587/@rem;
      .list_wrap{
        padding: 10/@rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
    }
  }
</style>
