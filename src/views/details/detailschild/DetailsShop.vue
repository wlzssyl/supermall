<template>
  <div class="shop-infos">
    <div class="shop-logo-name">
      <div class="shop-logo">
        <img :src="shopInfo.logo" alt="">
      </div>
      <p class="shop-name">{{shopInfo.name}}</p>
    </div>
    <div class="shop-num-info">
      <div class="shop-sell-num">
        <p>{{sells}}</p>
        <p>总销量</p>
      </div>
      <div class="shop-fans-num">
        <p>{{shopInfo.fans}}</p>
        <p>粉丝数</p>
      </div>
      <div class="shop-score">
        <p v-for="(value,index) in shopInfo.score" :key="value.name" class="score-child">
          <span>{{value.name}}</span>
          <span :class="{better:isBetter(index)}" class="notBetter">{{value.score}}</span>
          <span v-if="isBetter(index)" :class="{lbetter:isBetter(index)}" class="score-logo">高</span>
          <span v-else :class="{lbetter:isBetter(index)}" class="score-logo">低</span>
          <span></span>
        </p>
      </div>
    </div>
    <div class="shop-url">
      <a :href="shopInfo.shopUrl">
        <span class="shop-url-span">进店逛逛</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    shopInfo:{
      type:Object,
      default() {
        return {}
      }
    }
  },
  computed:{
    sells() {
      return (this.shopInfo.sells/10000).toFixed(1)+'万';
    }
  },
  methods:{
    isBetter(index) {
      return this.shopInfo.score[index].isBetter
    }
  }
}
</script>

<style>
  .shop-infos{
    padding-bottom: 22px;
    border-bottom: solid 3px #ddd;
    background-color: #fff;
  }
/* 店家头像和id */
  .shop-logo-name{
    margin: 8px 12px;
    display: flex;
  }
  .shop-logo-name .shop-logo{
    width: 60px;
    border-radius: 50%;
    overflow: hidden;
  }
  .shop-logo-name .shop-logo img{
    width: 100%;
  }
  .shop-logo-name .shop-name{
    font-size: 18px;
    font-weight: bold;
    line-height: 60px;
    margin-left: 20px;
  }
/* shop信息 */
  .shop-num-info{
    margin: 16px 42px;
    display: flex;
    color: #444;
  }
  .shop-num-info .shop-sell-num,
  .shop-num-info .shop-fans-num{
    font-size: 17px;
    text-align: center;
    line-height: 28px;
  }
  .shop-num-info .shop-sell-num p,
  .shop-num-info .shop-fans-num p{
    padding: 4px;
    margin-right: 14px;
  }
  .shop-num-info .shop-score{
    position: relative;
    font-size: 15px;
    padding-left: 18px;
    border-left: solid 1px #ddd;
  }
  .shop-num-info .shop-score .score-child{
    margin-bottom: 10px;
  }
  .shop-num-info .shop-score .score-child span{
    margin-left: 4px;
  }
  .shop-num-info .shop-score .notBetter{
    color: rgb(22, 226, 15);
  }
  .shop-num-info .shop-score .score-logo{
    color: #fff;
    background-color: rgb(22, 226, 15);
    position: absolute;
    left: 120px;
  }
  .shop-num-info .shop-score .better{
    color: var(--color-tint);
  }
  .shop-num-info .shop-score .lbetter{
    background-color: var(--color-tint);
    position: absolute;
    left: 120px;
  }
  .shop-url{
    text-align: center;
  }
  .shop-url .shop-url-span{
    background-color: #eee;
    padding: 6px 40px;
    border-radius: 12px;
  }
</style>