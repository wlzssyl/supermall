<template>
  <div id="home">
    <!-- 页面顶部 -->
    <nav-bar class="home-bar">
        <div slot="center">购物街</div>
    </nav-bar>
    <!-- 滚动区域 -->
    <better-scroll class="home-content" ref="scroll" 
      :probe-type="3" @scroll="showToTop">
      <home-swiper v-bind:probanner="banner"></home-swiper>
      <home-recommend :recommend="recommend"></home-recommend>
      <home-ad></home-ad>
      <tab-control :name="['流行','新款','精选']"
        @tabClick="tabClick"></tab-control>
      <home-goods :list="goods[currentType].list"></home-goods>
    </better-scroll>
    <!-- 回到顶部按钮 -->
    <back-top @click.native="toTop" v-show="isShowToTop"></back-top>
    <!-- 这里的.native使组件的点击可以被监控 -->
 
  </div>
</template>

<script>
import HomeSwiper from './childcompos/HomeSwiper'
import HomeRecommend from './childcompos/HomeRecommend'
import HomeAd from './childcompos/HomeAd'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/TabControl'
import HomeGoods from 'components/content/homegoods/HomeGoods'
import BetterScroll from 'components/common/BScroll/BetterScroll'
import BackTop from 'components/content/backtop/BackTop'

import {getHomeMultidata, getHomeGoods} from 'network/home'

export default {
  components:{
    HomeSwiper,
    HomeRecommend,
    HomeAd,
    NavBar,
    TabControl,
    HomeGoods,
    BetterScroll,
    BackTop
  },
  data(){
    return {
      results:null,
      banner:[],
      recommend:[],
      //商品数据
      goods:{
        'pop':{page:0, list:[]},
        'new':{page:0, list:[]},
        'sell':{page:0, list:[]}
      },
      currentType:'pop', //记录当前活跃的模块
      isShowToTop:false //回到顶部隐藏和显示
    }
  },
  created(){
    //获取home页主要数据
    this.MgetHomeMultidata();
    //获取home页商品数据
    this.MgetHomeGoods('pop');
    this.MgetHomeGoods('new');
    this.MgetHomeGoods('sell');
  },
  methods:{
    /**
     * 点击事件函数
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
    },
    toTop() {
      //this.$refs.scroll拿到scroll组件，
      //然后调用组件中betterscroll对象的.scrollTo()方法
      this.$refs.scroll.scroll.scrollTo(0,0,600);
      //.scrollTo( X, Y , 时间)
    },
    showToTop(position) {
      -position.y > 1000 ? this.isShowToTop = true:this.isShowToTop;
    },
    /**
     * 网络请求函数
     */
    MgetHomeMultidata() {
      getHomeMultidata().then(res => {
        this.results = res;
        this.banner = res.data.data.banner.list;
        this.recommend = res.data.data.recommend.list;
      }).catch(err => console.log(err));
    },
    MgetHomeGoods(type) {
      const page = ++this.goods[type].page;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.data.list);
        //这里的.push(...[]) 解构
      })
    }
  }
}
</script>

<style>
  #home{
    position: relative;
    height: 100vh;
    background-color: #eee;
  }
  .home-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
  .home-content{
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
  }
</style>