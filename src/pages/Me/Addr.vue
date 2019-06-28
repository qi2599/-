<template>
	<div>
    <Head :text="'收货地址'"></Head>
    <div class="addr">
      <div class="icon"><div class="iconfont icondingwei"></div></div>
      <div class="info">
        <div class="up">
          <div class="name">{{addr.cust_name}} {{addr.cust_phone}}</div>
        </div>
        <div class="addr_info"><div>收货地址：{{addr.cust_addr}}</div></div>
      </div>
    </div>
    <div class="prompt">备注：以上信息如果有误请与我们联系</div>
  </div>
</template>

<script>
  import Head from '../../components/Head/Head'
  import {queryAddr} from "../../api";

  export default {
    data(){
      return{
        addr:{},
        addrArr:[],
      }
    },
    components:{
      Head
    },
    created() {
      queryAddr({custId:localStorage.app_uid,isDefault: 1}).then(res => {
        this.addr=res.result[0]
        this.addrArr=res.result
      })
    }
  }
</script>

<style lang="less" scoped>
  .addr{
    width: 700/@rem;
    padding: 10/@rem;
    background: white;
    margin: 30/@rem auto;
    border-radius: 10/@rem;
    display: flex;
    align-items: center;
    .icon{
      width: 130/@rem;
      text-align: center;
      color: @c4;
      float: left;
      .iconfont{
        font-size: 1.8rem;
      }
    }
    .info{
      width: 570/@rem;
      .up{
        height: 65/@rem;
        line-height: 65/@rem;
        font-size: 1.3rem;
      }
      .addr_info{
        line-height: 1.5rem;
      }
    }
  }
  .prompt{
    line-height: 100/@rem;
    text-align: center;
  }
</style>
