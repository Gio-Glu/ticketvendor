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
    res.render("index", events);
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

module.exports = router;
