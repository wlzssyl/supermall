<template>
<div class="recommends">
  <div v-for="item in recommend" :key="item.title">
    <a :href="item.link">
      <img :src="item.image" alt="">
    </a>
    <p>{{item.title}}</p>
  </div>
</div>
 
</template>

<script>
export default {
  props:{
    recommend:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style>
  .recommends{
    display: flex;
    justify-content: space-around;
    padding: 10px 0 20px;
    border-bottom: 10px solid #ddd;
  }
  .recommends>div{
    width: 20%;
  }
  .recommends img{
    width: 100%;
  }
  .recommends p{
    font-size: 12px;
    text-align: center;
  }
</style>