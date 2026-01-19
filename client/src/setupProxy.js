// client/src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000", // 백엔드 포트 5000번으로 가라!
      changeOrigin: true,
    }),
  );
};
