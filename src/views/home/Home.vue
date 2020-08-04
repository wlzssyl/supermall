<template>
  <div id="home">
    <nav-bar class="home-bar">
      <div slot="center">购物街</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {getHomeMultidata} from 'network/home'

export default {
  components:{
    NavBar
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