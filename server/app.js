import path from 'path';
import webpackConfig from '../webpack.config';
import webpack from 'webpack';
import express from 'express';
import proxy from 'http-proxy-middleware';
import WebpackMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware'

const app = express();

// Webpack middleware
const compiler = webpack(webpackConfig);
const middleware = WebpackMiddleware(
    compiler,
    {
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: true,
            chunkModules: true,
            modules: true
        }
    }
);

app.use(middleware);
app.use(WebpackHotMiddleware(compiler));
app.use(express.static(path.join(__dirname, '..')));

app.use('/auth', (res, req, next) => {

    // Get code and status

    // Fetch token

    // Add `Authorization` to every response'header

    // Redirect to `/home`
})


app.use('/rss', (res, req, next) => {

    // inoreader api starts with `/rss`

    // is login or not

    // Poxsy all request to `https://www.inoreader.com`
})

app.listen(
    3000,
    '0.0.0.0',
    () => {
        console.log(`App listening at http://0.0.0.0:3000`);
    }
);

// function allowCORS(res) {
//     res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
//     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//
//     return res;
// }
//
//
//
// app.use((req, res, next) => {
//     if (req.method === 'OPTIONS') {
//         res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3000');
//         res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
//         res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');
//         res.setHeader('Access-Control-Allow-Credentials', true);
//         return res.status(200).send();
//     }
//
//     next();
// });
//
// app.use('/', proxy({
//     logLevel: 'debug',
//     target: 'https://www.inoreader.com',
//     changeOrigin: true,
//     onProxyReq(proxyReq, req, res) {
//         console.log('RAW REQUEST from the target', JSON.stringify(req.headers, true, 2));
//     },
//     onProxyRes(proxyRes, req, res) {
//         console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
//
//         proxyRes.headers['Access-Control-Allow-Origin'] = '*';
//         proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,HEAD,OPTIONS,POST,PUT';
//         proxyRes.headers['Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization';
//     },
//     onError(err, req, res) {
//         console.log('ERROR', err);
//         res.writeHead(500, {
//             'Content-Type': 'text/plain'
//         });
//         res.end('Something went wrong. And we are reporting a custom error message.');
//     }
// }));

