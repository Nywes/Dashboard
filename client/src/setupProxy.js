const createProxyMiddleware = require('http-proxy-middleware');

var serverHost = process.env.REACT_APP_SERVER_HOST;
var clientPort = process.env.REACT_APP_CLIENT_PORT;
var serverPort = process.env.REACT_APP_SERVER_PORT;

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://${serverHost}:${serverPort}`,
      //changeOrigin: true,
    })
  );
};