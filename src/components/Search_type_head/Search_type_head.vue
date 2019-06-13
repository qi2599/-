<template>
  <div class="head" @touchstart.prevent="">
    <slot name='iconfont'></slot>
    <div class="content">
      <input type="text" placeholder="饮料 / 酒 / 零食等" ref="sort_inp" @touchstart.stop="set_focus"/>
      <a href="javascript:;">搜索</a>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      set_focus(ev){
        ev.target.focus()
      },
    }
  }
</script>

<style lang="less" scoped>
  .head{
    position: fixed;
    top: 0;
    background: @c1;
    height: 70/@rem;
    padding: 18.5/@rem;
    width: 100%;
    .content{
      background: tan;
      width: 600/@rem;
      height: 70/@rem;
      border-radius: 10/@rem;
      overflow: hidden;
      input{
        width: 460/@rem;
        height: 70/@rem;
        padding-left: 20/@rem;
        border-radius: 0;
        border: none;
        outline: none;
        float: left;
        background: @gray2;
        &:focus{
          background: white;
        }
      }
      a{
        float: right;
        display: block;
        line-height: 70/@rem;
        text-align: center;
        width: 120/@rem;
        background: @c3;
        color: white;
        font-size: 1.2rem;
      }
    }
  }
</style>
