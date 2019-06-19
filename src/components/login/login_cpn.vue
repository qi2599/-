<template>
  <div>
    <div class='login_wrap'>
      <div>
        <input type='span' placeholder='手机号/用户名' @click.stop="get_focus" v-model="mobile"/>
        <span class='iconfont iconpersonal_active'></span>
      </div>
      <div>
        <input type='password' placeholder='登录密码' @click.stop="get_focus" v-model="passwd"/>
        <span class='iconfont iconai-password'></span>
      </div>
    </div>
    <div class='login_btn' @click="to_login">登 录</div>
    <a class='forget_psd'>忘记密码?</a>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        mobile: '',
        passwd:''
      }
    },
    methods:{
      get_focus(ev){
        ev = ev || event
        ev.target.focus()
      },
      to_login(){
        let callback = () => {
          this.$router.push('/me')
        }
        this.$store.dispatch('getUserInfo',{queryData:{type:'1', mobile:this.mobile, passwd:this.passwd},callback})
      }
    }
  }
</script>

<style lang="less" scoped>
  .login_wrap{
    background: white;
    border-radius: 0.5rem;
    padding: 0 0.5rem;
    overflow: hidden;
    margin: 10/@rem 30/@rem 50/@rem;
  }
  .login_wrap .iconfont{
    line-height: 3rem;
    padding-left: 0.8rem;
  }
  .login_wrap input{
    background: white;
    width: 85%;
    float: right;
    height: 3rem;
    font-size: 0.9rem;
  }
  .login_wrap div:first-child{
    border-bottom: 1px solid #eee;
  }
  .login_btn{
    text-align: center;
    background: @c3;
    width: 300/@rem;
    margin: 0 auto;
    line-height: 2.5rem;
    color: white;
    border-radius: 50/@rem;
  }
  .forget_psd{
    display: block;
    text-align: center;
    font-size: 0.8rem;
    color: rgb(92, 92, 92);
    line-height: 5rem;
    letter-spacing: 1px;
  }
</style>
