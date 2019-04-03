/**
 * Manages the routes of the API v1
 * Each route needs a controller
 * Also adds a ping endpoint to the API v1 so the health can be checked through /api/v1/ping
 */
const health = require('express-ping');
const express = require('express');


const singersController = require('../../../controllers/api/singersController');
const usuariosController = require('../../../controllers/api/usuariosController');
const comerciosController = require('../../../controllers/api/comerciosController');
const dtosController = require('../../../controllers/api/dtosController');
const promocionesController = require('../../../controllers/api/promocionesController');


const router = express.Router();

// health check: api/v1/ping
router.use(health.ping());

// Singers route: api/v1/singers
router.use('/singers', singersController);
router.use('/usuarios', usuariosController);
router.use('/comercios', comerciosController);
router.use('/dtos', dtosController);
router.use('/promociones', promocionesController);

module.exports = router;
