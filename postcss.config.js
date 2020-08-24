module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, //视口宽度，
      viewportHeight: 667, //视口高度（可不配置）
      unitPrecision: 5,  //指定px转换为视口单位后的小数位数
      viewportUnit: 'vw', //指定需要转换后的单位，一边为vw
      selectorBlackList: ['ignore'], //这个是设置不用转换的类名
      minPixelValue: 1,  //小于等于1px的不转换
      mediaQuery: false //是否允许媒体查询的px也转换
    }
  }
}