<template>
  <div>
    <swiper  class="top-img-swiper">
      <swiper-item v-for="(value,index) in topImg" :key="index"
      >
        <img v-bind:src=value alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    topImg:{
      type:Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
  .top-img-swiper{
    height: 300px;
  }
</style>