<template>
  <div class="goods-list">
    <goods-item v-for="(value,index) in list" :key="index"
      :item="value"></goods-item>
  </div>
</template>

<script>
import GoodsItem from './GoodsItem'

export default {
  components:{
    GoodsItem
  },
  props:{
    list:{
      type:Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
  .goods-list{
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    width: 100%;
    background-color: #eee;
    padding: 0 0px 0;
  }
</style>