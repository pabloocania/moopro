/**
 * @description Comercios endpoint controller
*/
const HttpStatus = require('http-status-codes');
const passport = require("passport");
const express = require('express');
const createError = require('http-errors');

const comerciosService = require('../../services/comerciosServices');

const router = express.Router();

// @route GET /api/vX/comercios/
// @desc devuelve todos los comercios
router.get('/',
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    comerciosService.getComercios()
      .then((comercios) => {
        if (comercios) res.json(comercios);
        else next(createError(HttpStatus.NOT_FOUND, "No se encontraron comercios"));
      })
      .catch(error => next(createError(HttpStatus.BAD_REQUEST, error.message)));
  });

// @route GET /api/vX/comercios/:id
// @desc busca comercio por id
router.get('/:id',
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    comerciosService.getComercioByID(req.params.id)
      .then((comercio) => {
        if (comercio) res.json(comercio);
        else next(createError(HttpStatus.NOT_FOUND, "No se encontro el comercio"));
      })
      .catch(error => next(createError(HttpStatus.BAD_REQUEST, error.message)));
  });

// @route POST /api/vX/comercios/nuevo
// @desc crea un nuevo comercio
router.post('/nuevo',
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    comerciosService.nuevoComercio(req.body.comercio)
      .then(comercioCreado => res.json(comercioCreado))
      .catch(error => next(createError(HttpStatus.BAD_REQUEST, error.message)));
  });

// @route GET /api/vX/comercios/:id
// @desc actualiz comercio por id
router.patch('/:id',
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    comerciosService.actualizarComercio(req.params.id, req.body.comercio)
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
    comerciosService.borrarComercio(req.params.id)
      .then((comercioEliminado) => {
        if (comercioEliminado) res.json(comercioEliminado);
        else next(createError(HttpStatus.NOT_FOUND, "No se encontro el comercio"));
      })
      .catch(error => next(createError(HttpStatus.BAD_REQUEST, error.message)));
  });

module.exports = router;
