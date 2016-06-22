var path = require('path')
var webpack = require('webpack')


module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
      'eventsource-polyfill', // necessary for hot reloading with IE
      'webpack-hot-middleware/client',
      './app/index'
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'index_bundle.js',
      publicPath: '/static/'
    },
    resolve: {
      extensions: ["", ".js", ".jsx"],
      root: path.resolve(__dirname),
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
      loaders: [{
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'app')
      }, {
        test: /\.(scss|css)$/,
        loaders: ["style", "css", "sass"],
        include: path.join(__dirname, 'app')
      },
      {
        test: /\.less$/,
        loaders: ['style', 'css', 'less'],

      },
      {   test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=20000',
        include: [path.join(__dirname, 'img'), '/static']
      },
      { test: /\.gif$/, loader: "url-loader?mimetype=image/png" },
      { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]" },
      ],
    noParse: /node_modules\/quill\/dist/
  }
}






// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
//   template: __dirname + '/app/index.html',
//   filename: 'index.html',
//   inject: 'body'
// });
//
// module.exports = {
//   entry: [
//     './app/index.js'
//   ],
//   output: {
//     path: __dirname + '/dist',
//     filename: 'index_bundle.js'
//   },
//   devServer: {
//     inline: true,
//     port: 3333
//   },
//   module: {
//     loaders: [
//       {test: /\.js$/, include: __dirname + '/app', loader: 'babel-loader',query: {presets: ['es2015', 'react']}},
//       {test: /\.css$/, loader: 'style-loader!css-loader'},
//       { test: /\.jpg$/, loader: "file-loader" }
//     ]
//   },
//   plugins: [HtmlWebpackPluginConfig]
// };
