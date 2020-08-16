<template>
  <div id="home">
    <!-- 页面顶部 -->
    <nav-bar class="home-bar">
        <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :name="['流行','新款','精选']"
      @tabClick="tabClick" ref="tabControl2"
      class="tab-control2" v-show="isShowTabControl"></tab-control>
    <!-- 滚动区域 -->
    <better-scroll class="home-content" ref="scroll" 
      :probe-type="3" @scroll="showToTop"
      :pull-up-load="true" @loadMore="getNewGoods">

      <home-swiper v-bind:probanner="banner"
      @swiperImgLoad="getOffset"></home-swiper>

      <home-recommend :recommend="recommend"></home-recommend>

      <home-ad></home-ad>

      <tab-control :name="['流行','新款','精选']"
        @tabClick="tabClick" ref="tabControl1"></tab-control>

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
import {debounce} from 'common/utils'
import { mixinTop } from 'common/mixin'

export default {
  //混入mixins
  mixins: [mixinTop],
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
      isShowToTop:false, //回到顶部隐藏和显示
      conOffsetTop:0 ,  //tabcontrol距离顶部的距离
      isShowTabControl:false, //tabcontrol显示与隐藏
      activatedY:0   //离开时位置
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,100);
    this.$bus.$on('itemLoad', () => {
      //修复better-scroll的bug
      //this.$refs.scroll.refresh();
      refresh();
    })
  },
  created() {
    //获取home页主要数据
    this.MgetHomeMultidata();
    //获取home页商品数据
    this.MgetHomeGoods('pop');
    this.MgetHomeGoods('new');
    this.MgetHomeGoods('sell');
  },
  activated() {
    //回到离开时位置
    this.$refs.scroll.scroll.refresh();
    this.$refs.scroll.scroll.scrollTo(0, this.activatedY, 0); 
  },
  deactivated() {
    //记录离开位置
    this.activatedY = this.$refs.scroll.scroll.y;
  },
  methods:{
    /**
     * 点击事件函数
     */
    tabClick(index) {//
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
      //将两个tabcontrol的currentIndex设置一致
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    getOffset() {//获取tabcontrol的位置
      this.conOffsetTop = this.$refs.tabControl1.$el.offsetTop;
    },
    // toTop() {
    //   //this.$refs.scroll拿到scroll组件，
    //   //然后调用组件中betterscroll对象的.scrollTo()方法
    //   this.$refs.scroll.scroll.scrollTo(0,0,600);
    //   //.scrollTo( X, Y , 时间)
    // },
    /**
     * 监听事件
     */
    showToTop(position) {
      //控制回到顶部按钮显示与隐藏 1000px
      -position.y > 1000 ? this.isShowToTop = true:this.isShowToTop = false;

      //控制tabcontrol2显示与隐藏
      -position.y > this.conOffsetTop ? this.isShowTabControl = true:this.isShowTabControl = false;
    },
    getNewGoods() {
      this.MgetHomeGoods(this.currentType);

      //修复better-scroll的原有bug
      //this.$refs.scroll.scroll.refresh();
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

        //.finishPullUp方法是scroll对象在上拉加载更多后需要回调的方法
        //否则加载一次就不会再加载了
        this.$refs.scroll.scroll.finishPullUp();
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
  .tab-control2{
    position: relative;
  }
</style>