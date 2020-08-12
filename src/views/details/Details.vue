<template>
  <div class="detail-page">
    <top-bar></top-bar>
    <detail-swiper :top-img="topImgArray"></detail-swiper>
  </div>
</template>

<script>
import TopBar from './detailschild/topbar'
import DetailSwiper from './detailschild/DetailsSwiper'

import {getDetailsData} from 'network/details'

export default {
  name:'Details',
  components:{
    TopBar,
    DetailSwiper
  },
  data() {
    return {
      id:null, //商品id
      topImgArray:null //详情页轮播图
    }
  },
  created() {
    //将iid保存在本组件中
    this.id = this.$route.params.iid;
    //获取该id的数据
    getDetailsData(this.id).then((res) => {
      this.topImgArray = res.data.result.itemInfo.topImages;
    }).catch((err) => {});
  }
}
</script>

<style>

</style>