<template>
  <div id="home">
    <nav-bar class="home-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper v-bind:probanner="banner"></home-swiper>
    <home-recommend :recommend="recommend"></home-recommend>
    <home-ad></home-ad>
    <tab-control :name="['流行','新款','精选']"></tab-control>

  <ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
  </div>
</template>

<script>
import HomeSwiper from './childcompos/HomeSwiper'
import HomeRecommend from './childcompos/HomeRecommend'
import HomeAd from './childcompos/HomeAd'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/TabControl'

import {getHomeMultidata, getHomeGoods} from 'network/home'

export default {
  components:{
    HomeSwiper,
    HomeRecommend,
    HomeAd,
    NavBar,
    TabControl
  },
  data(){
    return {
      results:null,
      banner:[],
      recommend:[],
      //商品数据
      goods:{
        pop:{page:0, list:[]},
        new:{page:0, list:[]},
        sell:{page:0, list:[]}
      }
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
        console.log(res.data);
        this.goods[type].list.push(...res.data.data.list);
        //这里的.push(...[]) 解构
      })
    }
  }
}
</script>

<style>
  .home-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>