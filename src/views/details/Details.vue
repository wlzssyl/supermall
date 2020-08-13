<template>
  <div class="detail-page">
    <top-bar></top-bar>
    <detail-swiper :top-img="topImgArray"></detail-swiper>
    <items-base :item-base-info="itemBaseInfo"></items-base>
  </div>
</template>

<script>
import TopBar from './detailschild/topbar'
import DetailSwiper from './detailschild/DetailsSwiper'
import ItemsBase from './detailschild/ItemsBase'

import {getDetailsData, Goods} from 'network/details'

export default {
  name:'Details',
  components:{
    TopBar,
    DetailSwiper,
    ItemsBase
  },
  data() {
    return {
      id:null, //商品id
      topImgArray:null ,//详情页轮播图
      itemBaseInfo:{}  //商品基本信息
    }
  },
  created() {
    //将iid保存在本组件中
    this.id = this.$route.params.iid;
    //获取该id的数据
    getDetailsData(this.id).then((res) => {
      console.log(res);
      //1.保存轮播图数据
      this.topImgArray = res.data.result.itemInfo.topImages;

      //2.保存商品基本信息数据
      this.itemBaseInfo = new Goods(
        res.data.result.itemInfo, 
        res.data.result.columns, 
        res.data.result.shopInfo.services);

    }).catch((err) => {});
  }
}
</script>

<style>

</style>