const createProxyMiddleware = require('http-proxy-middleware');

var serverHost = process.env.REACT_APP_SERVER_HOST;
var clientPort = process.env.REACT_APP_CLIENT_PORT;
var serverPort = process.env.REACT_APP_SERVER_PORT;
const webSocketPort = process.env.REACT_APP_WEBSOCKET_PORT;

// * if this works, thanks to this: https://github.com/chimurai/http-proxy-middleware/discussions/582
const wsProxy = createProxyMiddleware("/cryptosocket",
                                      {
                                        target: `http://${serverHost}:${webSocketPort}`,
                                        ws: true
                                      })

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://${serverHost}:${serverPort}`,
      //changeOrigin: true,
    })
  );
  app.use(wsProxy);
  // app.use(
  //   '/cryptosocket',
  //   createProxyMiddleware({
  //     target: `http://${serverHost}:${webSocketPort}`,
  //     ws: true,
  //     // changeOrigin: true,
  //   })
  // );
};