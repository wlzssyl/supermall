export default {
  addCount(state, payload) {
    payload.count++;
  },
  addProduct(state, payload) {  
    state.cartList.push(payload);
  }

  /*addCart(state, payload) {
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
    }*/
    //由于mutations中建议做简单的操作，复杂的逻辑操作建议放在actions中
}