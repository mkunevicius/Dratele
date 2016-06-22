var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var httpProxy = require('http-proxy');
const http = require('http');

var proxy = httpProxy.createProxyServer({
  changeOrigin: true
});

var app = express();
var compiler = webpack(config);


app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));


app.all('/api/*', function (req, res) {
  proxy.web(req, res, {
    target: 'http://localhost:3000'
  });
});

app.all('/img/*', function (req, res) {
    proxy.web(req, res, {
      target: 'http://localhost:3000'
  });
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './app/index.html'));
});


const server = new http.Server(app);

server.listen(8030, 'localhost', function(err) {
  if (err) {
    console.log(err);
return;
}
console.log('Listening at http://localhost:8030');
});
