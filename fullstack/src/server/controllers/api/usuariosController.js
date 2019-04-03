const express = require("express");
const passport = require("passport");
const { generateToken, sendToken } = require("../../utils/token.utils");

const router = express.Router();
const usuariosService = require("../../services/usuariosServices");

// @route POST /api/vX/usuarios/register
// @desc Register user
// @access Public
router.post("/register",
  usuariosService.register);

// @route POST /api/vX/usuarios/login
// @desc Login user and return JWT token
// @access Public

router.post('/login',
  passport.authenticate('local', { session: false }),
  usuariosService.login,
  generateToken,
  sendToken);


// @route GET /api/vX/usuarios/currentuser
// @desc Return current user
// @access Private
router.get(
  "/currentuser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

// @route GET /api/vX/usuarios/
// @desc Get all users from DB
// @access Private
router
  .get("/",
    passport.authenticate("jwt", { session: false }),
    usuariosService.getAll);

// @route DELETE /api/vX/usuarios/:id
// @desc delete usuario where id = :id
// @access Private
router.delete("/:id",
  passport.authenticate("jwt", { session: false }),
  usuariosService.delete);

// @route GET /api/vX/usuarios/logout
// @desc logout user
// @access Private
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
