<template>
  <div class="head">
    <slot name='iconfont'></slot>
    <div class="content">
      <input type="text" placeholder="饮料 / 酒 / 零食等" ref="sort_inp" @change="to_search" @touchstart.stop="set_focus"/>
      <a href="javascript:;" @click="to_search">搜索</a>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        keyword: '',
        flag:true
      }
    },
    props:[
      'focus'
    ],
    methods: {
      set_focus(ev){
        ev.target.focus()
      },
      add_local_search(){
        let flag = true
        let localSearch=JSON.parse(localStorage.getItem('search'));
        localSearch.some(item=>{
          if(item===this.keyword){
            flag=false
            return true
          }
        })
        if (flag){
          localSearch.push(this.keyword)
          localStorage.setItem('search',JSON.stringify(localSearch))
        }
      },
      to_search(){
        // this.flag 解决失去焦点和点击搜索触发两次
        if(this.flag){
          this.keyword=this.$refs.sort_inp.value
          if(this.keyword){
            this.add_local_search()
            this.$router.push({name: 'search', query:{keyword: this.keyword}})
            this.flag=false
          }else {
            this.$myToast.show({text:'请输入搜索词'})
          }
        }
      }
    },
    mounted() {
      if(this.focus){
        this.$refs.sort_inp.focus()
      }
    },
    watch:{
      keyword(){
        if(this.keyword){
          this.$router.push({name: 'search', query:{keyword: this.keyword}})
        }
      },
      '$route' (to) {
        if(to.path === "/sort"){
          this.$refs.sort_inp.value=""
          this.flag=true
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .head{
    position: fixed;
    top: 0;
    z-index: 2;
    background: @c1;
    height: 70/@rem;
    padding: 18.5/@rem;
    width: 100%;
    max-width: 760px;
    .content{
      width: 680/@rem;
      input{
        width: 430/@rem;
        height: 70/@rem;
        box-sizing: border-box;
        padding-left: 20/@rem;
        border: 2px solid #4f79b2;
        border-radius: 10/@rem 0 0 10/@rem;
        outline: none;
        float: left;
        background: @gray2;
        &:focus{
          background: white;
        }
      }
      a{
        float: right;
        display: block;
        line-height: 70/@rem;
        text-align: center;
        width: 120/@rem;
        background: #4F79B2;
        color: white;
        font-size: 1.2rem;
        border-radius: 0 10/@rem 10/@rem 0;
        
      }
    }
  }
</style>
