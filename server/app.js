import path from 'path'
import fetch from 'isomorphic-fetch'
import webpackConfig from '../webpack.config'
import webpack from 'webpack'
import express from 'express'
import proxy from 'http-proxy-middleware'
import WebpackMiddleware from 'webpack-dev-middleware'
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

app.get('/auth', (req, res, next) => {

    // Get code and status
    const { code, state } = req.query;
    console.log('Auth code:', code, 'state:', state);

    // Fetch token
    fetch('https://www.inoreader.com/oauth2/token', {
        method: 'POST',
        body: JSON.stringify({
            code: code,
            redirect_uri: 'http://localhost:3000/auth',
            client_id: 1000000531,
            client_secret: 'Mjf5Ihm1FB9Gf1X_dDYwZShSfBeWgoWO',
            grant_type: 'authorization_code',
            scope: ''
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(
        res => {
            const { status, statusText, body } = res
            console.log(`${status}:${statusText}`)
            return res.json()
        }
    )
    .then(
        data => {
            console.log('Data', data);
            // Add `Authorization` to every response'header

            // Redirect to `/home`
            res.redirect(301, 'http://localhost:3000/#/home')
        }
    )
    .catch(
        err => console.log('Error', err)
    )

    // res.status(200).send();
})

app.use('/rss', (req, res, next) => {

    // inoreader api starts with `/rss`

    // is login or not

    // Poxsy all request to `https://www.inoreader.com`

    next();
});

app.use('/rss', proxy({
    logLevel: 'debug',
    changeOrigin: true,
    target: 'https://www.inoreader.com',
    pathRewrite: {
        '^/rss': '/'
    }
}));

app.listen(
    3000,
    'localhost',
    () => {
        console.log(`App listening at http://0.0.0.0:3000`);
    }
);
