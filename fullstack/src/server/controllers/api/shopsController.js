/**
 * @description Comercios endpoint controller
 */
const HttpStatus = require("http-status-codes");
const passport = require("passport");
const express = require("express");
const createError = require("http-errors");

const shopsServices = require("../../services/shopsServices");

const router = express.Router();

// @route GET /api/vX/shops/
// @desc retrieves all the shops in the db
router.get("/", passport.authenticate("jwt", { session: false }), (req, res, next) => {
  shopsServices
    .getShops()
    .then((shops) => {
      if (shops) res.json(shops);
      else next(createError(HttpStatus.NOT_FOUND, "No se encontraron comercios"));
    })
    .catch(error => next(createError(HttpStatus.BAD_REQUEST, error.message)));
});

// @route GET /api/vX/shops/:id
// @desc retrieves shop by id from the db
router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res, next) => {
  shopsServices
    .getShopByID(req.params.id)
    .then((shop) => {
      if (shop) res.json(shop);
      else next(createError(HttpStatus.NOT_FOUND, "No se encontro el comercio"));
    })
    .catch(error => next(createError(HttpStatus.BAD_REQUEST, error.message)));
});

// @route POST /api/vX/shops/new
// @desc Creates a new shop in the db
router.post("/new", passport.authenticate("jwt", { session: false }), (req, res, next) => {
  shopsServices
    .newShop(req.body.shop)
    .then(createdShop => res.json(createdShop))
    .catch(error => next(createError(HttpStatus.BAD_REQUEST, error.message)));
});

// @route PATCH /api/vX/shops/:id
// @desc update shop by id
router.patch("/:id", passport.authenticate("jwt", { session: false }), (req, res, next) => {
  shopsServices
    .updateShop(req.params.id, req.body.shop)
    .then((updatedShop) => {
      if (updatedShop) {
        res.json(updatedShop);
      } else {
        next(createError(HttpStatus.BAD_REQUEST, "No se encontró el comercio"));
      }
    })
    .catch(error => next(createError(HttpStatus.BAD_REQUEST, error.message)));
});

// @route DELETE /api/vX/shops/:id
router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res, next) => {
  shopsServices
    .deleteShop(req.params.id)
    .then((deletedShop) => {
      if (deletedShop) res.json(deletedShop);
      else next(createError(HttpStatus.NOT_FOUND, "No se encontro el comercio"));
    })
    .catch(error => next(createError(HttpStatus.BAD_REQUEST, error.message)));
});

module.exports = router;
