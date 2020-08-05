<template>
  <div id="home">
    <nav-bar class="home-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper v-bind:probanner="banner"></home-swiper>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childcompos/HomeSwiper'

import {getHomeMultidata} from 'network/home'

export default {
  components:{
    NavBar,
    HomeSwiper 
  },
  data(){
    return {
      results:null,
      banner:[]
    }
  },
  created(){
    getHomeMultidata().then(res => {
      this.results = res;
      this.banner = res.data.data.banner.list;
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