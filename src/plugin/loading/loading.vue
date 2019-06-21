<template>
<!--   v-if="showWrap" :class="trans?'in':'out'"-->
	<div class="loading">
    <div class="loading_wrap">
      <div class="svg">
        <svg class="lds-message" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><g transform="translate(20 50)">
          <circle cx="0" cy="0" r="6" fill="#3c5078" transform="scale(0.756403 0.756403)">
            <animateTransform attributeName="transform" type="scale" begin="-0.375s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
          </circle>
        </g><g transform="translate(40 50)">
          <circle cx="0" cy="0" r="6" fill="#f81259" transform="scale(0.98628 0.98628)">
            <animateTransform attributeName="transform" type="scale" begin="-0.25s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
          </circle>
        </g><g transform="translate(60 50)">
          <circle cx="0" cy="0" r="6" fill="#4f860d" transform="scale(0.899893 0.899893)">
            <animateTransform attributeName="transform" type="scale" begin="-0.125s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
          </circle>
        </g><g transform="translate(80 50)">
          <circle cx="0" cy="0" r="6" fill="#edd1b7" transform="scale(0.595009 0.595009)">
            <animateTransform attributeName="transform" type="scale" begin="0s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
          </circle>
        </g></svg>
      </div>
      <div class="text">加载中...</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "loading"
  }
</script>


<style lang="less" scoped>
  .loading{
    transition: all 0.2;
    .loading_wrap{
      position: fixed;
      z-index: 5;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      background: rgba(255,255,255,0.9);
      width: 250/@rem;
      height: 250/@rem;
      border-radius: 20/@rem;
      .svg{
        height: 150/@rem;
        margin-top: 20/@rem;
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
