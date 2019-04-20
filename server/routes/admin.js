const express = require("express");
const router = express.Router();
const path = require("path");
const User = require("../../database/models/User");
const Event = require("../../database/models/Event");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const passport = require("passport");

router.get("/", (req, res) => {
  res.render("adminlogin");
});
//Main admin account:
//Username: ticketvendoradmin
//passord: t,US(fq3A_/-(R3!
router.post(
  "/auth",
  passport.authenticate("adminLogin", {
    failureRedirect: "/ticketvendoradmin",
    successRedirect: "/ticketvendoradmin/dashboard",
    session: false
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
                  res.json({ user, message: "admin added succesfully" });
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

router.get("/dashboard", (req, res) => {
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

module.exports = router;
