const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
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
      new UglifyJsPlugin(),
      new CopyWebpackPlugin([
        { from: path.resolve(__dirname, 'src/assets'), to: path.resolve(__dirname, 'dist/assets')},
        { from: path.resolve(__dirname, 'src/css/main.css'), to: path.resolve(__dirname, 'dist/css/main.css')},
        { from: path.resolve(__dirname, 'src/index.html'), to: path.resolve(__dirname, 'dist/index.html')},
        { from: path.resolve(__dirname, 'src/manifest.json'), to: path.resolve(__dirname, 'dist/manifest.json')}
      ])
    ],
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      hot: true
    }
  };
};
