<template>
  <div class="cart-item-list">
    <cart-item :product="cartItems"></cart-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import CartItem from './CartItem'

export default {
  components:{
    CartItem
  },
  computed:{
    ...mapGetters([
      'cartItems'
    ])
  }
}
</script>

<style>
  .cart-list{
    height: 100%;
  }
</style>