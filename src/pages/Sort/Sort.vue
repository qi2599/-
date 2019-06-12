<template>
  <div id="sort">
    <Search_head>
      <div class="iconfont iconsousuo" slot='iconfont'></div>
    </Search_head>
    <div id="class_list">
      <div class="swiper-wrapper" v-if="class1.length">
        <div class="swiper-slide vux-1px-b"
             :class="{active: id == item.id}"
             v-for="(item, index) in class1"
             :key="index" @click="get_class1(item.id)">
          {{item.name}}
        </div>
      </div>
      <img src="./img/class_list.svg" v-else>
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
  import Search_head from '../../components/Search_type_head/Search_type_head'
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
      Goods3,
      Search_head
    },
    methods:{
      get_class1(id){
        this.pageNumber=1
        this.goodsList=[]
        queryGoods({pageNumber: 1, pageSize: 10, classId:id}).then(res => {
          this.goodsList = res.result
          this.id = id
        })
        if(id !== 0){
          queryClass({pageNumber: 1, pageSize: 50, class_parent_id: id}).then(res => {
            if(res.result[0]){
              this.class1.some(item => {
                if(item.id === res.result[0].parent_id){
                  item.class2 = res.result
                  return true
                }
              })
            }
          })
        }
      },
      infinite(done){
        if(this.goodsList.length){
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
        }else {
          this.$nextTick(()=>{
            done()
          })
        }
      }
    },
    created(){
      queryClass({pageNumber : 1, pageSize : 50}).then(res => {
        this.class1 = [{id:'0', name:'所有商品'},...res.result]
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
    .iconsousuo{
      width: 70/@rem;
      height: 70/@rem;
      line-height: 70/@rem;
      padding-left: 20/@rem;
      float: left;
      color: white;
      font-size: 1.3rem;
      
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
