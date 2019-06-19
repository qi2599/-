<template>
  <div>
    <button @click="to_login">前往登录</button>
    <button @click="logout">退出登录</button>
  </div>
</template>

<script>
  import {queryLogout,queryCarNum} from '../../api'
  export default {
    methods:{
      to_login(){
        this.$router.push('/login')
      },
      logout(){
        queryLogout({cust_id: localStorage.app_uid})
        localStorage.isLogin = ''
        localStorage.app_uid = ''
        this.$store.commit('setCustId')
        this.$router.replace('/login')
      }
    },
    created() {
      if(localStorage.isLogin){
        queryCarNum({custId: localStorage.app_uid}).then(res => {
          if (res.result.cartsum){
            this.$store.commit('setCarNum', {unm: res.result.cartsum})
          }else {
            this.$store.commit('setCarNum', {unm: ''})
          }
        })
      }else {
        this.$router.replace('/login')
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
