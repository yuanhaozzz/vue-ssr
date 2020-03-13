const fs = require('fs');
const path = require('path');
const MFS = require('memory-fs');
const webpack = require('webpack');
const chokidar = require('chokidar');
const clientConfig = require('../build/webpack.client.config.js');
const serverConfig = require('../build/webpack.server.config.js');

let resolve = pathname => path.resolve(__dirname, pathname);

const readFile = (fs, file, type = 'client') => {
    let outputPath = type === 'server' ? serverConfig.output.path : clientConfig.output.path;
    try {
        return fs.readFileSync(path.join(outputPath, file), 'utf-8');
    } catch (e) { }
};

module.exports = function devServer (app, cb) {
    let bundle;
    let template;
    let clientManifest;
    let ready;
    const readyPromise = new Promise(r => { ready = r; });

    const update = () => {
        if (bundle && clientManifest) {
            ready();
            cb(bundle, {
                template,
                clientManifest,
            });
        }
    };
    let templatePath = resolve('../public/template.html');
    template = fs.readFileSync(templatePath, 'utf-8');
    chokidar.watch(templatePath).on('change', () => {
        template = fs.readFileSync(templatePath, 'utf-8');
        update();
    });


    // 修改client配置
    clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app[1]];
    clientConfig.output.filename = '[name].js';
    clientConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    );

    // 编译 client config
    const clientCompiler = webpack(clientConfig);
    // 放入编译结果
    const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        noInfo: false
    });

    // 使用中间件
    app.use(devMiddleware);

    // 编译完了  done
    clientCompiler.plugin('done', stats => {
        stats = stats.toJson();
        stats.errors.forEach(err => console.error(err));
        stats.warnings.forEach(err => console.warn(err));
        if (stats.errors.length) return;
        // 读取文件;
        clientManifest = JSON.parse(readFile(
            devMiddleware.fileSystem,
            'vue-ssr-client-manifest.json'
        ));
        update();
    });

    // hot middleware  热更新
    app.use(require('webpack-hot-middleware')(clientCompiler, { heartbeat: 5000 }));


    // watch and update server renderer
    const serverCompiler = webpack(serverConfig);
    const mfs = new MFS();
    serverCompiler.outputFileSystem = mfs;
    serverCompiler.watch({}, (err, stats) => {
        if (err) throw err;
        stats = stats.toJson();
        if (stats.errors.length) return;
        bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json', 'server'));
        update();
    });

    return readyPromise;
};