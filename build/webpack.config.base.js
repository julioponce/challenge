'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('../config')
const utils = require('./utils')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: {
    app: [
      './src/main.js'
    ]
  },
  output: {
    path: config.build.assetsRoot,
    filename: devMode ? '[name].js' : '[name].[hash].js',
    publicPath: devMode ? config.dev.assetsPublicPath : config.build.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': utils.resolve('src'),
      'static': utils.resolve('static')
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        exclude: '/node_modules/',
        use: {
          loader: 'eslint-loader',
          options: {
            quiet: true,
            failOnWarning: false,
            failOnError: true
          }
        }
      }, {
        test: /\.vue$/,
        use: 'vue-loader'
      }, {
        test: /\.js$/,
        exclude: '/(node_modules)/',
        use: {
          loader: 'babel-loader'
        }
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: devMode ? utils.assetsPath('img/[name].[ext]') : utils.assetsPath('img/[name].[hash:7].[ext]')
          }
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        include: [utils.resolve('src/assets/fonts')],
        exclude: [utils.resolve('static/img')],
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: devMode ? utils.assetsPath('fonts/[name].[ext]') : utils.assetsPath('fonts/[name].[hash:7].[ext]')
          }
        }
      }, {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                utils.resolve('src/assets/scss/beforeall.scss')
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : 'static/css/[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : 'static/css/[id].[hash].css'
    }),
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      chunksSortMode: 'none',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([{
      from: utils.resolve('static/img'),
      to: utils.resolve('dist/static/img'),
      toType: 'dir'
    }, {
      from: utils.resolve('src/assets/fonts'),
      to: utils.resolve('dist/static/fonts'),
      toType: 'dir'
    }])
  ]
}
