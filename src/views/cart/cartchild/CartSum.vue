<template>
  <div class="cart-sum">
    <div class="item-select-all" @click="selectAll"
      :class="{allSelect:isAllSelect}">
      <i class="iconfont icon-checksurface"></i>
      <span>全选</span>
    </div>
    <div class="price-sum">
      合计:￥{{totlePrice}}
    </div>
    <div class="go-buy">
      去结算({{totleCheck}})
    </div>
  </div>
</template>

<script>
export default {
  props:{
    cartListLength:{
      type:Number,
      default() {
        return 0
      }
    }
 },
  computed:{
    totlePrice() {
      let checkItem = this.$store.state.cartList.filter(item => {
        return item.isCheck; //过滤选择的商品
      });
      return checkItem.reduce((prev, cur) => {
        prev = prev + cur.count*cur.price;//将过滤后的商品迭代计算总价
        return prev;
      }, 0).toFixed(2);
    },
    totleCheck() {
      return this.$store.state.cartList.filter(item => {
        return item.isCheck;
      }).length;
    },
    isAllSelect() {
      // if(this.$store.state.cartList.filter(item => {
      //   return item.isCheck;
      // }).length
      // == this.$store.state.cartList.length){
      //   return true;
      // }else{
      //   return false;
      // }
      if(this.$store.state.cartList.length == 0) return false;
      return this.$store.state.cartList.every(item => {
        return item.isCheck;
      })
    }
 },
  methods:{
    selectAll() {
      if(this.isAllSelect){
        this.$store.state.cartList.forEach(element => {
          element.isCheck = false;
        });
      }else{
        this.$store.state.cartList.forEach(element => {
          element.isCheck = true;
        });
      }
     }
  }
}
</script>

<style>
  .cart-sum{
    position: fixed;
    display: flex;
    bottom: 49px;
    width: 100%;
    height: 50px;
    background-color: #eee;
    line-height: 50px;
    z-index: 99;
  }
  .item-select-all{
    flex: 1 0 auto;
    font-size: 16px;
  }
  .item-select-all i{
    font-size: 28px;
    line-height: 50px;
    color: #bbb;
  }
  .item-select-all span{
    vertical-align: top;
  }
  .price-sum{
    flex: 1 0 auto;
    font-size: 17px;
    color: orangered;
    text-align: center;
  }
  .go-buy{
    flex: 0 0 130px;
    color: #fff;
    background-color: var(--color-high-text);
    text-align: center;
    font-size: 18px;
    height: 40px;
    border-radius: 20px;
    vertical-align: center;
    margin-top: 5px;
    line-height: 40px;
  }
  .allSelect,
  .allSelect i{
    color: var(--color-tint);
  }
</style>