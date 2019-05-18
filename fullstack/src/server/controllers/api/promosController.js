/**
 * @description Comercios endpoint controller
 */
const HttpStatus = require("http-status-codes");
const passport = require("passport");
const express = require("express");
const createError = require("http-errors");

const promosService = require("../../services/promosServices");

const router = express.Router();

// @route GET /api/vX/promos/shop/:shopId
// @desc retrieves all promos from shopId
router.get("/shop/:shopId", passport.authenticate("jwt", { session: false }), (req, res, next) => {
  promosService
    .getPromosOfShop(req.params.shopId)
    .then((promos) => {
      if (promos) res.json(promos);
      else next(createError(HttpStatus.NOT_FOUND, "No se encontraron promociones"));
    })
    .catch(error => next(createError(HttpStatus.BAD_REQUEST, error.message)));
});

// @route GET /api/vX/promos/
// @desc retrieves all promos
router.get("/", passport.authenticate("jwt", { session: false }), (req, res, next) => {
  promosService
    .getPromos()
    .then((promos) => {
      if (promos) res.json(promos);
      else next(createError(HttpStatus.NOT_FOUND, "No se encontraron promociones"));
    })
    .catch(error => next(createError(HttpStatus.BAD_REQUEST, error.message)));
});

// @route GET /api/vX/promos/:id
// @desc retrieve promo by id
router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res, next) => {
  promosService
    .getPromocionByID(req.params.id)
    .then((shop) => {
      if (shop) res.json(shop);
      else next(createError(HttpStatus.NOT_FOUND, "No se encontro la promocion"));
    })
    .catch(error => next(createError(HttpStatus.BAD_REQUEST, error.message)));
});

// @route POST /api/vX/promos/filter
// @desc retrieves all promos by filter in body
router.post("/filter/", passport.authenticate("jwt", { session: false }), (req, res, next) => {
  promosService
    .getPromosBy(req.body.filtro)
    .then((promos) => {
      if (promos) res.json(promos);
      else next(createError(HttpStatus.NOT_FOUND, "No se encontraron promociones"));
    })
    .catch(error => next(createError(HttpStatus.BAD_REQUEST, error.message)));
});
// @route POST /api/vX/promos/new
// @desc creates new promo
router.post("/new", passport.authenticate("jwt", { session: false }), (req, res, next) => {
  promosService
    .newPromo(req.body.promo)
    .then(promoDTO => res.json(promoDTO))
    .catch(error => next(createError(HttpStatus.BAD_REQUEST, error.message)));
});

// @route PATCH /api/vX/promos/:id
// @desc update promo by params in body.promo
router.patch("/:id", passport.authenticate("jwt", { session: false }), (req, res, next) => {
  promosService
    .updatePromo(req.params.id, req.body.promo)
    .then((updatedPromo) => {
      if (updatedPromo) {
        res.json(updatedPromo);
      } else {
        next(createError(HttpStatus.BAD_REQUEST, "No se encontró el comercio"));
      }
    })
    .catch(error => next(createError(HttpStatus.BAD_REQUEST, error.message)));
});

// @route DELETE /api/vX/promos/:id
// @desc deletes a promo by id
router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res, next) => {
  promosService
    .deletePromo(req.params.id)
    .then((deletedPromo) => {
      if (deletedPromo) res.json(deletedPromo);
      else next(createError(HttpStatus.NOT_FOUND, "No se encontro el comercio"));
    })
    .catch(error => next(createError(HttpStatus.BAD_REQUEST, error.message)));
});

module.exports = router;
