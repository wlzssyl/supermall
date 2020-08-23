<template>
  <div class="goods-item" @click="itemClick">
    <div>
      <img v-lazy="showImage" alt="" @load="imgLoad">
      <div class="item-text">
        <p>{{item.title}}</p>
        <span class="price">{{showPrice}}</span>   
        <span class="collect"><i class="iconfont icon-dianzan2"></i>{{item.cfav}}</span>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDetail:false
    }
  },
  props:{
    item:{
      type:Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imgLoad() {
      this.$bus.$emit('itemLoad');
    },
    itemClick() {
      if(this.isDetail == true){
         //是详情页内的商品列表
         
      }else{
        this.$router.push('/details/'+this.item.iid);
      }
    }
  },
  computed:{
    showImage() {
      if(this.item.image){
        this.isDetail = true;
        return this.item.image;
      }
      else{
        this.isDetail = false
        return this.item.show.img;
      }
    },
    showPrice() {
      if(this.isDetail == true){
        return '￥'+this.item.price
      }else{
        return this.item.orgPrice
      }
    }
  }
}
</script>

<style>
  .goods-item{
    /* 避免瀑布流把元素分割 */
    /* -webkit-column-break-inside: avoid; */
    width: 46%;
    background-color: #fff;
    position: relative;
    border-radius: 6px;
    margin-bottom: 8px;
    margin-left: 1vw;
  }
  .goods-item img{
    width: 100%;
    height: 40vh;
    border-radius: 6px 6px 0 0;
  }
  .goods-item .item-text{
    padding: 0 6px 6px 6px;
  }
  .goods-item p{
    font-size: 14px;
    font-weight: bold;
    /* 下面是多行文字省略样式 */
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .goods-item .price{
    color: var(--color-high-text);
    font-size: 15px;
  }
  .goods-item .collect{
    position: absolute;
    font-size: 12px;
    right: 10px;
  }
  .goods-item .collect i{
    font-size: 14px;
  }
</style>