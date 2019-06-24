<template>
	<div class="car_number">
    <div class="iconfont iconjian" @click="add_cut('cut')"></div>
    <input type="number" maxlength="3" ref="inp" :value="num" @click="get_focus" @change="set_num">
    <div class="iconfont iconjia" @click="add_cut('add')"></div>
  </div>
</template>

<script>
  export default {
    props:{
      num: Number,
      set_num: Function,
      add_cut: Function
    },
    methods:{
      get_focus(ev){
        ev = ev || event
        ev.target.focus()
      }
    }
  }
</script>

<style lang="less" scoped>
  .car_number{
    display: flex;
    width: 222/@rem;
    height: 56/@rem;
    line-height: 56/@rem;
    font-size: 1rem;
    .iconjian, .iconjia{
      width: 56/@rem;
      font-size: 1.2rem;
      text-align: center;
    }
    input{
      width: 100/@rem;
      background: @gray1;
      text-align: center;
      border-radius: 0;
      color: @c1;
    }
  }
</style>
