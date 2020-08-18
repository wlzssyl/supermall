<template>
  <div class="detali-image">
    <div class="detail-desc">
      {{detailDesc[0]}}
    </div>
    <div class="det-image">
      <p>{{detailDesc[1]}}</p>
      <img :src="value" v-for="value in detailImage" :key="value"
        @load="iamgeLoad">
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      imageCount:0
    }
  },
  props:{
    detailDesc:{
      type:Array,
      default() {
        return []
      }
    },
    detailImage:{
      type:Array,
      default() {
        return []
      }
    }
  },
  methods:{
    iamgeLoad(){//等图片加载完了刷新一下better-scroll
      ++this.imageCount;
      if(this.imageCount === this.detailImage.length)
        this.$emit('scrollRefresh');
    }
  }
}
</script>

<style>
  .detali-image{
    margin: 0 12px;
    background-color: #fff;
  }
  .det-image{
    width: 100%;
    margin: 0 auto;
  }
  .det-image img{
    width: 100%;
  }
  .det-image p{
    color: #444;
    margin: 10px 0 4px 0;
  }
  .detail-desc{
    margin-top: 20px;
    font-size: 14px;
    color: #888;
  }
</style>