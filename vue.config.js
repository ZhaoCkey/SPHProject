const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // productionSourceMap:false,// 关闭打包时的map文件生成-调试好之后打包可以省资源。
  transpileDependencies: true,
  lintOnSave:false,
  // 关闭eslint--lintOnSave：false
  // 代理跨域
  devServer:{
    proxy:{
        '/api':{
          target : 'http://gmall-h5-api.atguigu.cn/',
          
        },
    }
  },

})
