/**
 * @author: Storm
 * @date: 2019-07-08
 * @email: wenyejie@foxmail.com
 */
const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

// styleLoader
// 'style-loader', // 将 JS 字符串生成为 style 节点
// MiniCssExtractPlugin.loader 必须放在第一位
// https://webpack.docschina.org/loaders/css-loader
const styleLoader = () => [
  isProd ? {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../'
    }
  } : 'style-loader',
  {
    loader: 'css-loader',
    options: {
      sourceMap: true
    }
  } // 将 CSS 转化成 CommonJS 模块
]

const webpackConfig = {
  mode: isProd ? 'production' : 'development',
  entry: {
    app: ['./src/main.js']
  },
  output: {
    filename: 'js/[name].[contenthash:8].js',
    path: path.resolve(__dirname, 'dist')
  },

  // 开发工具, source map
  devtool: isProd ? 'nosources-source-map' : 'eval-source-map',

  // 开发服务器
  devServer: {
    contentBase: './dist'
  },

  // 模块
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          'cache-loader'
        ]
      },
      {
        test: /\.css$/,
        use: styleLoader()
      },
      {
        test: /\.scss$/,
        use: [
          ...styleLoader(),
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
              name () {
                return isProd ? 'img/[name].[contenthash:8].[ext]' : '[path][name].[ext]'
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
              name () {
                return isProd ? 'fonts/[name].[contenthash:8].[ext]' : '[path][name].[ext]'
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // vue loader
    new VueLoaderPlugin(),

    // 处理html https://github.com/jantimon/html-webpack-plugin
    new HtmlWebpackPlugin({
      title: 'vue-cli title test',
      minify: isProd,
      chunks: ['app', 'vendor'],
      template: './publish/index.html',
      filename: 'index.html'
    }),

    // 代码分割
    new webpack.optimize.SplitChunksPlugin({
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        runtimeChunk: true,
        vendors: {
          chunks: 'all',
          test: /node_modules/,
          maxInitialRequests: 5,
          minSize: 0,
          name: 'vendor'
        }
      }
    }),

    // 传入全局参数
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '\'' + process.env.NODE_ENV + '\'',
        BUILD_ENV: '\'' + process.env.BUILD_ENV + '\''
      }
    })
  ]
}

if (isProd) {
  webpackConfig.plugins.push(

    // 清理文件夹
    new CleanWebpackPlugin(),

    // css提取
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[id].[contenthash:8].css'
    })
  )

  webpackConfig.optimization = {

    // 压缩
    minimizer: [

      // js压缩
      new TerserJSPlugin({
        parallel: true,
        sourceMap: true
      }),

      // css压缩
      new OptimizeCSSAssetsPlugin({})
    ],

    // 代码防止重复 https://webpack.docschina.org/guides/code-splitting
    /*splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        styles: {
          name: 'app',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }*/
  }
}


module.exports = webpackConfig
