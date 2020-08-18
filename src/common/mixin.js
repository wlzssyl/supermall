export const mixinTop = {
  methods:{
    toTop() {
      //this.$refs.scroll拿到scroll组件，
      //然后调用组件中betterscroll对象的.scrollTo()方法
      this.$refs.scroll.scroll.scrollTo(0,0,600);
      //.scrollTo( X, Y , 时间)
    }
  },
  data() {
    return {
      isShowToTop:false
    }
  }
}
/**
 * minxins 混入
 *  - 可以将不同组件相同的js代码抽离出来。如上所示的methods，data等
 *  - 在组件中引入该mixin混入，可以将其内容并入到组件中
 *  - 用法：引入后，mixins:[mixin对象]
 * 
 * 如上面的例子，mixinTop作为混入对象就能并入到其他组建的methods中，被组件使用
 */