<template>
  <div id="search_text">
    <search_head :focus="true" ref="search_head">
      <div class="iconfont iconarrow-left" slot='iconfont' @touchend="goback"></div>
    </search_head>
    <div class="local_search">
      <div class="title">最近搜索</div>
      <div class="content clearfix">
        <div class="ellipsis" v-for="(item, index) in localSearch" :key="index" @click="hot_local(item)">{{item}}</div>
      </div>
      <div class="del" v-if="localSearch.length>3" @click="del_local"><div class="iconfont icondelete"></div></div>
    </div>
    <div class="hot_search">
      <div class="title">热门搜索</div>
      <div class="content clearfix">
        <div class="ellipsis" v-for="(item,index) in hotSearch" :key="index" @click="hot_local(item.desc)">{{item.desc}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import search_head from '../../components/Search_type_head/Search_type_head'
  import {queryHotSearch} from '../../api'
  export default {
    data(){
      return{
        hotSearch: '',
        localSearch: []
      }
    },
    components: {
      search_head
    },
    methods:{
      goback(){
        this.$router.go(-1)
      },
      del_local(){
        this.localSearch= []
        localStorage.setItem('search',JSON.stringify([]))
      },
      hot_local(keyword){
        this.$refs.search_head.keyword=keyword
      }
    },
    mounted() {
      window.scrollTo(0,0)
      queryHotSearch().then(res=>{
        this.hotSearch=res.result
      })
      this.localSearch = JSON.parse(localStorage.getItem('search'));
    }
  }
</script>

<style lang="less" scoped>
  #search_text{
    padding-top: 200/@rem;
    .iconarrow-left{
      width: 100/@rem;
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
    .local_search{
      margin-bottom: 40/@rem;
      .del{
        margin: 20/@rem auto;
        width: 70/@rem;
        height: 70/@rem;
        background: white;
        border-radius: 50/@rem;
        div{
          width: 100%;
          line-height: 70/@rem;
          text-align: center;
          color: @gray5;
        }
      }
    }
  }
</style>
