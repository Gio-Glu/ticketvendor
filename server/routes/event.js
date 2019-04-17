const express = require("express");
const router = express.Router();
const path = require("path");
const Event = require("../../database/models/Event");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const passport = require("passport");

router.get("/:id", (req, res) => {
  res.redirect("/");
});

module.exports = router;
