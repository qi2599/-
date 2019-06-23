<template>
  <div id="search" :class="{show: isMask}">
    <div class="head">
      <div class="back iconfont iconarrow-left" @click="goBack"></div>
      <div class="content">
        <input type="text" placeholder="饮料 / 酒 / 零食等" ref="search_input" @touchend="getFocus" @change="reqGoods" v-model="keyword"/>
        <a href="javascript:;" @click="reqGoods">搜索</a>
      </div>
      <div class="sort" @click="isMask = !isMask">
        <div></div>
        <div></div>
        <div></div>
        <p>分类</p>
      </div>
    </div>
    <div class="mask" :class="{mask_show: isMask}" @touchstart.self="isMask = !isMask" @touchstart.prevent="">
      <div class="class_wrap">
        <div class="class1">
          <div class="content">
            <div :class="{active: item.id===parent_id}"
                 v-for="(item,index) in classList"
                 :key="index"
                 @click="get_class2(item.id)">{{item.name}}
            </div>
          </div>
        </div>
        <div class="class2 clearfix vux-1px-t" :class="{class2_active: classList2.length}">
          <div class="item" v-for="(item, index) in classList2" :key="index" @click="reqGoods({id:item.id})">{{item.name}}</div>
        </div>
      </div>
      <div class="to_car" @click="$router.push('/car')">
        <div class="iconfont_box">
          <div class="iconfont iconcar_active"></div>
        </div>
        <div>前往购物车</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {queryClass} from "../../api";
  import BScroll from 'better-scroll'
  export default {
    data () {
      return {
        isMask: false,
        flag: false,
        classList: [],
        classList2: [],
        id: '',
        parent_id: '',
        keyword: ''
      }
    },
    props:{
      queryGoods: Function,
      queryAll: Function
    },
    methods: {
      goBack(){
        this.$router.go(-1)
      },
      getFocus(ev){
        ev.target.focus()
      },
      get_class2(id){
        this.flag=true
        this.keyword = ''
        if(id !== '0'){
          queryClass({pageNumber: 1, pageSize: 50, class_parent_id: id}).then(res => {
            if (res.result[0]){
              this.classList2 = res.result
            }else {
              this.classList2 = []
              this.isMask=false
            }
            this.queryGoods({pageNumber: 1, pageSize: 10, classId: id})
            this.parent_id = id
            this.id=''
          })
        }else {
          this.parent_id = '0'
          this.id = ''
          this.classList2 = []
          this.queryAll()
          this.isMask=false
        }
      },
      reqGoods({id}){
        this.flag=true
        if(id){
          this.id = id
          this.keyword=''
        }else if(this.keyword){
          this.id = ''
          this.parent_id = ''
          this.classList2 = ''
          // 更新本地搜索词
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
            window.localStorage.setItem('search',JSON.stringify(localSearch))
          }
        }else {
          this.$myToast.show({text:'请输入搜索词'})
          return
        }
        this.isMask=false
        this.queryGoods({pageNumber: 1, pageSize: 10, classId: this.id, keyword: this.keyword})
      }
    },
    mounted() {
      queryClass({pageNumber : 1, pageSize : 50}).then(res => {
        this.classList = [{id:'0', name:'所有商品'},...res.result]
        this.$nextTick(() => {
          new BScroll('.class1',{
            startX: 0,
            click: true,
            scrollX: true,
            // 忽略竖直方向的滚动
            scrollY: false,
            eventPassthrough: "vertical"
          })
        })
      })
    }
  }
</script>

<style lang="less" scoped>
  #search{
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1;
    &.show{
      height: 100%;
    }
    .head{
      display: flex;
      width: 100%;
      background: @c1;
      height: 107/@rem;
      align-items: center;
      .back{
        width: 100/@rem;
        color: white;
        font-size: 1.5rem;
        text-align: center;
      }
      .content{
        width: 530/@rem;
        height: 70/@rem;
        input{
          width: 400/@rem;
          height: 70/@rem;
          padding-left: 20/@rem;
          box-sizing: border-box;
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
          border-radius: 0 10/@rem 10/@rem 0;
          color: white;
        }
      }
      .sort{
        width: 110/@rem;
        div{
          width: 50/@rem;
          height: 1px;
          margin: 0 auto;
          margin-bottom: 10/@rem;
          background: white;
        }
        p{
          color: white;
          font-size: 0.8rem;
          text-align: center;
        }
      }
    }
    .mask{
      position: absolute;
      top: 107/@rem;
      width: 100%;
      height: 0;
      overflow: hidden;
      background: rgba(0,0,0,0.5);
      .class_wrap{
        overflow: hidden;
        background: white;
        .class1{
          padding: 30/@rem 0;
          height: 60/@rem;
          position: relative;
          .content{
            position: absolute;
            display: flex;
            white-space: nowrap;
            div{
              line-height: 60/@rem;
              padding: 0 20/@rem;
            }
            > :first-child{
              margin-left: 20/@rem;
            }
            > :last-child{
              margin-right: 20/@rem;
            }
            .active{
              background: @c3;
              color: white;
              border-radius: 30/@rem;
            }
          }
        }
        .class2{
          .item{
            color: @c1;
            background: @gray2;
            float: left;
            width: 151.5/@rem;
            margin: 20/@rem 18/@rem;
            font-size: 0.9rem;
            text-align: center;
            padding: 15/@rem 0;
            border-radius: 30/@rem;
          }
        }
        .class2_active{
          padding: 50/@rem 0;
        }
      }
      .to_car{
        position: absolute;
        bottom: 280/@rem;
        right: 225/@rem;
        width: 300/@rem;
        text-align: center;
        line-height: 50/@rem;
        font-size: 0.9rem;
        color: @c4;
        .iconfont_box{
          width: 100/@rem;
          height: 100/@rem;
          border-radius: 50/@rem;
          background: @gray7;
          margin: 0 auto;
          transition: 0.1s;
          &:active {
            background: @gray10;
            transform: scale(1.5);
          }
          .iconfont{
            line-height: 100/@rem;
            text-align: center;
            font-size: 1.2rem;
          }
          .iconaddcart{
            font-size: 1.9rem;
          }
        }
      }
    }
    .mask_show{
      height: 100%;
    }
  }
</style>
