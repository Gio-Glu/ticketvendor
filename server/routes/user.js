const express = require("express");
const router = express.Router();
const path = require("path");
const User = require("../../database/models/User");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const passport = require("passport");
const publicPath = path.join(__dirname + "../../public");
const database = require("../../database/db");

//Renders the Login page
router.get("/login", (req, res) => {
  res.render("userlogin");
});

//Authenticates login credentials
router.post(
  "/login",
  passport.authenticate("userLogin", {
    failureRedirect: "/login",
    successRedirect: "/",
    session: false
  }),
  (req, res) => {}
);

//Renders the Register page
router.get("/register", (req, res) => {
  res.render("userregister");
});

//registers a new User
router.post("/register", (req, res) => {
  User.find({ username: req.body.username, role: "user" }).then(user => {
    if (user) {
      //if username exists then error
      return res.status(400).redirect("/auth/register");
      console.log("test");
    }
    User.find({ email: req.body.email }).then(admin => {
      if (admin) {
        //if email exists then error
        return res.status(400).json({ message: "Email is already in use" });
      } else {
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          role: "user"
        });
        bcrypt.genSalt(10, (e, s) => {
          bcrypt.hash(newUser.password, s, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                res
                  .json({ user, message: "User added succesfully" })
                  .redirect("/auth/login");
              })
              .catch(e => {
                console.log(e);
              });
          });
        });
      }
    });
  });
});
module.exports = router;
