'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('../config')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  watch: true,
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    compress: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    host: 'localhost',
    port: config.dev.port,
    open: true,
    overlay: { warnings: false, errors: true },
    publicPath: config.dev.assetsPublicPath,
    quiet: true,
    historyApiFallback: true,
    watchOptions: {
      poll: true
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
