const { override, fixBabelImports, addLessLoader, addWebpackAlias, addDecoratorsLegacy, addWebpackModuleRule } = require('customize-cra')
const path = require('path')

// 当打包上线时，打包后我们会发现静态文件夹中会有很多的css和js的map文件(这样子源文件就被暴露出来了，不安全，应该关掉源映射)，那么我们该怎么关闭sourcemap呢？如下所示：
process.env.GENERATE_SOURCEMAP = "false"

module.exports = override(
  //配置根路径别名
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  }),
  //配置装饰器
  addDecoratorsLegacy(),
  //按需加载antd
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
   //配置使用less，及改变antd的主题
   addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' },
  }),
  //addWebpackModuleRule将提供的规则添加到webpack配置的module.rules数组中。链接https://github.com/arackaf/customize-cra/blob/master/api.md
  //配置less module的less样式模块化编程，这样类似于vue的scoped，不污染命名空间，命名不会冲突。
  addWebpackModuleRule({
    test: /\.module\.less$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          // importLoaders: 2,
          // 0 => no loaders (default);
          // 1 => postcss-loader;
          // 2 => postcss-loader, sass-loader
          modules: {
            localIdentName: '[folder]_[local]__[hash:base64:5]',
          },
        },
      },
      'less-loader',
    ],
  }),
)