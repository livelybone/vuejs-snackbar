const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

const config = {
  mode: 'production',
  entry: { index: './index.js' },
  output: {
    path: path.resolve(__dirname, './lib'),
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
        options: {
          presets: ['env'],
          env: {
            test: {
              plugins: ['istanbul'],
            },
          },
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};
module.exports = config;
