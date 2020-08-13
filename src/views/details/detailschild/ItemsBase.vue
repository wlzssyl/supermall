<template>
  <div v-if="Object.keys(itemBaseInfo).length !== 0">
    <div class="item-title-price">
      <p class="items-title">{{itemBaseInfo.title}}</p>
      <p>
        <span class="new-price">{{itemBaseInfo.newPrice}}</span>
        <span class="old-price">{{itemBaseInfo.oldPrice}}</span>
        <span class="item-discount">{{itemBaseInfo.discount}}</span>
      </p>
    </div>
    <div class="item-numInfo">
      <span>{{itemBaseInfo.columns[0]}}</span>
      <span>{{itemBaseInfo.columns[1]}}</span>
      <span>{{itemBaseInfo.services[0].name}}</span>
    </div>
    <div class="item-services">
      <span v-for="value in itemBaseInfo.services.length-1" :key="value">
        <img :src="itemBaseInfo.services[value].icon" alt="">
        <span>{{itemBaseInfo.services[value].name}}</span>
      </span>
    </div>
    <br>
  </div>
</template>

<script>
export default {
  props:{
    itemBaseInfo:{
      type:Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style>
  .item-title-price{
    padding: 16px 12px 12px 12px;
    
  }
  .item-title-price .items-title{
    font-weight: bold;
    color: #444;
    margin-bottom: 12px;
  }
  .item-title-price .new-price{
    color: var(--color-high-text);
    font-size: 22px;
  }
  .item-title-price .old-price{
    color: #aaa;
    text-decoration: line-through;
    font-size: 12px;
    margin: 0 4px;
  }
  .item-title-price .item-discount{
    font-size: 12px;
    color: #fff;
    background-color: var(--color-high-text);
    vertical-align: top;
    padding: 3px;
    border-radius: 10px;
  }
  .item-numInfo{
    font-size: 14px;
    color: #888;
    display: flex;
    justify-content: space-between;
    margin: 0 12px 8px 12px;
  }
  .item-services{
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    margin: 0 12px;
    border-bottom: solid 1px #ddd;
    border-top: solid 1px #ddd;
    padding: 16px 0;
  }
  .item-services img{
    width: 14px;
    vertical-align: middle;
  }
</style>