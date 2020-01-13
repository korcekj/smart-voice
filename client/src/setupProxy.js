const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/api/esp', {
      target: 'http://192.168.0.102',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api/esp': '' // rewrite path
      }
    })
  );
  app.use(
    proxy('/api/local-devices', {
      target: 'http://localhost:5000'
    })
  );
};
