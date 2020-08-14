<template>
  <div class="detail-page">
    <top-bar class="detail-topbar"></top-bar>
    <!-- betterscroll滚动 -->
    <better-scroll class="detail-content">
      <detail-swiper :top-img="topImgArray"></detail-swiper>
      <items-base :item-base-info="itemBaseInfo"></items-base>
      <details-shop :shop-info="shopInfos"></details-shop>
    </better-scroll>
  </div>
</template>

<script>
import TopBar from './detailschild/topbar'
import DetailSwiper from './detailschild/DetailsSwiper'
import ItemsBase from './detailschild/ItemsBase'
import DetailsShop from './detailschild/DetailsShop'

import BetterScroll from 'components/common/BScroll/BetterScroll'

import {getDetailsData, Goods, Shop} from 'network/details'

export default {
  name:'Details',
  components:{
    TopBar,
    DetailSwiper,
    ItemsBase,
    DetailsShop,
    BetterScroll
  },
  data() {
    return {
      id:null, //商品id
      topImgArray:null ,//详情页轮播图
      itemBaseInfo:{},  //商品基本信息
      shopInfos:{}  //店家信息
    }
  },
  created() {
    //将iid保存在本组件中
    this.id = this.$route.params.iid;
    //获取该id的数据
    getDetailsData(this.id).then((res) => {
      //console.log(res);
      //1.保存轮播图数据
      this.topImgArray = res.data.result.itemInfo.topImages;

      //2.保存商品基本信息数据
      this.itemBaseInfo = new Goods(
        res.data.result.itemInfo, 
        res.data.result.columns, 
        res.data.result.shopInfo.services);
      //3.保存店家信息数据
        this.shopInfos = new Shop(res.data.result.shopInfo);
    }).catch((err) => {});
  }
}
</script>

<style>
  .detail-page{
    position: relative;
    z-index: 100;
    background-color: #fff;
  }
  .detail-topbar{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .detail-content{
    height: calc(100vh - 44px);
  }
</style>