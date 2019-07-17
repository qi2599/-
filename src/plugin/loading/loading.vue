<template>
	<div class="loading" v-show="isShow" :class="trans?'in':'out'">
    <div class="loading_wrap">
      <div v-if="icon === 'loading'" class="svg">
        <img src="../../common/img/loadding.svg">
      </div>
      <div v-if="icon === 'depressed'" class="svg">
        <img src="../../common/img/depressed.svg">
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
        icon: 'loading'
      }
    }
  }
</script>


<style lang="less" scoped>
  .loading{
    opacity: 0;
    transition: all 0.3s;
    .loading_wrap{
      position: fixed;
      z-index: 9999;
      top: 30%;
      right: 0;
      left: 0;
      margin: auto;
      background: rgba(255,255,255,0.9);
      width: 250/@rem;
      height: 250/@rem;
      border-radius: 20/@rem;
      .svg{
        height: 150/@rem;
        margin-top: 30/@rem;
        img{
          display: block;
          margin: 20/@rem auto;
          width: 130/@rem;
          text-align: center;
        }
      }
      .text{
        text-align: center;
        letter-spacing: 2px;
      }
    }
  }
  .loading.in{
    opacity: 1;
  }
  .loading.out{
    opacity: 0;
  }
</style>
