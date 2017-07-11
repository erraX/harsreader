import express from 'express'
import proxy from 'http-proxy-middleware'

const app = express();

function allowCORS(res) {
    res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);

    return res;
}


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

app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3000');
        res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
        res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', true);
        return res.status(200).send();
    }

    next();
});

app.use('/', proxy({
    logLevel: 'debug',
    target: 'https://www.inoreader.com',
    changeOrigin: true,
    onProxyReq(proxyReq, req, res) {
        console.log('RAW REQUEST from the target', JSON.stringify(req.headers, true, 2));
    },
    onProxyRes(proxyRes, req, res) {
        console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));

        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,HEAD,OPTIONS,POST,PUT';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization';
    },
    onError(err, req, res) {
        console.log('ERROR', err);
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.end('Something went wrong. And we are reporting a custom error message.');
    }
}));

app.listen(3001);
