module.exports = {
  //关闭语法检查
  lintOnSave: false,

  chainWebpack:config=>{
    //发布模式
    config.when(process.env.NODE_ENV === 'production',config => {
      config.entry('app').clear().add('./src/main-prod.js')
    })
    config.set('externals',{
      vue:'Vue',
      'element-ui': 'ELEMENT',
      echarts:'echarts'
    })
    config.plugin('html').tap(args => {
      args[0].isProd = true
      return args
    })
    //开发模式
    config.when(process.env.NODE_ENV === 'development',config => {
      config.entry('app').clear().add('./src/main-dev.js')
    })
    config.plugin('html').tap(args => {
      args[0].isProd = false
      return args
    })
  },

  publicPath: './',
  outputDir: 'docs'
}