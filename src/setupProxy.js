const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/self-service/",
    createProxyMiddleware({
      target: "https://auth.api.live.mindtastic.lol",
      changeOrigin: true,
    })
  );
};
