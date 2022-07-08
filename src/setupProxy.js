const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/self-service/",
    createProxyMiddleware({
      target: "https://auth.api.live.mindtastic.lol",
      changeOrigin: true,
    })
  );
  app.use(
    "/wiki",
    createProxyMiddleware({
      target: "https://wiki.api.dev.mindtastic.lol",
      changeOrigin: true,
    })
  );
};
