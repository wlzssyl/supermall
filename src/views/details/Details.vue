<template>
  <div class="detail-page">
    <top-bar class="detail-topbar" @themeTo="themeClick" ref="topbar"></top-bar>
    <!-- betterscroll滚动 -->
    <better-scroll class="detail-content" ref="scroll" 
      :probeType=3 @scroll="scrollPosition">
      <detail-swiper :top-img="topImgArray"></detail-swiper>
      <items-base :item-base-info="itemBaseInfo"></items-base>
      <details-shop :shop-info="shopInfos"></details-shop>
      <details-image :detail-image="detailImage" 
        :detail-desc="detailDesc" @scrollRefresh="scRrefresh"></details-image>
      <detail-params ref="params" :param-info="paramInfo"></detail-params>
      <detail-comment ref="comment" :comment="itemComment"></detail-comment>
      <home-goods ref="recommend" :list="itemRecommend"></home-goods>
    </better-scroll>
    <details-bottom-bar @addToCart="addToCart"></details-bottom-bar>
    <back-top @click.native="toTop" v-show="isShowToTop"></back-top>
    <toast ref="toast"/>
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
import DetailsBottomBar from './detailschild/DetailsBottomBar'

import HomeGoods from 'components/content/homegoods/HomeGoods'
import BetterScroll from 'components/common/BScroll/BetterScroll'
import BackTop from 'components/content/backtop/BackTop'

import {getDetailsData, getRecommend, Goods, Shop, GoodsParam} from 'network/details'
import { mixinTop } from 'common/mixin'

import Toast from 'components/common/toast/Toast'

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
    DetailsBottomBar,
    HomeGoods,
    BetterScroll,
    BackTop,
    Toast
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
      themeOffsetTop: [], //导航栏顶部距离保存
      navCurrentIndex: 0  //顶部导航栏索引
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
    scRrefresh() {//调用这里说明图片已经加载完了
      this.$refs.scroll.scroll.refresh();
      //获取offsetTop
      this.themeOffsetTop.push(this.$refs.scroll.$el.offsetTop);
      this.themeOffsetTop.push(this.$refs.params.$el.offsetTop);
      this.themeOffsetTop.push(this.$refs.comment.$el.offsetTop);
      this.themeOffsetTop.push(this.$refs.recommend.$el.offsetTop);
    },
    themeClick(index) {
      //console.log(-this.themeOffsetTop[index]+45);
      //点击导航栏滚动到响应位置
      this.$refs.scroll.scroll.scrollTo(0, -this.themeOffsetTop[index]+45, 1000);
    },
    scrollPosition(position) {//监听scroll滚动位置
      const positionY = position.y;
      const length = this.themeOffsetTop.length;  
      for(let i=0;i<length;i++){
        if(
        i != this.navCurrentIndex
        && ((i < length-1) && (positionY <= -this.themeOffsetTop[i]+45 && positionY > -this.themeOffsetTop[i+1]+45)
        || (i == length-1) && (positionY <= -this.themeOffsetTop[i]+45)
        )){
          this.navCurrentIndex = i;
          //console.log(i)
          this.$refs.topbar.currentIndex = i;
        }
      }
      //totop的显示与隐藏
      -positionY > 1000 ? this.isShowToTop = true:this.isShowToTop = false;
    },
    //将商品信息送到store中（vuex），以便购物车页面展示
    addToCart() {
      const product = {}
      product.image = this.topImgArray[0];
      product.title = this.itemBaseInfo.title;
      product.desc = this.itemBaseInfo.desc;
      product.price = this.itemBaseInfo.realPrice;
      product.id = this.id;
      product.count = 0;
      //将数据提交给vuex
      this.$store.dispatch('addCart', product).then(res => {
        //console.log(res);
        //console.log(this.$toast)
        //this.$toast.methods.show(res, 2000)
        this.$refs.toast.show(res, 2000);
      })
      /*上面代码是actions中返回的promise对象，通过promise可以获得actions做的操作
        注意 ： actions和getters一样也有mapActions映射，省去写$store。。。
      */
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
    height: calc(100vh - 44px - 59px);
    overflow: hidden;
  }
</style>