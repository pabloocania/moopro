const proxy = require("http-proxy-middleware");

module.exports = function expressMiddleware(router) {
  router.use(
    "/api",
    proxy({
      target: "http://localhost:8080",
      changeOrigin: true,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTY4YjgyY2FlNDQ3MDk0YWMyMTAwMyIsImlhdCI6MTU1NTI4MTA2NiwiZXhwIjoxNTU1Mjg4MjY2fQ.myakUd5PTKitJ-6tGE4Klc2RZb8bF9xrDTh0QDUIdVg`
      }
    })
  );
};
