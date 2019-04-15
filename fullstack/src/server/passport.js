const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const passport = require("passport");
const User = require("./dbmodels/user");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRETORKEY;

module.exports = () => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        user.verifyPassword(password, (err, isMatch) => {
          if (err) return done(err, null, { message: "Incorrect Password" });
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, { message: "Incorrect Password" });
        });
      });
    })
  );

  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      User.findById(jwtPayload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );

  passport.serializeUser((user, done) => {
    // placeholder for custom user serialization
    // null is for errors
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    // placeholder for custom user deserialization.
    // maybe you are going to get the user from mongo by id?
    // null is for errors
    done(null, user);
  });
};
