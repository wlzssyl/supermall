<template>
  <div class="detail-page">
    <top-bar class="detail-topbar"></top-bar>
    <!-- betterscroll滚动 -->
    <better-scroll class="detail-content" ref="scroll">
      <detail-swiper :top-img="topImgArray"></detail-swiper>
      <items-base :item-base-info="itemBaseInfo"></items-base>
      <details-shop :shop-info="shopInfos"></details-shop>
      <details-image :detail-image="detailImage" 
        :detail-desc="detailDesc" @scrollRefresh="scRrefresh"></details-image>
      <detail-params :param-info="paramInfo"></detail-params>
      <detail-comment :comment="itemComment"></detail-comment>
      <home-goods :list="itemRecommend"></home-goods>
    </better-scroll>
    <back-top @click.native="toTop"></back-top>
  </div>
</template>

<script>
import TopBar from './detailschild/topbar'
import DetailSwiper from './detailschild/DetailsSwiper'
import ItemsBase from './detailschild/ItemsBase'
import DetailsShop from './detailschild/DetailsShop'
import DetailsImage from './detailschild/DetalisImage'
import DetailParams from './detailschild/DetailParams'
import DetailComment from "./detailschild/DetailComment.vue"
import BackTop from 'components/content/backtop/BackTop'

import HomeGoods from 'components/content/homegoods/HomeGoods'
import BetterScroll from 'components/common/BScroll/BetterScroll'

import {getDetailsData, getRecommend, Goods, Shop, GoodsParam} from 'network/details'
import { mixinTop } from 'common/mixin'

export default {
  name:'Details',
  //混入mixins
  mixins: [mixinTop],
  components:{
    TopBar,
    DetailSwiper,
    ItemsBase,
    DetailsShop,
    DetailsImage,
    DetailParams,
    DetailComment,
    HomeGoods,
    BackTop,
    BetterScroll
  },
  data() {
    return {
      id:null, //商品id
      topImgArray:null ,//详情页轮播图
      itemBaseInfo:{},  //商品基本信息
      shopInfos:{} , //店家信息
      detailImage:[],  //商品详情图片
      detailDesc:[],  //商品说明
      paramInfo:{}, //商品参数
      itemComment:{},    //评论
      itemRecommend:[],  //商品推荐
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
      //4.保存商品图片信息和说明
      this.detailImage = res.data.result.detailInfo.detailImage[0].list;
      this.detailDesc[0] = res.data.result.detailInfo.desc;
      this.detailDesc[1] = res.data.result.detailInfo.detailImage[0].key;

      //5.保存商品参数信息
      this.paramInfo = new GoodsParam(
        res.data.result.itemParams.info,
        res.data.result.itemParams.rule,
      );
      //6.保存商品评论数据
      if(res.data.result.rate.cRate !== 0){
        this.itemComment = res.data.result.rate.list[0];
      }
    }).catch((err) => {});
    //获取推荐商品数据
    getRecommend().then(res => {
      //console.log(res)
      this.itemRecommend = res.data.data.list;
    }).catch(err => {})
  },
  methods:{
    scRrefresh() {
      this.$refs.scroll.scroll.refresh();
    }
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