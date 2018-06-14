const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

const config = {
    entry: {index: './index.js'},
    output: {
      path: path.resolve(__dirname, './build'),
      filename: './[name].js',
    },
    module: {
      rules: [
        {test: /\.vue$/, exclude: /node_modules/, loader: 'vue-loader'},
      ]
    },
    plugins: [
      new VueLoaderPlugin()
    ]
  }
;

module.exports = config;