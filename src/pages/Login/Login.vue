<template>
  <div style="height: 100%; width: 100%">
    <img class='bg_img' src='../../common/img/login.jpg'>
    <div class='img'></div>
    <img class='logo_img' src='../../common/img/logo.png'>
    <div class='logo'>
      <span>双 华 商 城</span>
      <span>批发 | 代理 | 配送</span>
    </div>
    <div class='log_reg'>
      <span :class="{active: toggle_cpn}" @click="toggle_cpn=true">登 录</span>
      <span :class="{active: !toggle_cpn}" @click="toggle_cpn=false">注 册</span>
    </div>
    <component :is="toggle_cpn? 'login_cpn':'register'"></component>
  </div>
</template>

<script>
  import login_cpn from '../../components/login/login_cpn'
  import register from '../../components/login/register'
  export default {
    data(){
      return {
        toggle_cpn: true
      }
    },
    components: {
      login_cpn,
      register
    },
  }
</script>

<style lang="less" scoped>
  .logo{
    text-align: center;
  }
  .bg_img{
    width: 100%;
    height: 470/@rem;
    position: absolute;
    top: 0;
    z-index: -1;
  }
  .img{
    height: 469/@rem;
  }
  .logo{
    background: rgba(255, 255, 255, 0.3);
    width: 280/@rem;
    border-radius: 10/@rem;
    position: absolute;
    top: 260/@rem;
    left: 225/@rem;
  }
  .logo_img{
    width: 20%;
    height: 150/@rem;
    position: absolute;
    left: 40%;
    top: 80/@rem;
  }
  .logo span:first-child{
    display: block;
    font-size: 1.2rem;
    color: white;
    line-height: 2rem;
    margin-bottom: -0.3rem;
  }
  .logo span:last-child{
    display: block;
    font-size: 0.8rem;
    line-height: 1.5rem;
    color:white;
  }
  
  .log_reg{
    width: 80%;
    background: white;
    margin-left: 10%;
    border-radius: 2rem;
    position: relative;
    top: -1.2rem;
    overflow: hidden;
    box-shadow: 0px 0px 60/@rem #c9c9c9;
    font-size: 0;
  }
  .log_reg span{
    display: inline-block;
    width: 50%;
    text-align: center;
    line-height: 2.5rem;
    color: @c1;
    font-size: 1rem;
  }
  .log_reg .active{
    background-color: @c1;
    color: white;
  }
</style>
