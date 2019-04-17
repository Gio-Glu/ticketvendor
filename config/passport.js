const LocalStrategy = require("passport-local").Strategy;
const User = require("../database/models/User");
const bcrypt = require("bcryptjs");

module.exports = function(passport) {
  // Local Strategy
  passport.use(
    "adminLogin",
    new LocalStrategy(function(username, password, done) {
      // Match Username
      let query = { username: username, role: "admin" };
      User.findOne(query, function(err, user) {
        if (err) throw err;
        if (!user) {
          return done(null, false, { message: "No user found" });
        }

        // Match Password
        bcrypt.compare(password, user.password, function(err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Wrong password" });
          }
        });
      });
    })
  );
  passport.use(
    "userLogin",
    new LocalStrategy(function(username, password, done) {
      // Match Username
      let query = { username: username, role: "user" };
      User.findOne(query, function(err, user) {
        if (err) throw err;
        if (!user) {
          return done(null, false, { message: "No user found" });
        }

        // Match Password
        bcrypt.compare(password, user.password, function(err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Wrong password" });
          }
        });
      });
    })
  );
};
