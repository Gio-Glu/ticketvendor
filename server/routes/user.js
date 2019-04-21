const express = require("express");
const router = express.Router();
const path = require("path");
const User = require("../../database/models/User");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const passport = require("passport");
const publicPath = path.join(__dirname + "../../public");
const database = require("../../database/db");
const nodemailer = require("nodemailer");

//Renders the Login page
router.get("/login", (req, res) => {
  res.render("userlogin");
});

//Authenticates login credentials
router.post(
  "/login",
  passport.authenticate("userLogin", {
    failureRedirect: "/login",
    successRedirect: "/"
  })
);
//Renders the Register page
router.get("/register", (req, res) => {
  res.render("userregister");
});

//registers a new User
router.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      //if username exists then error
      return res.redirect("/auth/register");
    }
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        //if email exists then error
        return res.redirect("/auth/register");
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
              req.flash(
                "succes_message",
                "You are now registered and can log in"
              );
              res.redirect("/auth/login");
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
//route to render the forgot password page
router.get("/forgot", (req, res) => {
  res.render("userforgot");
});
//route to handle forgotten passwords
router.post("/forgot", (req, res) => {
  const newPassword = Math.floor(100000 + Math.random() * 900000);
  bcrypt.genSalt(10, (e, s) => {
    bcrypt.hash(newPasword, s, (err, hash) => {
      if (err) throw err;
      User.findOneAndUpdate(
        { email: req.body.email },
        { $set: { password: hash } }
      )
        .then(user => {
          var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "testglu123@gmail.com",
              pass: "6B9F39CH3iM4r8B"
            }
          });

          var mailOptions = {
            from: "testglu123@gmail.com",
            to: `${user.email}`,
            subject: "Password reset",
            text: `Your password has been reset to: ${newPassword}. Follow this link to change your password to what you want it to be: http://localhost:3000/auth/changepassword/${
              user._id
            }`
          };

          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        })
        .catch(e => console.log(e));
    });
  });
});
router.get("/changepassword/:id", (req, res) => {
  res.render("userchange");
});
router.put("/changepassword/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      const oldPassword = req.body.password;
      const newPassword = req.body.newPassword;
      bcrypt.compare(oldPassword, user.password, (err, isMatch) => {
        if (isMatch) {
          User.findByIdAndUpdate(
            { _id: user._id },
            { $set: { password: newPassword } }
          ).then(user => {
            res.redirect("/auth/login");
          });
        }
      });
    })
    .catch(e => console.log(e));
});
module.exports = router;
