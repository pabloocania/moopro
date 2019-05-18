const proxy = require("http-proxy-middleware");

module.exports = function expressMiddleware(router) {
  router.use(
    "/api",
    proxy({
      target: "http://localhost:8080",
      changeOrigin: true,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTY4YjgyY2FlNDQ3MDk0YWMyMTAwMyIsImlhdCI6MTU1ODE1NzM0OSwiZXhwIjoxNTU4MTY0NTQ5fQ.CfSLcF9tt3xmxgG-eukKRhm9erNXXLIH9crgVqZqfe8`
      }
    })
  );
};
