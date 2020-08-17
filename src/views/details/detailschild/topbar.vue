<template>
  <nav-bar>
    <div slot="left" class="bar-left">
      <i class="iconfont icon-fanhui" @click="backHome"></i>
    </div>
    <div slot="center" class="bar-center">
      <div v-for="(value,index) in bar" :key="value"
      :class="{active:index === currentIndex}" class="center-items"
      @click="isActive(index)">
        {{value}}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  components:{
    NavBar
  },
  data() {
    return {
      bar:["商品","参数","评论","推荐"],
      currentIndex:0
    }
  },
  methods:{
    isActive(index) {
      this.currentIndex = index;
      this.$emit('themeTo',index);
    },
    backHome() {
      this.$router.back();
      //或者this.$router.go(-1);
    }
  }
}
</script>

<style>
  .bar-center{
    display: flex;
    justify-content: space-around;
  }
  .center-items{
    padding: 0 10px;
    font-size: 14px;
  }
  .active{
    color: var(--color-tint);
  }
  .bar-left{
    margin: 0 0 0 20px;
  }
</style>