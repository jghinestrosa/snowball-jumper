const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function() {
  return {
    entry: path.resolve(__dirname, 'src/js/index.js'),
    output: {
      path: path.resolve(__dirname, 'dist/js'),
      filename: 'index.js'
    },
    module: {
      rules: [
        { test: /\.js$/, use: 'babel-loader' }
      ]
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: path.resolve(__dirname, 'src/css/main.css'), to: path.resolve(__dirname, 'dist/css/main.css')},
        { from: path.resolve(__dirname, 'src/index.html'), to: path.resolve(__dirname, 'dist/index.html')}
      ])
    ],
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      hot: true
    }
  };
};
