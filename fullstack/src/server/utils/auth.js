const passport = require("passport");

module.exports = {
  jwtAuthenticate: () => passport.authenticate("jwt", { session: false }),
  facebookAuthenticate: (options) => passport.authenticate("facebook", {scope: ['email', 'public_profile'] }),
  isLoggedIn: (req, res, next) => {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
      console.log("is authenticated");
      return next();
    }
    console.log("is NOT! authenticated");
    // if they aren't redirect them to the home page
    res.redirect('/');
  },
};
