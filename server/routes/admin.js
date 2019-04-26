const express = require("express");
const router = express.Router();
const path = require("path");
const User = require("../../database/models/User");
const Event = require("../../database/models/Event");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("adminlogin");
});
//handle login post request
router.post(
  "/auth",
  passport.authenticate("adminLogin", {
    failureRedirect: "/ticketvendoradmin/login",
    successRedirect: "/ticketvendoradmin/dashboard"
  })
);
router.post("/addadmin", (req, res) => {
  User.findOne({ username: req.body.username, role: "admin" }).then(admin => {
    if (admin) {
      return res.status(400).json({ message: "Username already exists" });
    } else {
      User.findOne({ email: req.body.email }).then(admin => {
        if (admin) {
          return res.status(400).json({ message: "Email is already in use" });
        } else {
          const newAdmin = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: "admin"
          });
          bcrypt.genSalt(10, (e, s) => {
            bcrypt.hash(newAdmin.password, s, (err, hash) => {
              if (err) throw err;
              newAdmin.password = hash;
              newAdmin
                .save()
                .then(user => {
                  res
                    .status(200)
                    .json({ user, message: "admin added succesfully" });
                })
                .catch(e => {
                  console.log(e);
                });
            });
          });
        }
      });
    }
  });
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  Event.find().then(events => {
    User.find({ role: "admin" }).then(admins => {
      User.find({ role: "user" }).then(users => {
        res.render("dashboard", {
          events,
          admins,
          users
        });
      });
    });
  });
});

router.post("/newUser", (req, res) => {
  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      //if username exists then error
      return res.status(400).json({ eMsg: "Username is taken" });
    }
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        //if email exists then error
        return res.status(400).send("email is already in use");
      }
      let errors = {};
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
              res.status(200).json({ msg: "Succesfully added a new user" });
            })
            .catch(e => {
              console.log(e);
            });
        });
      });
    });
  });
});
//route to delete user
router.delete("/deleteuser/:id", (req, res) => {
  User.findByIdAndDelete({ _id: req.params.id })
    .then(user => {
      res.status(200).json({ message: "User deleted succesfully" });
    })
    .catch(e => {
      res.status(400).json({ eMsg: "Couldn't delete user, try again" });
    });
});
// Access Control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/ticketvendoradmin/login");
  }
}
module.exports = router;
