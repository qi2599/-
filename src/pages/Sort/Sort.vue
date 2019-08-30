<template>
  <div id="sort">
    <Search_head>
      <div class="iconfont iconsousuo" slot='iconfont'></div>
    </Search_head>
    <div id="class_list" ref="class_list">
      <infinite class="scroll_wrap" ref="myscroll">
        <div class="content" ref="content">
          <div class="item" :class="{class_open: parent_id == item.id && isOpen}" v-for="(item, index) in class1" :key="index">
            <div class="my-1px-t"></div>
            <div :class="{active: parent_id == item.id && parent_id==id}" @click="get_class1(item.id)">{{item.name}}</div>
            <div class="my-1px-t" :class="{active: id == cla.id}" v-for="(cla,i) in item.class2" :key="i"  @click="get_goods(cla.id)">{{cla.name}}</div>
          </div>
        </div>
      </infinite>
    </div>
    <div class="goods_wrap">
      <infinite :on_infinite="infinite" :on_refresh="refresh" :text="'没有更多商品'" :distance="100" ref="myscroller" >
        <div class="list_wrap clearfix">
          <Goods3 v-for="(item, index) in goodsList" :key="index" :info="item"></Goods3>
        </div>
      </infinite>
    </div>
  </div>
</template>

<script>
  import {queryClass, queryGoods} from '../../api'
  import Goods3 from '../../components/Goods_show/Goods3.vue'
  import Search_head from '../../components/Search_type_head/Search_type_head'
  import infinite from '../../components/infinite/infinite'
  export default {
    data(){
      return {
        isOpen: false,
        class1: '',
        goodsList: '',
        pageNumber: 1,
        id: '0',
        parent_id: '0',
      }
    },
    components:{
      Goods3,
      Search_head,
      infinite
    },
    methods:{
      get_goods(id){
        if(this.id == id) return
        this.$refs.myscroller.done()
        this.pageNumber=1
        this.goodsList=[]
        queryGoods({pageNumber: 1, pageSize: 16, classId:id}).then(res => {
          this.goodsList = res.result
          this.id = id
          if(res.result.length<16){
            this.$refs.myscroller.done(true)
          }
        })
      },
      get_class1(id,ev){
        this.isOpen = !this.isOpen
        if(this.id == id) return
        this.parent_id = id
        ev = ev || window.event
        this.$refs.myscroller.done()
        this.pageNumber=1
        this.goodsList=[]
        this.id = id
        queryGoods({pageNumber: 1, pageSize: 16, classId:this.id=='0'? '':this.id}).then(res => {
          this.goodsList = res.result
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
            }
            this.$nextTick(()=>{
              if(this.$refs.content.offsetHeight-ev.target.offsetTop<this.$refs.class_list.offsetHeight) return
              this.$refs.myscroll.scrollto(ev.target.offsetTop)
            })
          })
        }
      },
      infinite(done){
        queryGoods({pageNumber: this.pageNumber+1, pageSize: 16, classId: this.id=='0'? '':this.id}).then(res => {
          if(res.result.length!=0){
            this.goodsList = [...this.goodsList,...res.result]
            this.pageNumber++
            done()
          }else done(true)
        })
      },
      refresh(reset){
        this.pageNumber = 1
        this.$refs.myscroller.done()
        queryGoods({pageNumber: this.pageNumber, pageSize: 16, classId: this.id=='0'? '':this.id}).then(res => {
          if(res.result.length!=0) this.goodsList = res.result
          reset()
        })
      }
    },
    created(){
      queryClass({pageNumber : 1, pageSize : 50}).then(res => {
        this.class1 = [{id:'0', name:'所有商品'},...res.result]
      })
      queryGoods({pageNumber: 1, pageSize: 16}).then(res => {
        this.goodsList = res.result
      })
      document.body.style.height = '100%'
    },
    watch: {
      '$route' (to, from) {
        if(!sessionStorage.sortPositon || from.path == '/'){}
        if(to.path === "/menu"){
          document.body.style.height = '100%'
          setTimeout(()=>this.$refs.myscroller.scrollto(sessionStorage.sortPositon),50) //同步转异步操作
        }
      },
      parent_id(){
        this.isOpen = true
      }
    },
    beforeRouteLeave(to,from,next){//记录离开时的位置
      sessionStorage.sortPositon = this.$refs.myscroller.getPosition()
      document.body.style.height = ''
      next()
    }
  }
</script>

<style lang="less" scoped>
  #sort{
    height: 100%;
    position: relative;
    .iconsousuo{
      width: 85/@rem;
      height: 70/@rem;
      line-height: 70/@rem;
      padding-left: 35/@rem;
      float: left;
      color: white;
      font-size: 1.3rem;
    }
    #class_list{
      position: absolute;
      top: 107/@rem;
      bottom: 122/@rem;
      width: 163/@rem;
      background: white;
      text-align: center;
      overflow: hidden;
      .scroll_wrap{
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
      bottom: 122/@rem;
      left: 163/@rem;
      right: 0;
      .list_wrap{
        padding-top: 9/@rem;
        &>div{
          float: left;
          margin: 0 0 9/@rem 9/@rem;
        }
      }
    }
  }
</style>
