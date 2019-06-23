<template>
	<div class="toast" v-show="isShow" :class="trans?'in':'out'">
    <div class="toast_wrap" :class="icon? 'icon':'no_icon'">
      <div v-if="icon === 'success'" class="success">
        <svg class="ldi-7cz5z4" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background: none; shape-rendering: auto;"><svg version="1.1" id="圖層_1"   x="0px" y="0px" viewBox="0 0 100 100" style="transform-origin: 50px 50px 0px;" xml:space="preserve" class=""><g style="transform-origin: 50px 50px 0px;" class=""><g style="transform-origin: 50px 50px 0px; transform: scale(0.6);" class=""><g style="transform-origin: 50px 50px 0px;" class=""><g class="">.st0{fill:none;stroke:#333333;stroke-width:8;stroke-miterlimit:10;} .st1{fill:#333333;} .st2{fill:#ABBD81;} .st3{fill:#E15B64;} .st4{fill-rule:evenodd;clip-rule:evenodd;fill:#B3B3B3;} .st5{fill:#FFFFFF;} .st6{fill:#B3B3B3;} .st7{fill:#77A4BD;} .st8{fill:#A0C8D7;} .st9{fill:#666666;} .st10{fill:none;stroke:#F47E60;stroke-width:8;stroke-linecap:round;stroke-miterlimit:10;} .st11{fill:none;stroke:#F47E60;stroke-width:9.0001;stroke-linecap:round;stroke-miterlimit:10;} .st12{fill:none;stroke:#F47E60;stroke-width:9;stroke-linecap:round;stroke-miterlimit:10;}<g class="ld ldt-bounce-in" style="transform-origin: 50px 50px 0px; animation-duration: 1s; animation-delay: 0.0769231s; animation-direction: normal;"><circle class="st1" cx="50" cy="50" r="40" fill="#3c5078" style="fill: rgb(60, 80, 120);"></circle></g><g style="transform-origin: 50px 50px 0px;" class=""><g class=""><g class="ld ldt-bounce-in" style="transform-origin: 50px 50px 0px; animation-duration: 1s; animation-delay: 0.153846s; animation-direction: normal;"><polygon class="st2" points="43.7,69.4 25,47.7 28.9,43.8 43.7,56.4 72.3,30.6 75,33.3 	" fill="#edd1b7" style="fill: rgb(237, 209, 183);"></polygon></g></g></g><metadata xmlns:d="" class="ld ldt-bounce-in" style="transform-origin: 50px 50px 0px; animation-duration: 1s; animation-delay: 0.230769s; animation-direction: normal;"></metadata></g></g></g></g></svg></svg>
      </div>
      <div v-if="icon === 'warning'" class="warning">
        <img src="../../common/img/warning.svg">
      </div>
      <div v-if="icon === 'error'" class="error">
        <img src="../../common/img/error.svg">
      </div>
      <div class="text">{{text}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        isShow:false,
        trans:false,
        text: '',
        icon: ''
      }
    }
  }
</script>


<style lang="less" scoped>
  .toast{
    opacity: 0;
    transition: all 0.3s;
    .toast_wrap{
      position: fixed;
      z-index: 9999;
      margin: auto;
      background: rgba(255,255,255,0.9);
      .text{
        text-align: center;
        letter-spacing: 2px;
      }
      .success{
        @import './success.css';
        margin: -30/@rem 0 -40/@rem;
      }
      img{
        display: block;
        margin: 30/@rem auto;
        width: 130/@rem;
        text-align: center;
      }
    }
    .icon{
      top: 30%;
      right: 0;
      left: 0;
      width: 250/@rem;
      height: 250/@rem;
      border-radius: 20/@rem;
    }
    .no_icon{
      left: 50%;
      top: 35%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.7);
      border-radius: 10/@rem;
      .text{
        color: white;
        line-height: 2.5rem;
        padding: 0 30/@rem;
        font-weight: 500;
        letter-spacing: 1px;
      }
    }
  }
  .toast.in{
    opacity: 1;
  }
  .toast.out{
    opacity: 0;
  }
</style>
