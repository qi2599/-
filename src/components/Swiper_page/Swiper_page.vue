<template>
  <div id="swiper_page">
    <div class="clearfix" @touchstart="start" @touchmove="move" @touchend="end" ref="content">
      <div class="left" ref="item_width"></div>
      <div class="middle">
        <div v-if="orders.length">
          <Order_cpn :orders="orders" :btnShow="btnShow" @getOrders="getOrders"></Order_cpn>
        </div>
        <div class="no_goods" v-else>
          <img src="../../common/img/order_icon.svg">
          <div>{{order}}</div>
        </div>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
  import {queryBill} from '../../api'
  import Order_cpn from '../Order_cpn/Order_cpn'
  import floatObj from '../../../static/js/floatObj'
  export default {
    data(){
      return{
        btnShow: false,
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
    computed:{
      order(){
        switch (this.tab_index) {
          case 0:return '您暂时没有订单哦~~~快去下单吧'
          case 1:return '您暂时没有提交订单哦~~~快去下单吧'
          case 2:return '您暂时没有已出单哦~~~快去下单吧'
          case 3:return '您暂时没有已发货订单哦~~~快去下单吧'
        }
      }
    },
    components:{
      Order_cpn
    },
    watch:{
      index(){
        this.jump()
      },
      tab_index(val,old){
        this.orders=[]
        let content = this.$refs.content
        let w = document.body.clientWidth
        content.style.transition = '0.5s transform'
        if(val===3&&old===0){
          this.index=0
          content.style.transform= 'translateX('+0+'px)'
          return
        }else if(val===0&&old===3){
          this.index=2
          content.style.transform= 'translateX('+(-2*w)+'px)'
          return
        }
        if(val>old){
          this.index=2
          content.style.transform= 'translateX('+(-2*w)+'px)'
        }else if(val<old){
          this.index=0
          content.style.transform= 'translateX('+0+'px)'
        }
      }
    },
    created(){
      this.getOrders()
    },
    methods:{
      getOrders(){
        this.$myLoading.show('加载中...')
        queryBill({custId:localStorage.app_uid, status:this.tab_index, pageNumber:this.pageNumber,pageSize: 10}).then(res=>{
          this.compute_res(res)
          this.$myLoading.hide()
        })
      },
      compute_res(res){
        this.pageNumber++
        if(res.result.length){
          if(res.result.length>=10){
            this.btnShow=true
          }else{
            this.btnShow=false
          }
          this.orders=this.orders.concat(res.result)
          this.orders.forEach(item=>{
            let qty=0
            item.details.forEach(info=>{
              qty += info.sale_qty
              info.price_total=floatObj.multiply(info.sale_qty,info.product_sale_price)
            })
            item.qty_total=qty
          })
        }else {
          this.btnShow=false
        }
      },
      jump(){
        let content = this.$refs.content
        let w = document.body.clientWidth
        if (this.index ===0 || this.index===2){
          this.$myLoading.show('加载中...')
          this.pageNumber=1
          queryBill({custId:localStorage.app_uid, status:this.tab_index, pageNumber:this.pageNumber,pageSize: 10}).then(res => {
            this.compute_res(res)
            this.index=1
            content.style.transition = 'none'
            content.style.transform= 'translateX('+(-w)+'px)'
            this.$myLoading.hide()
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
        content.style.transform= 'translateX('+translataX+'px)'
        ev.preventDefault()
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
        if(Math.abs(dis.x)<=w/3){
          content.style.transition = '0.5s transform'
          content.style.transform= 'translateX('+(-w)+'px)'
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
      display: flex;
      .left, .middle, .right{
        width: 750/@rem;
        min-height: 1000/@rem;
      }
      .left, .right{
        width: 710/@rem;
        margin: 20/@rem;
        border-radius: 10/@rem;
        background: white;
      }
      .no_goods{
        width: 710/@rem;
        margin: 20/@rem;
        height: 1000/@rem;
        background: white;
        border-radius: 10/@rem;
        text-align: center;
        img{
          width: 200/@rem;
          margin-top: 100/@rem;
        }
        div{
          line-height: 150/@rem;
          color: @gray4;
        }
      }
    }
  }
</style>
