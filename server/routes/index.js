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

router.get("/:id", (req, res) => {
  let currentUser = "";
  User.findById({ _id: req.params.id }).then(user => {
    currentUser = user.name;
  });
  Event.find().then(events => {
    res.render("index", {
      events,
      currentUser
    });
  });
});
router.get("/detail/:handle", (req, res) => {
  Event.findOne({ eventName: req.params.handle }).then(event => {
    const encoded = encodeURI(event.location);

    res.render("detail", {
      event,
      encoded
    });
  });
});
module.exports = router;
