const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/movieproject-api', 
    createProxyMiddleware({
      target: 'http://localhost:3000', 
      changeOrigin: true,
      secure: false,
    })
  );

  app.use(
    '/admin', // Handle /admin path
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
      secure: false,
    })
  );
};
