<template>
  <div class="tab-control">
    <div v-for="(value,index) in name" :key="value" class="tab-control-item"
     :class="{active:currentIndex === index}" @click="isClick(index)">
     <span>{{value}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    name:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      currentIndex:0
    }
  },
  methods:{
    isClick(index){
      this.currentIndex = index;
    }
  }
}
</script>

<style>
  .tab-control{
    display: flex;
    justify-content: space-around;
    line-height: 45px;
    background-color: #fff;
    position: sticky;
    top: 0;
  }
  .tab-control span{
    padding: 6px;
  }
  .tab-control-item{
    font-size: 16px;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 2px solid var(--color-tint);
  }
</style>