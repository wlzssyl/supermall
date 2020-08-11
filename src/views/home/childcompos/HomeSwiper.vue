<template>
  <swiper>
      <swiper-item v-for="(item,index) in probanner" :key="index">
        <a v-bind:href="item.link">
          <img v-bind:src="item.image" alt="" @load="swiperImgLoad">
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
  },
  data() {
    return {
      isLoad:false
    }
  },
  methods:{
    swiperImgLoad() {
      if(!this.isLoad){
        this.$emit('swiperImgLoad');
        this.isLoad = true;
      }
    }
  }
}
</script>

<style>

</style>