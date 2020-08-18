<template>
  <div class="details-bottom-bar">
    <div class="customer-service">
      <i class="iconfont icon-icon-test"></i>
      <p>客服</p>
    </div>
    <div class="item-collection">
      <i class="iconfont icon-shoucang"></i>
      <p>收藏</p>
    </div>
    <div class="shop-go">
      <i class="iconfont icon-shop"></i>
      <p>店铺</p>
    </div>
    <div class="add-to-cart" @click="addToCart">加入购物车</div>
    <div class="buy-item">购买</div>
  </div>
</template>

<script>
export default {
  methods:{
    addToCart() {
      this.$emit('addToCart');
    }
  }
}
</script>

<style>
  .details-bottom-bar{
    z-index: 199;
    display: flex;
    position: fixed;
    background-color: #fff;
    width: 100%;
    height: 59px;
    bottom: 0;
    right: 0;
  }
  .customer-service,
  .shop-go,
  .item-collection{
    flex: 1 0 auto;
    font-size: 18px;
    text-align: center;
    padding: 10px 0;
  }
  .customer-service i,
  .shop-go i,
  .item-collection i{
    font-size: 24px;  
  }
  .customer-service i {
    color: var(--color-tint);
  }
  .add-to-cart{
    flex: 1 0 auto;
    color: #333;
    background-color: yellow;
    font-size: 19px;
    line-height: 59px;
    text-align: center;
  }
  .buy-item{
    flex: 1 0 auto;
    background-color: var(--color-high-text);
    font-size: 20px;
    line-height: 59px;
    color: #fff;
    text-align: center;
    width: 20%;
  }
</style>