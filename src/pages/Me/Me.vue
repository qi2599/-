<template>
  <div id="me" v-show="isLogin">
    <div class="bg">
      <div class="content mar-t">
        <div class="portrait">
          <img src="../../common/img/portrait.png">
        </div>
        <div class="info">
          <div class="name">
            <span>{{cust_name}}</span>
            <span @click="logout">退出登录</span>
          </div>
          <div class="buy">
            <div class="sum">
              <p>{{CustVirtual.cust_total_maney}}</p>
              <p>当月购买金额</p>
            </div>
            <div class="integral">
              <p>{{CustVirtual.result}}</p>
              <p>积分</p>
            </div>
            <div class="gold">
              <p>{{CustVirtual.cust_coin}}</p>
              <p>金币</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="order">
        <div @click="to_order(0)">
          <p>全部订单</p>
          <p class="iconfont iconarrow-left"></p>
        </div>
        <p class="vux vux-1px-b"></p>
        <div @click="to_order(1)">
          <p>订单提交</p>
          <p class="iconfont iconarrow-left"></p>
        </div>
        <p class="vux vux-1px-b"></p>
        <div @click="to_order(2)">
          <p>已出单</p>
          <p class="iconfont iconarrow-left"></p>
        </div>
        <p class="vux vux-1px-b"></p>
        <div @click="to_order(3)">
          <p>已发货</p>
          <p class="iconfont iconarrow-left"></p>
        </div>
      </div>
      <div class="addr">
        <div @click="$router.push('/addr')">
          <p>收货地址</p>
          <p class="iconfont iconarrow-left"></p>
        </div>
        <p class="vux vux-1px-b"></p>
        <div @click="$router.push('/change_pwd')">
          <p>修改密码</p>
          <p class="iconfont iconarrow-left"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {queryLogout,queryCarNum,queryCustVirtual} from '../../api'
  export default {
    data(){
      return{
        CustVirtual:'',
        cust_name: localStorage.cust_name,
        isLogin: localStorage.isLogin
      }
    },
    methods:{
      logout(){
        this.$vux.confirm.show({
          content: '确认退出登录吗？',
          onCancel : () => {
            return
          },
          onConfirm : () => {
            queryLogout({cust_id: localStorage.app_uid})
            localStorage.isLogin = ''
            localStorage.app_uid = ''
            localStorage.cust_name = ''
            this.$store.commit('setCustId')
            this.$router.replace('/login')
          }
        })
      },
      to_order(index){
        this.$router.push({name:'order',query:{index}})
      }
    },
    created() {
      if(!localStorage.isLogin){
        this.$router.replace('/login')
        return
      }
      queryCarNum({custId: localStorage.app_uid}).then(res => {
        if (res.result.cartsum){
          this.$store.commit('setCarNum', {unm: res.result.cartsum})
        }else {
          this.$store.commit('setCarNum', {unm: ''})
        }
      })
      queryCustVirtual({uid: localStorage.app_uid}).then(res => {
        this.CustVirtual = res
      })
    }
  }
</script>

<style lang="less" scoped>
  #me{
    width: 100%;
    .bg{
      background: @c1;
      height: 320/@rem;
      margin-bottom: 100/@rem;
      .content{
        position: relative;
        .portrait{
          position: absolute;
          top: 40/@rem;
          left: 50/@rem;
          width: 160/@rem;
          height: 160/@rem;
          border: 3px rgba(255,255,255,0.3) solid;
          background-color: rgba(255,255,255,0.3);
          border-radius: 100/@rem;
          overflow: hidden;
          img{
            margin-top: -1.5px;
            margin-left: -1.5px;
            width: 163/@rem;
            height: 163/@rem;
          }
        }
        .info{
          background: @c4;
          width: 680/@rem;
          margin: 130/@rem auto 0;
          padding: 20/@rem;
          height: 230/@rem;
          border-radius: 20/@rem;
          .name{
            width: 470/@rem;
            height: 88/@rem;
            margin-left: 210/@rem;
            border-radius: 44/@rem;
            background: white;
            :first-child{
              line-height: 88/@rem;
              padding: 30/@rem;
            }
            :last-child{
              float: right;
              line-height: 38/@rem;
              background: @c4;
              margin: 15/@rem 25/@rem;
              padding: 10/@rem 20/@rem;
              border-radius: 50/@rem;
            }
          }
          .buy{
            display: flex;
            align-items: flex-end;
            text-align: center;
            height: 142/@rem;
            .sum, .integral, .gold{
              flex: 1;
              :first-child{
                font-size: 1.2rem;
                line-height: 2rem;
              }
              :last-child{
                font-size: 0.8rem;
                padding-bottom: 10/@rem;
              }
            }
            .integral{
              border-left: 1px white solid;
              border-right: 1px white solid;
            }
          }
        }
      }
    }
    .order, .addr{
      background: white;
      margin: 10/@rem 0;
      div{
        display: flex;
        justify-content: space-between;
        line-height: 3rem;
        font-size: 1.2rem;
        padding: 0 40/@rem;
        transition: background-color 0.2s;
        :last-child{
          transform: rotate(180deg);
        }
        &:active{
          background: @gray3;
        }
      }
      .vux{
        margin: 0 40/@rem;
      }
    }
  }
</style>
