/**
 * @description Dtos endpoint controller
 */
const passport = require("passport");
const express = require("express");
const { categorias, categoriaDefault } = require("../../dtos/categoriasDTO");
const { getShopsDTO } = require("../../dtos/shopsDTO");
const { localidades, localidadDefault } = require("../../dtos/localidadesDTO");
const { getPromocionesDTO } = require("../../dtos/promocionesDTO");
const { diasDeLaSemana, diasDeLaSemanaDefault } = require("../../dtos/diasDeLaSemanaDTO");

const router = express.Router();

// @route GET /api/vX/dtos/
// @desc devuelve todos los dtos relevantes para el front-end
router.get("/", passport.authenticate("jwt", { session: false }), (req, res, next) => {
  res.json({
    comercioDTO: getShopsDTO(),
    promocionDTO: getPromocionesDTO(),
    diasDeLaSemana,
    localidades,
    categorias
  });
});

// @route GET /api/vX/dtos/
// @desc devuelve todas las categorias de la aplicacion
router.get("/categorias", passport.authenticate("jwt", { session: false }), (req, res, next) => {
  res.json({
    categorias
  });
});

module.exports = router;
