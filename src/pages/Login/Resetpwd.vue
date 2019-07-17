<template>
	<div id="resetpwd">
    <Head :text="'重置密码'"></Head>
    <div class="resetpwd1" v-if="isResetpwd1">
      <input class="inp" type="number" placeholder="请输入手机号码" @click="get_focus" v-model="mobile" v-focus>
      <div class="btn" @click="next">下 一 步</div>
    </div>
    <div class="resetpwd2" v-else>
      <div class="mobile">短信验证码已发送至 {{mobile}}</div>
      <div class="wrap">
        <div class="validation">
          <div class="text">验证码</div>
          <input type="number" placeholder="输入验证码" v-model="validation" v-focus>
          <div class="time" v-if="time!==50">{{time}} 秒</div>
          <div class="get_sms" v-else @click="get_sms">重新获取</div>
        </div>
        <div class="pwd vux-1px-t vux-1px-b">
          <div class="text">设置密码</div>
          <input type="password" placeholder="6-20位数字+字母或符号" v-model="pwd" @click="get_focus">
        </div>
        <div class="pwd">
          <div class="text">确认密码</div>
          <input type="password" placeholder="6-20位数字+字母或符号" v-model="confirmPwd" @click="get_focus">
        </div>
      </div>
      <div class="btn" @click="to_reset">提 交</div>
    </div>
  </div>
</template>

<script>
  import Head from '../../components/Head/Head'
  import {sendSMS,resetPassword} from '../../api'
  export default {
    data(){
      return{
        mobile: '',
        isResetpwd1:true,
        confirmPwd:'',
        pwd:'',
        validation:'',
        time:49
      }
    },
    components:{
      Head,
    },
    methods:{
      to_reset(){
        let {mobile,pwd,confirmPwd,validation}=this
        if(!pwd || !confirmPwd || !validation) {
          this.$myToast.show({text:'内容不能为空',time:2000})
          return
        }
        if (pwd !== confirmPwd) {
          this.$myToast.show({text:'两次输入的密码不一致',time:2000})
          return
        }
        this.$myLoading.show('正在重置')
        resetPassword({mobile,pwd,confirmPwd,validation}).then(res=>{
          this.$myLoading.hide()
          if (res.result_code==='00'){
            this.$myToast.show({text:'密码重置成功',time:2000})
            this.$router.push('/login')
          }else this.$myToast.show({text:res.result_desc,time:2000})
        })
      },
      get_sms(){
        this.$myLoading.show('加载中...')
        sendSMS({mobile:this.mobile}).then(res=>{
          this.$myLoading.hide()
          if(res.result_code==='00') {
            this.isResetpwd1=false
            this.$myToast.show({text:'验证码发送成功',time:2000})
          }
          if(res.result_code==='2007') this.$myToast.show({text: res.result_desc,time:3000})
        })
        let timeId = setInterval(()=>{
          if (this.time) this.time--
          else {
            this.time=50
            clearInterval(timeId)
          }
        },1000)
      },
      next(){
        if(!this.mobile){
          this.$myToast.show({text:'请输入手机号码',time:2000})
          return
        }
        this.get_sms()
      },
      get_focus(ev){
        ev=ev||event
        ev.target.focus()
      }
    }
  }
</script>

<style lang="less" scoped>
#resetpwd{
  text-align: center;
  .resetpwd1{
    .inp{
      width: 660/@rem;
      padding: 25/@rem 20/@rem;
      margin: 50/@rem 0;
      line-height: 35/@rem;
      border-radius: 10/@rem;
    }
  }
  .resetpwd2{
    width: 700/@rem;
    margin: 0 auto;
    .mobile{
      padding: 50/@rem 0;
    }
    .wrap{
      margin-bottom: 30/@rem;
      background-color: white;
      border-radius: 10/@rem;
      input{
        width: 380/@rem;
        padding-left: 20/@rem;
      }
      .text{
        width: 150/@rem;
        text-align: center;
      }
      > div{
        display: flex;
        padding: 25/@rem 0;
      }
      .validation{
        .time{
          width: 100/@rem;
          text-align: right;
          color: @gray5;
        }
      }
      .pwd{
        input{
          width: 530/@rem;
        }
      }
    }
  }
  .btn{
    width: 700/@rem;
    height: 80/@rem;
    line-height: 80/@rem;
    border-radius: 10/@rem;
    background-color: @c3;
    text-align: center;
    color: white;
    margin: auto;
    transition: background-color 0.2s;
    &:active{
      background-color: #7fc730;
    }
  }
}
</style>
