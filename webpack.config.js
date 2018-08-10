const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/ts/index.tsx',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './app/build/js/'),
    filename: 'bundle.js'
  },
  target: 'electron-renderer',
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader'
    },{
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },{
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },{
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 1000000,
          mimetype: "application/font-woff"
        }
      }
    }]
  },
  // 增加 resolve 默认去掉前缀
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'app/ts')
    ],
    extensions: ['.ts', '.tsx', '.js', '.css']
  },
  // html 插件
  plugins: [
    new HtmlWebpackPlugin({
      title: 'rss',
      filename: '../../index.html',
      template: 'template.html',
    }),
  ]
}
