<template>
  <div id="search_page">
    <Search ref="search_id" :queryGoods="queryGoods" :queryAll="queryAll"></Search>
    <div class="scro_wrap">
      <scroller :on-infinite="infinite" ref="myscroller">
        <Goods2 :goodsList="goodsList"></Goods2>
      </scroller>
    </div>
  </div>
</template>

<script>
  import Search from '../../components/Search/Search.vue'
  import {queryClass, queryGoods} from '../../api'
  import Goods2 from '../../components/Goods_show/Goods2'
  export default {
    data (){
      return {
        goodsList: [],
        pageNumber: 1,
        ref_factor_id: '',
        keyword: '',
        classId: ''
      }
    },
    components: {
      Search,
      Goods2
    },
    methods:{
      queryAll(){
        this.goodsList=[]
        this.$vux.loading.show({text: 'loading...'})
        queryGoods({pageNumber: 1, pageSize: 10}).then(res => {
          this.goodsList = res.result
          this.$vux.loading.hide()
        })
      },
      queryGoods(queryData){
        this.goodsList=[]
        this.$vux.loading.show({text: '加载中...'})
        queryGoods(queryData).then(res => {
          this.goodsList = res.result
          this.$vux.loading.hide()
        })
      },
      infinite(done){
        // 判断是否是首次加载
        if(this.goodsList.length){
          // 获取子搜索组件的classid
          let classId = this.$refs.search_id.id || this.$refs.search_id.parent_id
          // 如果子组件的id不等于此组件的id则证明点击过其他分类
          if(classId !== this.classId){
            this.pageNumber=1
            this.classId = classId
          }
          // 判断是否曾经点击过分类
          if(this.$refs.search_id.isClass){
            // 曾经点击过分还需要排除上次请求不是ref_factor_id
            if(this.ref_factor_id){
              this.pageNumber=1
            }
            this.ref_factor_id = ''
          }
          queryGoods({ref_factor_id: this.ref_factor_id, pageNumber: this.pageNumber+1, pageSize: 10, classId: this.classId==='0'? '':this.classId}).then(res => {
            if(res.result.length!=0){
              this.goodsList = [...this.goodsList,...res.result]
              this.pageNumber++
              done() //进行下一次加载操作
            }else{
              // 没有返回商品则停止上拉加载
              done(true)
            }
          })
        }else {
          this.$nextTick(()=>{
            done()
          })
        }
      }
    },
    created() {
      let {pageNumber, keyword} = this
      let pageSize = 10
      let ref_factor_id=''
      if(this.$route.query.id){
        this.$vux.loading.show({text: 'loading...'})
        ref_factor_id = this.ref_factor_id = this.$route.query.id
        queryGoods({ref_factor_id, pageNumber, pageSize}).then(res => {
          this.goodsList = res.result
          this.$vux.loading.hide()
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  #search_page{
    .scro_wrap{
      position: absolute;
      top: 95/@rem;
      bottom: 0;
      width: 100%;
    }
  }
</style>
