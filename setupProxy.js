const { createProxyMiddleware } = require('http-proxy-middleware');
const {enviroment_dev, enviroment_auth_dev} = require("./src/http/enviroments/Enviroments");

module.exports = function(app) {
  app.use(
    '/auth',
    createProxyMiddleware({
      target: enviroment_auth_dev.host, // Substitua com a URL da sua API de destino
      changeOrigin: true,
      secure: false, // Isso desabilita a verificação do certificado SSL
    })
  );
};
