'use strict'
const config = require('../config')
const path = require('path')

module.exports = {
  resolve: function (dir) {
    return path.join(__dirname, '..', dir)
  },

  assetsPath: function (_path) {
    var assetsSubDirectory = process.env.NODE_ENV === 'production'
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
  }
}
