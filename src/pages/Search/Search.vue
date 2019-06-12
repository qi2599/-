<template>
  <div>
    <Search></Search>
    <div class="search_page">
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
  </div>
</template>

<script>
  import Search from '../../components/Search/Search.vue'
  import {queryGoods} from '../../api'
  export default {
    data (){
      return {
        goodsList: []
      }
    },
    components: {
      Search
    },
    created() {
      let ref_factor_id = this.$route.query.id
      let pageNumber = 1
      let pageSize = 10
      let keyword = ''
      queryGoods({ref_factor_id, pageNumber, pageSize, keyword}).then(res => {
        this.goodsList = res.result
      })
    }
  }
</script>

<style lang="less" scoped>
  .search_page{
    padding-top: 200/@rem;
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
    .hot_search{
    
    }
  }
</style>
