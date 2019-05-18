/**
 * Manages the routes of the API v1
 * Each route needs a controller
 * Also adds a ping endpoint to the API v1 so the health can be checked through /api/v1/ping
 */
const health = require("express-ping");
const express = require("express");

const singersController = require("../../../controllers/api/singersController");
const usersController = require("../../../controllers/api/usersController");
const shopsController = require("../../../controllers/api/shopsController");
const dtosController = require("../../../controllers/api/dtosController");
const promosController = require("../../../controllers/api/promosController");

const router = express.Router();

// health check: api/v1/ping
router.use(health.ping());

// Singers route: api/v1/singers
router.use("/singers", singersController);
router.use("/users", usersController);
router.use("/shops", shopsController);
router.use("/dtos", dtosController);
router.use("/promos", promosController);

module.exports = router;
