<template>
  <div>
    <form>
      <div class='reg_wrap'>
        <div class='reg_item'>
          <input type='text' name='num' placeholder='请输入手机号码'v-model="mobile"/>
          <span>手机号</span>
        </div>
        <div class='reg_item'>
          <input type='text' name='store_name' placeholder='请输入商店名称'v-model="cust_name"/>
          <span>商店名称</span>
        </div>
        <div class='reg_item'>
          <input type='text' name='user_name' placeholder='请输入您的姓名'v-model="p_name"/>
          <span>客户名字</span>
        </div>
        <div class='reg_item'>
          <input type='text' name='user_add' placeholder='请输入收货地址' v-model="cust_addr"/>
          <span>收货地址</span>
        </div>
        <div class='reg_item'>
          <input type='password' name='psd' placeholder='6-20位数字+字母或符号'v-model="passwd"/>
          <span>设置密码</span>
        </div>
        <div class='reg_item'>
          <input type='password' name='aff_psd' placeholder='6-20位数字+字母或符号' v-model="aff_passwd"/>
          <span>确认密码</span>
        </div>
        <div class='reg_item'>
          <img :src="img_code" @click="get_imgcode">
          <input type='span' name='yanzhen' placeholder='请输入验证码'v-model="authCode"/>
          <span>验证码</span>
        </div>
      </div>
      <div class='reg_btn' @click="to_register">提 交</div>
    </form>
    <div class="footer"></div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {queryAuthCode,queryRegister} from '../../api'
  export default {
    data(){
      return {
        img_code:'',
        mobile:'',
        passwd:'',
        aff_passwd:'',
        cust_addr:'',
        cust_name:'',
        p_name:'',
        authCode:''
      }
    },
    methods:{
      get_imgcode(){
        this.img_code = axios.defaults.baseURL + "other/getImageCode?t=" + new Date().getTime()
      },
      to_register(){
        let {mobile,passwd,aff_passwd,cust_addr,cust_name,p_name,authCode} = this
        if(!mobile){this.$myToast.show({text:'请输入手机号'});return}
        if(!cust_name){this.$myToast.show({text:'请输入商店名称'});return}
        if(!p_name){this.$myToast.show({text:'请输入您的姓名'});return}
        if(!cust_addr){this.$myToast.show({text:'请输入收货地址'});return}
        if(passwd !== aff_passwd){this.$myToast.show({text:'输入的密码不一致'});return}
        if(!authCode){this.$myToast.show({text:'请输入验证码'});return}
        this.$myLoading.show('正在注册...')
        queryAuthCode({authCode}).then(res=>{
          queryRegister({mobile,passwd,cust_addr,cust_name,p_name,authCode}).then(res=>{
            this.$myLoading.hide()
            this.$myToast.show({text:'注册成功，请等待验证'})
          }).catch(err=>{
            this.$myLoading.hide()
            this.$myToast.show({text:'注册失败'})
          })
        }).catch(err=>{
          this.$myLoading.hide()
          this.$myToast.show({text:'验证码错误'})
        })
      }
    },
    mounted() {
      this.get_imgcode()
      let inp = document.getElementsByTagName('input')
      for (let i=0, length=inp.length; i<length; i++){
        inp[i].onclick=function (ev) {
          ev=ev || event
          ev.target.focus()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .reg_wrap{
    background: white;
    font-size: 0.9rem;
    line-height: 3rem;
    padding: 0 1rem;
    margin: 10/@rem 30/@rem 50/@rem;
    border-radius: 0.5rem;
  }
  .reg_wrap input{
    width: 70%;
    background: white;
    float: right;
    padding: 0 10/@rem;
    font-size: 0.9rem;
    height: 3rem;
  }
  .reg_item{
    border-bottom: 1px solid #eee;
  }
  .reg_item:last-child{
    border: none;
  }
  .reg_item:last-child input{
    width: 40%;
  }
  .reg_item:last-child img{
    width: 200/@rem;
    height: 80/@rem;
    float: right;
    margin: 8/@rem 0;
  }
  .reg_btn{
    text-align: center;
    background: @c3;
    width: 300/@rem;
    margin: 0 auto;
    line-height: 2.5rem;
    color: white;
    border-radius: 50/@rem;
    &:active{
      background-color: #7fc730;
    }
  }
  .footer{
    height: 170px;
  }
</style>
