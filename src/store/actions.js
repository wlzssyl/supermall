
export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find( item => {
        return item.id === payload.id;
        //数组.find()方法传入的函数返回true时，会将该次item返回出来
      });
      if(oldProduct){
        context.commit('addCount', oldProduct);
        resolve('当前商品数量+1');
      }else{
        payload.count = 1;
        context.commit('addProduct', payload);
        resolve('添加了新商品');
      }
    })
  }
}