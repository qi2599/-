<template>
	<div id="order">
    <div class="head">
      <div class="back" @click="$router.go(-1)">
        <div>返回</div>
        <div class="iconfont iconarrow-left"></div>
      </div>
      <div>我的订单</div>
    </div>
    <div class="tab">
      <tab active-color="#4f860d" ref="tabBox">
        <tab-item @on-item-click="toggle">全部订单</tab-item>
        <tab-item @on-item-click="toggle">订单提交</tab-item>
        <tab-item @on-item-click="toggle">已出单</tab-item>
        <tab-item @on-item-click="toggle">已发货</tab-item>
      </tab>
    </div>
    <Swiper_page :tab_index="index" :add_cut="add_cut"></Swiper_page>
    <Order_detail></Order_detail>
  </div>
</template>

<script>
  import { Tab, TabItem } from 'vux'
  import Swiper_page from '../../components/Swiper_page/Swiper_page'
  import Order_detail from '../../components/Order_cpn/Order_detail'
  export default {
    data(){
      return {
        index:0,
        details:[]
      }
    },
    methods:{
      toggle(){
        this.index=this.$refs.tabBox.index
      },
      add_cut(type){
        let index=this.index
        if(type === 'add'){
          index++
          if (index>3) index=0
        }else if(type === 'cut'){
          index--
          if (index<0) index=3
        }
        this.index=this.$refs.tabBox.index=index
      }
    },
    components:{
      Tab,
      TabItem,
      Swiper_page,
      Order_detail
    },
    created() {
      this.index=this.$route.query.index
    },
    mounted() {
      this.$refs.tabBox.index=this.$route.query.index
    }
  }
</script>

<style lang="less" scoped>
#order{
  padding-top: 195/@rem;
  .head{
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 2;
    color: white;
    height: 107/@rem;
    line-height: 107/@rem;
    background: @c1;
    text-align: center;
    letter-spacing: 1px;
    font-size: 1.2rem;
    .back{
      position: absolute;
      width: 160/@rem;
      .iconarrow-left{
        font-size: 1.5rem;
        text-align: right;
      }
      :first-child{
        float: right;
      }
    }
  }
  .tab{
    position: fixed;
    width: 100%;
    top: 107/@rem;
    z-index: 2;
  }
}
</style>
