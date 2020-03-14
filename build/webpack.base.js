const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 拷贝文件
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                    public: 'blog/'
                }
            },
            isProd
                ? {}
                : {
                    test: /\.js$/,
                    loader: 'eslint-loader',
                    enforce: "pre",
                    include: [path.resolve(__dirname, '../src')], // 指定检查的目录
                }
        ]
    },
    stats: {
        assets: isProd ? true : false,
        builtAt: false,
        modules: false,
        entrypoints: false
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            { from: path.resolve(__dirname, findToFilePath('../public')), to: findToFilePath('../dist/client/blog/public'), ignore: ['.*'] }
        ]),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
    ]
};
