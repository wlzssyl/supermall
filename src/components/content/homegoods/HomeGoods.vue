<template>
  <div>
    <div class="goods-before"></div>
    <div class="goods-list">
      <goods-item v-for="(value,index) in list" :key="index"
        :item="value"></goods-item>
    </div>
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
    /* 使用colum-count瀑布流 */
    column-count: 2;
    column-gap: 0;
    width: 100%;
    background-color: #eee;
    padding: 0 0px 0;
  }
  .goods-before{
    height: 8px;
    width: 100%;
    background-color: #eee;
  }
</style>