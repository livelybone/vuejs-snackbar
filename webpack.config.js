const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

const config = {
  entry: { index: './index.js' },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: './[name].js',
    library: 'VueSnackbar',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      { test: /\.vue$/, exclude: /node_modules/, loader: 'vue-loader' },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: ['env'] },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};
module.exports = config;
