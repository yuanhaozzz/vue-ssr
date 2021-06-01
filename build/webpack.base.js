const path = require('path');


let isProd = process.env.NODE_ENV === 'production';
let findToFilePath = (pathname) => {
    return path.resolve(__dirname, pathname);
};

function noop() {}

module.exports = {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : '#cheap-module-source-map',
    entry: {
        app: [findToFilePath('../src/entry-client.js')],
    },
    resolve: {
        alias: {
            '@': findToFilePath('../src'),
        },
        extensions: ['.js', '.vue', '.less'],
    },
    externals: {
        'vue': 'Vue',
        "view-design": 'iview',
        "iview": 'ViewUI',
    },
    stats: {
        assets: isProd ? true : false,
        builtAt: false,
        modules: false,
        entrypoints: false,
    },
    
};
