

const apiRoute = require('./api/api');
/**
 *
 * Initialize the server. Adds a middleware function to get request information before routing
 * @param {*} server the express application
 */
function init(server) {
  server.use((req, res, next) => {
    console.log(`Request was made to: ${req.originalUrl}`);
    return next();
  });
  server.use('/api', apiRoute);
}

module.exports = {
  init
};
