var path = require('path');
var webpack = require('webpack');


module.exports = {
    devtool: 'source-map',
    entry: [
        './src/index'
    ],
    output: {
        path: path.join(__dirname, '../public/react'),
        filename: 'app.js',
        publicPath: '/react/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [{
                test: /\.js$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src')
        }, {
                test: /\.(scss|css)$/,
                loaders: ["style", "css", "sass"],
                include: path.join(__dirname, 'assets')
        }, {
                test: /\.less$/,
                loaders: ['style', 'css', 'less']
        }, {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=20000',
                include: path.join(__dirname, 'assets')
            },
            { test: /\.gif$/, loader: "url-loader?mimetype=image/png" },
            { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]" },

        ],
        noParse: /node_modules\/quill\/dist/

    }
};
