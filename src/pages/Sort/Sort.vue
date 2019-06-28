<template>
  <div id="sort">
    <Search_head>
      <div class="iconfont iconsousuo" slot='iconfont'></div>
    </Search_head>
    <div id="class_list">
      <scroller class="scroll_wrap" ref="myscroll">
        <div class="content">
          <div class="item" :class="{class_open: parent_id == item.id}" v-for="(item, index) in class1" :key="index">
            <div :class="{active: parent_id == item.id && parent_id==id}" @click="get_class1(item.id)">{{item.name}}</div>
            <div class="vux-1px-b"></div>
            <div class="vux-1px-b" :class="{active: id == cla.id}" v-for="(cla,i) in item.class2" :key="i"  @click="get_goods(cla.id)">{{cla.name}}</div>
          </div>
        </div>
      </scroller>
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
  export default {
    data(){
      return {
        class1: '',
        goodsList: '',
        pageNumber: 1,
        id: '0',
        parent_id: '0',
      }
    },
    components:{
      Goods3,
      Search_head
    },
    methods:{
      get_goods(id){
        this.pageNumber=1
        this.goodsList=[]
        this.$myLoading.show('加载中...')
        queryGoods({pageNumber: 1, pageSize: 10, classId:id}).then(res => {
          this.goodsList = res.result
          this.id = id
          this.$myLoading.hide()
        })
      },
      get_class1(id,event){
        let ev = event || window.event
        this.pageNumber=1
        this.goodsList=[]
        this.id = id
        this.$myLoading.show('加载中...')
        queryGoods({pageNumber: 1, pageSize: 10, classId:this.id=='0'? '':this.id}).then(res => {
          this.goodsList = res.result
          this.$myLoading.hide()
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
              this.parent_id = res.result[0].parent_id
            }else {
              this.parent_id = id
            }
            this.$nextTick(()=>{
              this.$refs.myscroll.scrollTo(0,ev.target.offsetTop)
            })
          })
        }
      },
      infinite(done){
        if(this.goodsList.length){
          queryGoods({pageNumber: this.pageNumber+1, pageSize: 10, classId: this.id=='0'? '':this.id}).then(res => {
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
      this.$myLoading.show('加载中...')
      queryClass({pageNumber : 1, pageSize : 50}).then(res => {
        this.class1 = [{id:'0', name:'所有商品'},...res.result]
      })
      queryGoods({pageNumber: 1, pageSize: 10}).then(res => {
        this.goodsList = res.result
        this.$myLoading.hide()
      })
    },
    watch: {
      '$route' (to, from) {
        if(!sessionStorage.sortPositon || from.path == '/') sessionStorage.sortPositon = ''
        if(to.path === "/sort"){
          setTimeout(()=>this.$refs.myscroller.scrollTo(0,sessionStorage.sortPositon),50) //同步转异步操作
        }
      }
    },
    beforeRouteLeave(to,from,next){//记录离开时的位置
      sessionStorage.sortPositon = this.$refs.myscroller && this.$refs.myscroller.getPosition() && this.$refs.myscroller.getPosition().top;
      next()
    }
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
      .scroll_wrap{
        height: auto;
        top: 0/@rem;
        bottom: 150/@rem;
        .content{
          .item{
            margin: 0 auto;
            height: 100/@rem;
            overflow: hidden;
            line-height: 100/@rem;
            .active{
              background: white;
              box-sizing: border-box;
              border-left: 10/@rem solid @c3;
              height: auto;
              color: @c3;
            }
          }
          .class_open{
            height: auto;
            background: @gray1;
            color: @c1;
          }
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
