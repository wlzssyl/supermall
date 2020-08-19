<template>
  <div class="cart-item">
    <div class="cart-item-info" v-for="(value,index) in product" :key="index+'cart'">
      <div class="item-image">
        <img :src="value.image" alt="">
      </div>
    </div> 
  </div>
</template>

<script>
export default {
  props:{
    product:{
      type:Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
  .cart-item-info{
    margin: 4px 0;

  }
  .item-image{
    width: 130px;
    height: 160px;
    overflow: hidden;
  }
  .item-image img{
    width: 100%;
  }
</style>