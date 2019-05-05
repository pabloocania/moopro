const proxy = require("http-proxy-middleware");

module.exports = function expressMiddleware(router) {
  router.use(
    "/api",
    proxy({
      target: "http://localhost:8080",
      changeOrigin: true,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTY4YjgyY2FlNDQ3MDk0YWMyMTAwMyIsImlhdCI6MTU1NjYyMjU1NCwiZXhwIjoxNTU2NjI5NzU0fQ.5KOfBXD1X80RNglCZ9si0sAep3BVxhgV6zjWSdknQFw`
      }
    })
  );
};
