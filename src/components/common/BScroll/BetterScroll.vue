<template>
  <div class="wrapper" ref="wrap">
    <div class="scroll-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      scroll:null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrap,{
      click:true, //click为true，开放获取点击事件
      probeType:this.probeType, //3,任何时候都监测滚动位置，2，只有点击时监测，0、1不检测
      pullUpLoad:this.pullUpLoad //下拉加载
      /* 使用方法为.on('pullingUp',()=>{...})*/
    });
    this.scroll.on('scroll',(position) => {//监测滚动到哪个位置
      this.$emit('scroll',position);
    });
    if(this.pullUpLoad == true){
      this.scroll.on('pullingUp',() => {//上拉加载更多
      this.$emit('loadMore');
    })
    }

  },
  methods:{
    refresh() {
      if(this.scroll)
      this.scroll.refresh();
    }
  }
}
</script>

<style>

</style>