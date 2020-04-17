let express = require('express');
let app = express();
let fs = require('fs');
let path = require('path');
const LRU = require('lru-cache');
const { createBundleRenderer } = require('vue-server-renderer');
let isProd = process.env.NODE_ENV === 'production';
let resolve = pathname => path.resolve(__dirname, pathname);
let templatePath = resolve('../public/template.html');

let renderer, readyPromise;

function createRenderer(bundle, options) {
    return createBundleRenderer(
        bundle,
        Object.assign(options, {
            // 推荐
            runInNewContext: false,
            // 用于组件缓存
            cache: new LRU({
                max: 1000,
                maxAge: 1000 * 60 * 15
            })
        })
    );
}

if (isProd) {
    // 打包好的服务器文件
    let serverBundle = require('../dist/server/blog/vue-ssr-server-bundle.json');
    let clientManifest = require('../dist/client/blog/vue-ssr-client-manifest.json');
    let template = fs.readFileSync(templatePath, 'utf-8');
    renderer = createRenderer(serverBundle, {
        template,
        clientManifest
    });
} else {
    readyPromise = require('./devServer')(
        app,
        templatePath,
        (bundle, options) => {
            renderer = createRenderer(bundle, options);
        }
    );
}

function render(req, res) {
    const s = Date.now();
    res.setHeader('Content-Type', 'text/html');

    const handleError = err => {
        if (err.url) {
            res.redirect(err.url);
        } else if (err.code === 404) {
            res.status(404).send('404 | Page Not Found');
        } else {
            // Render Error Page or Redirect
            res.status(500).send('500 | Internal Server Error');
            console.error(`error during render : ${req.url}`);
            console.error(err.stack);
        }
    };
    console.log(req.query, '----');
    const context = {
        title: '凌风的个人博客',
        url: req.url,
        query: req.query
    };
    renderer.renderToString(context, (err, html) => {
        if (err) {
            return handleError(err);
        }
        res.send(html);
        if (!isProd) {
            console.log(`whole request: ${Date.now() - s}ms`);
        }
    });
}

app.use(express.static('dist/client', { maxAge: 1000000 }));
app.use(express.static('dist/server', { maxAge: 1000000 }));

app.get(
    '*',
    isProd
        ? render
        : (req, res) => {
            readyPromise.then(() => render(req, res));
        }
);

app.listen(3001, () => {
    console.warn('start 3001');
});
