<template>
  <div id="search_text">
    <Search_head :focus="true">
      <div class="iconfont iconarrow-left" slot='iconfont' @click="goback"></div>
    </Search_head>
    <div class="recent_search">
      <div class="title">最近搜索</div>
      <div class="content clearfix">
        <div>花生</div>
        <div>花生</div>
        <div>花生</div>
      </div>
      <div class="del"><div></div><p class="iconfont icondel"></p></div>
    </div>
    <div class="hot_search">
      <div class="title">热门搜索</div>
      <div class="content clearfix">
        <div>瓜子</div>
        <div>瓜子</div>
        <div>瓜子</div>
        <div>瓜子</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Search_head from '../../components/Search_type_head/Search_type_head'
  export default {
    components: {
      Search_head
    },
    methods:{
      goback(){
        this.$router.go(-1)
      }
    },
    mounted() {
      window.scrollTo(0,0)
    }
  }
</script>

<style lang="less" scoped>
  #search_text{
    padding-top: 200/@rem;
    .iconarrow-left{
      width: 70/@rem;
      height: 70/@rem;
      line-height: 70/@rem;
      padding-left: 20/@rem;
      float: left;
      color: white;
      font-size: 1.5rem;
    
    }
    .title{
      text-align: center;
      font-size: 1.2rem;
      line-height: 2.5rem;
    }
    .content{
      padding: 0 37.5/@rem;
      color: @gray6;
    }
    .content div{
      text-align: center;
      line-height: 2rem;
      width: 195/@rem;
      margin: 15/@rem 15/@rem;
      background: white;
      border-radius: 5/@rem;
      float: left;
    }
    .recent_search{
      margin-bottom: 40/@rem;
      .del{
        color: white;
        text-align: center;
        div{
          width: 45/@rem;
          height: 45/@rem;
          margin-bottom: -65/@rem;
          background: @gray5;
          display: inline-block;
        }
        p{
          font-size: 2.5rem;
        }
      }
    }
  }
</style>
