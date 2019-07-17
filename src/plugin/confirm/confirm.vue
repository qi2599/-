<template>
  <div id="confirm" v-show="isShow" :class="{show_confirm: toggleShow}" @touchstart.self="cloce" @touchmove.prevent>
    <div class="wrap" :class="{show_wrap: toggleShow}">
      <div class="content">
        <p>{{text}}</p>
        <div @click="onConfirm" v-html="confirmText"></div>
      </div>
      <div class='cancel' @click="onCancel" v-html="cancelText"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        isShow: false,
        toggleShow: false,
        text: '',
        confirmText: '确定',
        cancelText: '取消'
      }
    },
    methods:{
      onCancel(){
        this.$emit('on-cancel')
        this.cloce()
      },
      onConfirm(){
        this.$emit('on-confirm')
        this.cloce()
      },
      cloce(){
        this.toggleShow = false
        setTimeout(()=>{
          this.isShow = false
        },200)
      }
    }
  }
</script>

<style lang="less" scoped>
  #confirm{
    &.show_confirm{
      background-color: rgba(0,0,0,0.5);
    }
    position: fixed;
    z-index: 5;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0);
    transition: background-color 0.2s;
    .wrap{
      position: fixed;
      width: 94%;
      left: 3%;
      bottom: -160px;
      text-align: center;
      opacity: 0.95;
      transition: bottom 0.2s;
      &.show_wrap{
        bottom: 5%;
      }
      .content{
        background-color: white;
        margin-bottom: 10px;
        border-radius: 12px;
        overflow: hidden;
        p{
          height: 50px;
          line-height: 50px;
          color: #8a8a8a;
        }
        div{
          line-height: 50px;
          font-size: 20px;
          color: #ff0b00;
          transition: background-color 0.2s;
          &:before{
            content: '';
            display: block;
            height: 1px;
            background-color: #c7c7c7;
          }
          &:active{
            background: #cccccc;
          }
        }
      }
      .cancel{
        background-color: white;
        line-height: 50px;
        font-size: 20px;
        color: #0065ff;
        border-radius: 12px;
        &:active{
          background-color: #cccccc;
        }
        transition: background-color 0.2s;
      }
    }
  }
  @media only screen and (-webkit-device-pixel-ratio:2) {
    #confirm .wrap .content div:before{
      transform: scaleY(0.5);
    }
  }
  @media only screen and (-webkit-device-pixel-ratio:3) {
    #confirm .wrap .content div:before{
      transform: scaleY(0.333333333);
    }
  }
</style>
