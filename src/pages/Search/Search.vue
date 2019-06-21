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
  import {queryGoods} from '../../api'
  import Goods2 from '../../components/Goods_show/Goods2'
  export default {
    data (){
      return {
        goodsList: [],
        pageNumber: 1,
        ref_factor_id: '',
        classId: '',
        keyword: '',
        flag: true,
      }
    },
    components: {
      Search,
      Goods2
    },
    methods:{
      queryAll(){
        this.goodsList=[]
        this.$vux.loading.show({text: '加载中...'})
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
          // 点击分类或搜索后重置参数
          if(this.$refs.search_id.flag){
            this.ref_factor_id = ''
            this.keyword = ''
            this.classId = ''
            this.pageNumber=1
            // 只重置一次，点击分类或搜索组件内会设置为true
            this.$refs.search_id.flag=false
          }
          // 获取子搜索组件的 classid 或些组件的classId
          let classId = this.$refs.search_id.id || this.$refs.search_id.parent_id || this.classId
          if(this.$refs.search_id.keyword){
            this.keyword = this.$refs.search_id.keyword
          }
          queryGoods({keyword: this.keyword, ref_factor_id: this.ref_factor_id, pageNumber: this.pageNumber+1, pageSize: 10, classId: classId==='0'? '':classId}).then(res => {
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
      if(this.$route.query.id){
        this.$vux.loading.show({text: '加载中...'})
        let ref_factor_id = this.ref_factor_id = this.$route.query.id
        queryGoods({ref_factor_id, pageNumber:1, pageSize:10}).then(res => {
          this.goodsList = res.result
          this.$vux.loading.hide()
        })
      }
      if(this.$route.query.keyword){
        this.$vux.loading.show({text: '加载中...'})
        let keyword = this.keyword = this.$route.query.keyword
        queryGoods({keyword, pageNumber:1, pageSize:10}).then(res => {
          this.goodsList = res.result
          this.$vux.loading.hide()
        })
      }
      if(this.$route.query.classId){
        this.$vux.loading.show({text: '加载中...'})
        let classId = this.classId = this.$route.query.classId
        queryGoods({classId, pageNumber:1, pageSize:10}).then(res => {
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
      top: 105/@rem;
      bottom: 0;
      width: 100%;
    }
  }
</style>
