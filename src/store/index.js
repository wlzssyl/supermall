import Vue from 'vue'
import  Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    cartList:[]
  },
  mutations:{
    addCart(state, payload) {
      //let oldProduct = null;
      let oldProduct = state.cartList.find( item => {
        return item.id === payload.id;
        //数组.find()方法传入的函数返回true时，会将该次item返回出来
      });
      if(oldProduct){
        oldProduct.count++;
      }else{
        payload.count = 1;
        state.cartList.push(payload);
      }
    }
  }
})

export default store