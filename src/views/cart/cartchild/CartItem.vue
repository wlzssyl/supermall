<template>
  <div class="cart-item">
    <div class="cart-item-info" v-for="(value,index) in product" :key="index+'cart'">
      <cart-check @click.native="isSelected(value)"
        :is-check="value.isCheck"></cart-check>
      <div class="item-image" @click="infoClick(value)">
        <img :src="value.image" alt="">
      </div>
      <div class="item_info" @click="infoClick(value)">
        <p class="item_title">{{ value.title }}</p>
        <p class="item_desc">{{ value.desc }}</p>
        <span class="item_price">￥{{ value.price }}</span>
        <span class="item_count">x{{ value.count }}</span>
      </div>
    </div> 
  </div>
</template>

<script>
import CartCheck from './CartCheck'
export default {
  components:{
    CartCheck
  },
  props:{
    product:{
      type:Array,
      default() {
        return []
      }
    }
  },
  data() {
    return{
      isSelect:false
    }
  },
  methods:{
    infoClick(value) {
      console.log(value)
      this.$router.push('details/'+value.id)
    },
    isSelected(value) {
      value.isCheck = !value.isCheck;
    }
  }
}
</script>

<style>
  .cart-item-info{
    width: 100%;
    height: 7rem;
    border-bottom: 0.04rem solid rgba(128, 128, 128, 0.4);
    display: flex;
    padding: 0.4rem;
    padding-left: 0rem;
  }
  
  .item-image{
    width: 4.5rem;
    height: 100%;
  }
  .item-image img{
    width: 100%;
    height: 100%;
    border-radius: 0.4rem;
  }

  .item_info {
  position: relative;
  width: calc(90% - 3.5rem - 1.2rem - 0.4rem);
  margin-left: 0.4rem;
  }
  .item_info p {
    display: inline-block;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .item_title {
    font-size: 0.85rem;
    padding-bottom: 0.5rem;
  }
  .item_desc {
    font-size: 0.75rem;
    color: gray;
  }
  .item_price {
    position: absolute;
    left: 0;
    bottom: 0.4rem;
    font-size: 1rem;
    color: orangered;
  }
  .item_count {
    position: absolute;
    right: 0.4rem;
    bottom: 0.4rem;
    font-size: 0.85rem;
  }
</style>