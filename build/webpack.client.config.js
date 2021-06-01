const path = require('path');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
let config = require('./webpack.base.js');
const merge = require('webpack-merge');
let findToFilePath = pathname => path.resolve(__dirname, pathname);
let isProd = process.env.NODE_ENV === 'production';
// webpack 插件提示
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 拷贝文件
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 清除dist文件
let { CleanWebpackPlugin } = require('clean-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(config, {
    target: 'web',
    devtool: false,
    output: {
        path: findToFilePath('../dist/client/blog'),
        filename: 'js/[name].[contenthash:8].js',
        chunkFilename: 'js/[name].[contenthash:8].chunk.js',
        publicPath: '/blog/'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: [findToFilePath('../src')],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                ]
            },
            {
                test: /\.(le|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                            reloadAll: true
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: () => {
                                if (!isProd) {
                                    return '[name].[ext]';
                                }
                                return '[name]_[hash:8].[ext]';
                            },
                            outputPath: 'images/',
                            publicPath: '/blog/images',
                        },
                    },
                ],
            },
            isProd
                ? {}
                : {
                    test: /\.js$/,
                    loader: 'eslint-loader',
                    enforce: 'pre',
                    include: [path.resolve(__dirname, '../src')], // 指定检查的目录
                },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, findToFilePath('../public')),
                to: findToFilePath('../dist/client/blog/public'),
                ignore: ['.*'],
            },
        ]),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: isProd ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
            chunkFilename: !isProd ? 'css/[id].css' : 'css/[id].[contenthash:8].css',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(
                process.env.NODE_ENV || 'development'
            ),
        }),
        new VueSSRClientPlugin(),
        new FriendlyErrorsWebpackPlugin()
    ],
});
