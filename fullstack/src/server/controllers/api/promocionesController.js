/**
 * @description Comercios endpoint controller
*/
const HttpStatus = require('http-status-codes');
const passport = require("passport");
const express = require('express');
const createError = require('http-errors');

const promocionesService = require('../../services/promocionesServices');

const router = express.Router();

// @route GET /api/vX/promociones/comercio/:comercioId
// @desc devuelve todas las promociones del comercio del parametro
router.get('/comercio/:comercioId',
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    promocionesService.getPromocionesDelComercio(req.params.comercioId)
      .then((promociones) => {
        if (promociones) res.json(promociones);
        else next(createError(HttpStatus.NOT_FOUND, "No se encontraron promociones"));
      })
      .catch(error => next(createError(HttpStatus.BAD_REQUEST, error.message)));
  });

// @route GET /api/vX/promociones/
// @desc devuelve todas las promociones
router.get('/',
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    promocionesService.getPromociones()
      .then((promociones) => {
        if (promociones) res.json(promociones);
        else next(createError(HttpStatus.NOT_FOUND, "No se encontraron promociones"));
      })
      .catch(error => next(createError(HttpStatus.BAD_REQUEST, error.message)));
  });

// @route GET /api/vX/promociones/:id
// @desc busca promocion por id
router.get('/:id',
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    promocionesService.getPromocionByID(req.params.id)
      .then((comercio) => {
        if (comercio) res.json(comercio);
        else next(createError(HttpStatus.NOT_FOUND, "No se encontro la promocion"));
      })
      .catch(error => next(createError(HttpStatus.BAD_REQUEST, error.message)));
  });

// @route GET /api/vX/promociones/filtro
// @desc devuelve todas las promociones segun el filtro en el body
router.post('/filtro/',
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    promocionesService.getPromocionesSegun(req.body.filtro)
      .then((promociones) => {
        if (promociones) res.json(promociones);
        else next(createError(HttpStatus.NOT_FOUND, "No se encontraron promociones"));
      })
      .catch(error => next(createError(HttpStatus.BAD_REQUEST, error.message)));
  });
// @route POST /api/vX/promociones/nuevo
// @desc crea una nueva promocion
router.post('/nuevo',
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    promocionesService.nuevaPromocion(req.body.promocion)
      .then(promocionDTO => res.json(promocionDTO))
      .catch(error => next(createError(HttpStatus.BAD_REQUEST, error.message)));
  });

// @route PATCH /api/vX/promociones/:id
// @desc actualiz comercio por id segun el contenido en body.promocion
router.patch('/:id',
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    promocionesService.actualizarPromocion(req.params.id, req.body.promocion)
      .then((comercioActualizado) => {
        if (comercioActualizado) {
          res.json(comercioActualizado);
        } else {
          next(createError(HttpStatus.BAD_REQUEST, "No se encontró el comercio"));
        }
      })
      .catch(error => next(createError(HttpStatus.BAD_REQUEST, error.message)));
  });

router.delete('/:id',
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    promocionesService.borrarPromocion(req.params.id)
      .then((comercioEliminado) => {
        if (comercioEliminado) res.json(comercioEliminado);
        else next(createError(HttpStatus.NOT_FOUND, "No se encontro el comercio"));
      })
      .catch(error => next(createError(HttpStatus.BAD_REQUEST, error.message)));
  });

module.exports = router;
