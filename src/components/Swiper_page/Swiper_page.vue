<template>
  <div id="swiper_page">
    <div class="clearfix" @touchstart="start" @touchmove="move" @touchend="end" ref="content">
      <div class="left" ref="item_width">
        <div>
          <img src="../../common/img/loading.svg">
        </div>
      </div>
      <div class="middle">
        <div v-show="orders.length">
          <Order_cpn :orders="orders"></Order_cpn>
        </div>
        <div class="no_goods" v-show="!orders.length"></div>
      </div>
      <div class="right">
        <div>
          <img src="../../common/img/loading.svg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import trsfrom_css from './transfrom_css'
  import {queryBill} from '../../api'
  import Order_cpn from '../Order_cpn/Order_cpn'
  import floatObj from '../../../static/js/floatObj'
  export default {
    data(){
      return{
        orders:[],
        pageNumber:1,
        index:1,
        startPoint:{},
        elementPoint:{},
        isX:true,
        isFirst:false
      }
    },
    props:{
      tab_index: Number,
      add_cut: Function
    },
    components:{
      Order_cpn
    },
    watch:{
      index(){
        this.jump()
      },
      tab_index(val,old){
        let content = this.$refs.content
        let w = document.body.clientWidth
        content.style.transition = '0.5s transform'
        if(val===3&&old===0){
          this.index=0
          trsfrom_css(content,'translateX',0)
          return
        }else if(val===0&&old===3){
          this.index=2
          trsfrom_css(content,'translateX',-2*w)
          return
        }
        if(val>old){
          this.index=2
          trsfrom_css(content,'translateX',-2*w)
        }else if(val<old){
          this.index=0
          trsfrom_css(content,'translateX',0)
        }
      }
    },
    methods:{
      jump(){
        let content = this.$refs.content
        let w = document.body.clientWidth
        if (this.index ===0 || this.index===2){
          queryBill({custId:localStorage.app_uid, status:this.tab_index, pageNumber:this.pageNumber,pageSize: 10}).then(res => {
            if(res.result.length){
              this.orders=res.result
              this.orders.forEach(item=>{
                item.details.forEach(info=>{
                  info.total=floatObj.multiply(info.sale_qty,info.product_sale_price)
                })
              })
            }else {
              this.orders=[]
            }
            this.index=1
            content.style.transition = 'none'
            trsfrom_css(content,'translateX',-w)
          })
        }
      },
      start(ev){
        if(this.index!=1)return
        ev = ev || event
        let touchC=ev.changedTouches[0]
        let content = this.$refs.content
        this.startPoint = {x:touchC.clientX, y:touchC.clientY}
        this.elementPoint.x=content.getBoundingClientRect().left
        this.elementPoint.y=content.getBoundingClientRect().top
        this.isX=true
        this.isFirst=true
        content.style.transition = 'none'
      },
      move(ev){
        if(this.index!=1)return
        if(!this.isX) return
        ev = ev || event
        let touchC=ev.changedTouches[0]
        let content = this.$refs.content
        let {startPoint,elementPoint}=this
        let nowPoint={}
        nowPoint.x=touchC.clientX
        nowPoint.y=touchC.clientY
        let dis={}
        dis.x=nowPoint.x-startPoint.x
        dis.y=nowPoint.y-startPoint.y
        if(this.isFirst){
          this.isFirst = false
          if(Math.abs(dis.y)>Math.abs(dis.x)){
            this.isX = false
            return
          }
        }
        let translataX=elementPoint.x + dis.x
        trsfrom_css(content,'translateX',translataX)
      },
      end(ev){
        if(this.index!=1)return
        ev = ev || event
        let touchC=ev.changedTouches[0]
        let content = this.$refs.content
        let w = document.body.clientWidth
        let nowPoint={}
        nowPoint.x=touchC.clientX
        nowPoint.y=touchC.clientY
        let dis={}
        dis.x=nowPoint.x-this.startPoint.x
        dis.y=nowPoint.y-this.startPoint.y
        if(Math.abs(dis.x)<=w/4){
          content.style.transition = '0.5s transform'
          trsfrom_css(content,'translateX',-w)
        }else if(dis.x>0){
          this.index=0
          window.scrollTo(0,0)
          this.add_cut('cut')
        }else if (dis.x<0) {
          this.index=2
          window.scrollTo(0,0)
          this.add_cut('add')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  #swiper_page{
    overflow: hidden;
    .clearfix{
      width: 2250/@rem;
      transform: translate(-750/@rem);
      .left, .middle, .right{
        float: left;
        width: 750/@rem;
      }
      .left, .right{
        div{
          width: 200/@rem;
          margin: 100/@rem auto;
        }
      }
      .no_goods{
        height: 100%;
      }
    }
  }
</style>
