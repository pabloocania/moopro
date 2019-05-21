const express = require("express");
const passport = require("passport");
const { generateToken, sendToken } = require("../../utils/token.utils");

const router = express.Router();
const usersService = require("../../services/usersServices");

// @route POST /api/vX/users/register
// @desc Register user
// @access Public
router.post("/register", usersService.register);

// @route POST /api/vX/users/login
// @desc Login user and return JWT token
// @access Public

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  usersService.login,
  generateToken,
  sendToken
);

// @route GET /api/vX/users/currentuser
// @desc Return current user
// @access Private
router.get("/currentuser", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json(req.user);
});

// @route GET /api/vX/users/sociallogin
// @desc Return current user
// @access Private
router.post(
  "/sociallogin",
  passport.authenticate("local", { session: false }),
  usersService.socialLogin
);

// @route GET /api/vX/users/
// @desc Get all users from DB
// @access Private
router.get("/", passport.authenticate("jwt", { session: false }), usersService.getAll);

// @route DELETE /api/vX/users/:id
// @desc delete usuario where id = :id
// @access Private
router.delete("/:id", passport.authenticate("jwt", { session: false }), usersService.delete);

// @route GET /api/vX/users/logout
// @desc logout user
// @access Private
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("./");
});

module.exports = router;
