var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: 'edwards-voice.js',
    libraryTarget: 'window',
    library: 'EdwardsVoice'
  },
  externals: {
    'vue': 'Vue',
    'vuetify': 'Vuetify',
    'axios': 'axios'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: false,
      sourceMap: false
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/edwards-voice.css')
    }),
  ]
})

module.exports = webpackConfig
