const path = require('path');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
let config = require('./webpack.base.js');
const merge = require('webpack-merge');
let findToFilePath = pathname => path.resolve(__dirname, pathname);
let isProd = process.env.NODE_ENV === 'production';
// webpack 插件提示
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(config, {
    target: 'web',
    devtool: false,
    output: {
        path: findToFilePath('../dist/client/blog'),
        filename: 'js/[name].[contenthash:8].js',
        chunkFilename: 'js/[name].[contenthash:8].chunk.js',
        publicPath: '/blog/'
    },
    plugins: isProd
        ? [
            new VueSSRClientPlugin(),
            // new BundleAnalyzerPlugin({
            //     analyzerPort: 8889
            // })
        ]
        : [
            new VueSSRClientPlugin(),
            new FriendlyErrorsWebpackPlugin()
        ]
});
