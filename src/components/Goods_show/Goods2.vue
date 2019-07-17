<template>
  <div>
    <div class="content">
      <div class="goods2" v-for="(info, index) in goodsList" :key="index" @click="$goods_toast(info.id)">
        <div class="img">
          <img  :src="info.tab_image_url">
          <div class="mask" v-if="info.store_amount <= 0">补货中</div>
        </div>
        <div class="name my-1px-b">
          <span class="att" v-if="info.support_virtual === '2'">积分</span>
          <div class="ellipsis">{{info.product_name}}</div>
        </div>
        <div class="footer">
          <div class="price"><span>￥</span>{{info.wap_price}}<span> /{{info.unit}}</span></div>
          <div class="del_price" v-if="info.wap_price !== info.sale_price">￥{{info.sale_price}}</div>
          <div class="car iconfont iconaddcart" @click.stop="add_car(info)"></div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    props: ['goodsList'],
    methods:{
      add_car(info){
        if(info.store_amount <= 0){
          this.$myToast.show({text:'无库存，补货中',time:2000})
          return
        }
        if(localStorage.isLogin){
          this.$myLoading.show('正在添加...')
          let callback = ()=>{
            this.$myLoading.hide()
            this.$myToast.show({text:'添加成功',icon:'success'})
          }
          this.$store.dispatch('addCar',{queryData:{id:info.id, qty:1, price:info.wap_price,custId:localStorage.app_uid},callback})
        }else {
          this.$myToast.show({text:'您还没有登录哦',time:2000})
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .content{
    padding: 15/@rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .goods2{
      width: 353/@rem;
      height: 480/@rem;
      box-sizing: border-box;
      background: white;
      padding: 15/@rem;
      margin-bottom: 15/@rem;
      box-shadow: 0 0 10px @gray2;
      border-radius: 5px;
      .img{
        position: relative;
        height: 330/@rem;
        img{
          width: 100%;
          height: 330/@rem;
        }
        .mask{
          position: absolute;
          bottom: 0;
          width: 100%;
          background: rgba(0,0,0,0.5);
          text-align: center;
          font-size: 1.2rem;
          color: white;
          line-height: 80/@rem;
        }
      }
      .name{
        height: 56/@rem;
        .att{
          background: @c2;
          color: white;
          width: 16%;
          float: left;
          text-align: center;
          line-height: 1rem;
          font-size: 0.7rem;
          border-radius: 2px;
          margin-top: 10/@rem;
        }
        .ellipsis{
          font-size: 0.9rem;
          line-height: 56/@rem;
          padding-left: 5px;
        }
      }
      .footer{
        display: flex;
        justify-content: space-between;
        line-height: 70/@rem;
        span{
          font-size: 0.9rem;
        }
        .price{
          font-size: 1.2rem;
          color: @c2;
        }
        .del_price{
          color: @gray5;
          text-decoration: line-through;
        }
        .car{
          font-size: 2rem;
        }
      }
    }
  }
</style>
