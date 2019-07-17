<template>
	<div id="pay" @touchstart="set_blur">
    <div class="head">
      <div class="back iconfont iconarrow-left" @click="$router.go(-1)"></div>
      <div>订单确认</div>
    </div>
    <div class="content">
      <div class="addr" @click="$router.push('/addr')">
        <div class="icon"><div class="iconfont icondingwei"></div></div>
        <div class="info">
          <div class="up">
            <div class="name">{{addr.cust_name}}</div>
            <div class="mob">{{addr.cust_phone}}</div>
            <div class="iconfont iconarrow-left"></div>
          </div>
          <div class="addr_info"><div>收货地址：{{addr.cust_addr}}</div></div>
        </div>
      </div>
      <div class="goods" v-show="car_goods.length">
        <Goods_pay :car_goods="car_goods"></Goods_pay>
      </div>
      <div class="remark">
        <textarea placeholder="若您有其他要求或有需要注意的事项，请在此备注：" ref="t_area" @click.stop="get_focus" v-model="remarks"></textarea>
      </div>
      <div class="gold">
        <div class="num">
          <Car_number :num="num" :set_num="set_num" :add_cut="add_cut" ref="c_num"></Car_number>
        </div>
        <div class="my_gold">我的金币{{cust_coin}}，本次使用:</div>
      </div>
    </div>
    <div class="bar" v-show="car_goods.length">
      <div class="total">总金额: <span> {{total}}</span> 元，得 {{total_virtual}} 积分</div>
      <div class="box" @click="to_apy">提交订单</div>
    </div>
  </div>
</template>

<script>
  import Car_number from '../../components/Car_number/Car_number'
  import {queryCar,queryCustVirtual,queryAddr,queryCreateBill} from '../../api'
  import Goods_pay from '../../components/Goods_show/Goods_pay'
  export default {
    data(){
      return {
        remarks:'',
        ids:'',
        num: 0,
        cust_coin: 0,
        car_goods: [],
        addr:{},
        addrArr:[],
        total:this.$route.query.total,
        total_virtual:this.$route.query.total_virtual
      }
    },
    methods:{
      get_focus(ev){
        ev=ev || event
        ev.target.focus()
      },
      set_blur(){
        this.$refs.t_area.blur()
      },
      add_cut(type){
        let {num} = this
        if(type === 'add'){
          num = num>=this.cust_coin? this.cust_coin:num+1
        }else if(type === 'cut'){
          num = num<=0? 0:num-1
        }
        this.num = num
      },
      set_num(ev){
        ev = ev || event
        let num = +ev.target.value
        if (num <= 0){
          num = ev.target.value = 0
        }else if(num >= this.cust_coin){
          num = ev.target.value = this.cust_coin
        }
        this.num = num
      },
      to_apy(){
        this.$myLoading.show('加载中...')
        queryCreateBill({custId:localStorage.app_uid,productIds:this.ids,coin:this.num,remarks:this.remarks}).then(res=>{
          if (res.result_code === '00'){
            this.$myLoading.hide()
            this.$myToast.show({text:'下单成功'})
            this.$router.replace({name:'order',query:{index:1}})
          }
          if (res.result_code === '1046'){
            this.$myLoading.hide()
            this.$myToast.show({text: res.result_desc, time:2000})
          }
        })
      }
    },
    components:{
      Car_number,
      Goods_pay
    },
    created() {
      let custId = localStorage.app_uid
      let ids=this.ids=this.$route.query.ids
      this.$myLoading.show('加载中...')
      queryCar({custId,ids}).then(res => {
        this.car_goods=res.result.reverse()
        this.$myLoading.hide()
      })
      queryCustVirtual({uid: custId}).then(res => {
        if(res.cust_coin) this.cust_coin=res.cust_coin
      })
      queryAddr({custId,isDefault: 1}).then(res => {
        this.addr=res.result[0]
        this.addrArr=res.result
      })
    },
    beforeDestroy() {
      this.$store.commit('setToPay',{val:false})
    }
  }
</script>

<style lang="less" scoped>
  #pay{
    padding: 107/@rem 0;
    .head{
      position: fixed;
      width: 100%;
      top: 0;
      z-index: 2;
      color: white;
      height: 107/@rem;
      line-height: 107/@rem;
      background: @c1;
      text-align: center;
      letter-spacing: 1px;
      font-size: 1.2rem;
      .back{
        position: absolute;
        padding-left: 50/@rem;
        font-size: 1.5rem;
      }
    }
    .content{
      .addr{
        width: 700/@rem;
        padding: 10/@rem;
        background: white;
        margin: 10/@rem auto;
        border-radius: 10/@rem;
        display: flex;
        align-items: center;
        .icon{
          width: 130/@rem;
          text-align: center;
          color: @c4;
          float: left;
          .icondingwei{
            font-size: 2rem;
          }
        }
        .info{
          width: 570/@rem;
          .up{
            display: flex;
            justify-content: space-between;
            height: 65/@rem;
            line-height: 65/@rem;
            font-size: 1.3rem;
            letter-spacing: 1px;
            .iconarrow-left{
              transform: rotate(180deg);
              font-size: 1.5rem;
            }
          }
          .addr_info{
            line-height: 1.5rem;
          }
        }
      }
      .remark{
        textarea{
          width: 700/@rem;
          height: 192/@rem;
          border-radius: 10/@rem;
          padding: 10/@rem;
          margin: 10/@rem auto;
          display: block;
          font-size: 1.2rem;
          line-height: 1.6rem;
          outline: none;
          border: none;
          resize: none;
        }
      }
      .gold{
        width: 680/@rem;
        height: 80/@rem;
        padding: 10/@rem 20/@rem;
        margin: 10/@rem auto 100/@rem;
        border-radius: 10/@rem;
        background: white;
        .num{
          float: right;
          margin: 12/@rem 0;
        }
        .my_gold{
          line-height: 80/@rem;
        }
      }
    }
    .bar{
      position: fixed;
      bottom: 0;
      width: 100%;
      display: flex;
      background: @gray1;
      height: 100/@rem;
      line-height: 100/@rem;
      .total{
        flex-grow: 1;
        padding-left: 20/@rem;
      }
      .box{
        width: 200/@rem;
        color: white;
        background: @c2;
        text-align: center;
        font-size: 1.2rem;
      }
      span{
        color: @c2;
        font-weight: 600;
      }
    }
  }
</style>
