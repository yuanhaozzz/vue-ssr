const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 拷贝文件
const CopyWebpackPlugin = require('copy-webpack-plugin');
// html模板 资源打包后自动注入
let HtmlWebpackPlugin = require('html-webpack-plugin');
// css 按需加载
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 清除dist文件
let { CleanWebpackPlugin } = require('clean-webpack-plugin');


let isProd = process.env.NODE_ENV === 'production';
let findToFilePath = pathname => {
    return path.resolve(__dirname, pathname);
};


module.exports = {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : '#cheap-module-source-map',
    entry: {
        app: ["@babel/polyfill", findToFilePath('../src/entry-client.js')]
    },
    resolve: {
        alias: {
            '@': findToFilePath('../src')
        },
        extensions: [".js", ".vue", ".less"]

    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: [
                    findToFilePath('../src')
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            isProd ? {
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: "pre",
                include: [path.resolve(__dirname, '../src')], // 指定检查的目录
            } : {}
        ]
    },
    // stats: {
    //     assets: isProd ? true : false,
    //     builtAt: false,
    //     modules: false,
    //     entrypoints: false
    // },
    plugins: [
        new VueLoaderPlugin(),
        // 提供全局变量，这样不需要每次导入   import React from 'react'   等等！
        new HtmlWebpackPlugin({
            template: findToFilePath('../public/template.html'),
            filename: 'template.html'
        }),
        new CleanWebpackPlugin(),
        // new MiniCssExtractPlugin({
        //     // Options similar to the same options in webpackOptions.output
        //     // both options are optional
        //     filename: devMode ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
        //     chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[contenthash:8].css',
        // }),
        new CopyWebpackPlugin([
            { from: path.resolve(__dirname, findToFilePath('../public')), to: findToFilePath('../dist/client/public'), ignore: ['.*'] }
        ]),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
    ]
};