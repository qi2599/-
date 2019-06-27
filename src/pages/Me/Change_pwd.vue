<template>
	<div id="chang_pwd">
    <Head :text="'修改密码'"></Head>
    <div class="wrap">
      <div class="inp">
        <input type="text" placeholder="输入旧密码" @click="get_focus" v-model="oldpadd">
        <div class="vux-1px-t"></div>
        <input type="password" placeholder="输入新密码" @click="get_focus" v-model="newpass1">
        <div class="vux-1px-b"></div>
        <input type="password" placeholder="确认新密码" @click="get_focus" v-model="newpass2">
      </div>
      <div class="icon">
        <div class="iconfont iconmima"></div>
        <div class="iconfont iconai-password"></div>
        <div class="iconfont iconai-password"></div>
      </div>
    </div>
    <div class="btn" @click="updata_pwd">确 定</div>
  </div>
</template>

<script>
  import Head from '../../components/Head/Head'
  import {updataPwd} from '../../api'
  export default {
    data(){
      return{
        oldpadd:'',
        newpass1:'',
        newpass2:''
      }
    },
    methods:{
      updata_pwd(){
        let {oldpadd,newpass1,newpass2} = this
        if(!oldpadd || !newpass1 || !newpass2){
          this.$myToast.show({text:'内容不能为空',time:2000})
          return
        }
        if(this.newpass1 !== this.newpass2){
          this.$myToast.show({text:'两次输入的新密码不一致',time:2000})
          return
        }
        this.$myLoading.show('正在修改')
        updataPwd({custId:localStorage.app_uid,oldpadd,newpass1,newpass2}).then(res=>{
          if(res.result_code==='00'){
            this.$myToast.show({text:'密码修改成功，请牢记',time:2000})
            this.$router.go(-1)
            this.$myLoading.hide()
          }else {
            this.$myToast.show({text:'密码修改失败',time:2000})
            this.$myLoading.hide()
          }
        })
      },
      get_focus(ev){
        ev=ev||event
        ev.target.focus()
      }
    },
    components:{
      Head
    }
  }
</script>

<style lang="less" scoped>
#chang_pwd{
  .wrap{
    margin: 40/@rem auto;
    width: 700/@rem;
    border-radius: 10/@rem;
    overflow: hidden;
    background-color: white;
    .icon{
      width: 120/@rem;
      text-align: center;
      background-color: white;
      .iconmima{
        font-size: 40/@rem;
      }
      .iconfont{
        line-height: 85/@rem;
      }
    }
    .inp{
      width: 600/@rem;
      text-align: center;
      float: right;
      input{
        width: 660/@rem;
        padding: 25/@rem 0;
        line-height: 35/@rem;
        border-radius: 0;
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
