<template>
  <div id="cart">
    <nav-bar class="cart-topbar">
      <div slot="center">购物车({{cartListLength}})</div>
    </nav-bar>
    <better-scroll class="cart-content" ref="scroll">
      <cart-list></cart-list>
    </better-scroll>  
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import BetterScroll from 'components/common/BScroll/BetterScroll'

import CartList from './cartchild/CartList'

import { mapGetters } from 'vuex' //mapGetters能直接映射vuex中的getters中的数据

export default {
  components:{
    NavBar,
    BetterScroll,
    CartList
  },
  computed:{
    ...mapGetters([ //1.数组使用方法
      'cartListLength',
    ])//2.对象使用方法,可以再起个名字
     // ...mapGetters({length:'cartListLength'})
  },
  activated() {
    this.$refs.scroll.scroll.refresh();
  }
}
</script>

<style>
  #cart{
    height: 100vh;
    position: relative;
  }
  .cart-topbar{
    position: relative;
    top: 0;
    height: 44px;
    width: 100%;
    background-color: var(--color-tint);
    color: #fff;
    z-index: 9;
  }
  .cart-content{
    height: calc(100vh - 44px - 49px);
    overflow: hidden;
  }
</style>