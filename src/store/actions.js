export default {
  addCart(context, payload) {
    //let oldProduct = null;
    let oldProduct = context.state.cartList.find( item => {
      return item.id === payload.id;
      //数组.find()方法传入的函数返回true时，会将该次item返回出来
    });
    if(oldProduct){
      context.commit('addCount', oldProduct);
    }else{
      payload.count = 1;
      context.commit('addProduct', payload)
    }
  }
}