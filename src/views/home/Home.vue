<template>
  <div id="home">
    <nav-bar class="home-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper v-bind:probanner="banner"></home-swiper>
    <home-recommend :recommend="recommend"></home-recommend>
    <home-ad></home-ad>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childcompos/HomeSwiper'
import HomeRecommend from './childcompos/HomeRecommend'
import HomeAd from './childcompos/HomeAd'

import {getHomeMultidata} from 'network/home'

export default {
  components:{
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeAd
  },
  data(){
    return {
      results:null,
      banner:[],
      recommend:[]
    }
  },
  created(){
    getHomeMultidata().then(res => {
      this.results = res;
      this.banner = res.data.data.banner.list;
      this.recommend = res.data.data.recommend.list;
    })
  }
}
</script>

<style>
  .home-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>