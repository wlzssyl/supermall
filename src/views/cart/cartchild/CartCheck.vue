<template>
  <div class="item-select">
        <i class="iconfont icon-checksurface"
          :class="{select:isCheck}"></i>
  </div>
</template>

<script>
export default {
  props:{
    isCheck:{
      type:Boolean,
      default() {
        return false
      }
    }
  }
}

</script>

<style>
  .item-select{
    line-height: 7rem;
  }
  .item-select i{
    font-size: 2rem;
    color: #bbb;
  }
  .item-select .select{
    color: var(--color-tint);
  }
</style>