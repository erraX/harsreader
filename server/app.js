var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();

app.use('/v3', proxy({
    logLevel: 'debug',
    target: 'https://cloud.feedly.com',
    changeOrigin: true,
    onProxyRes(proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,HEAD,OPTIONS,POST,PUT';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization';
    }
}));

app.listen(3001);
