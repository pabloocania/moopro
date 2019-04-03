require('dotenv').config();
const express = require('express');
const os = require('os');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require("passport");
const listEndpoints = require('express-list-endpoints');

// connect to Mongo daemon
require('./mongodb')();

// Passport config
require("./passport")();

// create express app
const app = express();
app.use(passport.initialize());
app.use(passport.session());
// CROSS ORIGIN
const corsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
  /*
    origin: '*',
    method: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept', 'X-Requested-With'],
    credentials: true,
    exposedHeaders: ['x-auth-token'],
    optionsSuccessStatus: 200 //Some legacy browsers (IE11, various SmartTVs) choke on 204
    */
};
app.use(cors(corsOptions));

// add bodyParser middleware to the top of the express app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// read dist production folder
app.use(express.static('dist'));

// read environment variables
const { PORT, HOST } = process.env;

// add routes to the server and initialize the api endpoints
const router = require('./routes/router');

router.init(app);

app.get('/api/endpoints', (req, res) => res.send(listEndpoints(app)));

app.use((error, req, res, next) => {
  console.error(error.message);
  // Sets a generic server error status code if none is part of the err
  // if (!err.statusCode) err.statusCode = 500;
  // If shouldRedirect is not defined in our error, sends our original err data
  res.send(error);
});

// listen to the incoming requests
app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);

/* const express = require('express');
const app = express();
app.use(express.static('dist'));
app.listen(process.env.PORT || 8080,
    () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
*/
