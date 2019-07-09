/**
 * @author: Storm
 * @date: 2019-07-08
 * @email: wenyejie@foxmail.com
 */
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// const isProd = process.env.NODE_ENV === 'production'
const isProd = true

const MiniCssExtractPluginLoader = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    publicPath: '../'
  }
}

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          isProd ? MiniCssExtractPluginLoader : 'style-loader', // MiniCssExtractPlugin.loader 必须放在第一位
          // 'style-loader', // 将 JS 字符串生成为 style 节点
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          } // 将 CSS 转化成 CommonJS 模块
        ]
      },
      {
        test: /\.scss$/,
        use: [
          isProd ? MiniCssExtractPluginLoader : 'style-loader',
          // 'style-loader', // 将 JS 字符串生成为 style 节点
          'css-loader', // 将 CSS 转化成 CommonJS 模块 https://webpack.docschina.org/loaders/css-loader
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          } // 将 Sass 编译成 CSS，默认使用 Node Sass
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|webp|jpeg)$/,
        use: [
          {
            loader: 'file-loader', // https://webpack.docschina.org/loaders/file-loader
            options: {
              limit: 1024, // 当图片小于1kb时, 打包成base64
              outputPath: 'img',
              name () {
                return isProd ? '[name].[hash:7].[ext]' : '[path][name].[ext]'
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader', // https://webpack.docschina.org/loaders/file-loader
            options: {
              limit: 1024, // 当图片小于1kb时, 打包成base64
              outputPath: 'fonts',
              name () {
                return isProd ? '[name].[hash:7].[ext]' : '[path][name].[ext]'
              }
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    // css提取
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css'
    }),

    // 处理html https://github.com/jantimon/html-webpack-plugin
    new HtmlWebpackPlugin({
      title: 'vue-cli title test',
      minify: true,
      template: './publish/index.html',
      filename: 'index.html'
    }),

    // 清理文件夹
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['dist']
    })
  ]
}
