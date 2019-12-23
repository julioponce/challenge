'use strict'
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const config = require('../config')
const utils = require('./utils')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

var webpackConfig = merge(baseConfig, {
  mode: 'production',
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  watch: false,
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    },
    minimize: true
  },
  module: {},
  plugins: [
    new UglifyJsPlugin({
      parallel: true,
      sourceMap: config.build.productionSourceMap,
      uglifyOptions: {
        warnings: false
      }
    })
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      filename: (info) => {
        return info.path
      },
      algorithm: 'gzip',
      minRatio: 1000
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(
    new BundleAnalyzerPlugin()
  )
}

module.exports = webpackConfig
