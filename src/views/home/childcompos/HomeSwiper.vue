<template>
  <swiper>
      <swiper-item v-for="(item,index) in probanner" :key="index">
        <a v-bind:href="item.link">
          <img v-bind:src="item.image" alt="">
        </a>
      </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index.js'


export default {
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    probanner:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style>

</style>