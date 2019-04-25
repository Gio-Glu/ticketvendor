const Event = require("../../database/models/Event");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const passport = require("passport");
const express = require("express");
const router = express.Router();
const path = require("path");

//Home Route
router.get("/", (req, res) => {
  Event.find().then(events => {
    res.render("index", { events });
  });
});

// router.get("/:id", (req, res) => {
//   let currentUser = "";
//   User.findById({ _id: req.params.id }).then(user => {
//     currentUser = user.name;
//   });
//   Event.find().then(events => {
//     res.render("index", {
//       events,
//       currentUser
//     });
//   });
// });
router.get("/detail/:handle", (req, res) => {
  Event.findOne({ eventName: req.params.handle }).then(event => {
    const encoded = encodeURI(event.location);
    res.render("detail", {
      event,
      encoded
    });
  });
});
router.get("/order_ticket/:id", ensureAuthenticated, (req, res) => {
  Event.findById(req.params.id)
    .then(event => {
      res.render("order", { event });
    })
    .catch(e => console.log(e));
});
router.post("/order_ticket/:id", (req, res) => {
  console.log("ordered");
});
// Access Control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/auth/login");
  }
}
module.exports = router;
