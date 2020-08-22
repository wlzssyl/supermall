<template>
    <div class="toast" v-show="isShow">
      <div>
        <p>{{message}}</p>
      </div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
  name:'Toast',
  data(){    
     return {
        message: 'aaa',
        isShow: false
     }
  },
  methods:{
    show(res, delay) {
      //console.log(res);
      this.message = res;
      this.isShow = true;
      //console.log(this.message);
      setTimeout(() => {
        this.isShow = false;
        this.message = '';
      }, delay);
    }
  }
}
</script>

<style>
  .toast{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 8px 10px;
    font-size: 18px;
    border-radius: 18px;
    z-index: 999;
  }
</style>