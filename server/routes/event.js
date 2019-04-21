const express = require("express");
const router = express.Router();
const path = require("path");
const Event = require("../../database/models/Event");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const passport = require("passport");

router.get("/:id", (req, res) => {
  Event.findById({ _id: req.params.id }).then(event =>
    res.render("detail", event)
  );
});
//Route to add a new Event
router.post("/addevent", ensureAuthenticated, (req, res) => {
  //Check if Event name is in use or not
  Event.findOne({ eventName: req.body.name }).then(event => {
    if (event)
      return res.status(400).json({ eMsg: "Event name already in use." });
    const newEvent = new Event({
      eventName: req.body.eventName,
      tickets: req.body.tickets,
      ticketPrice: req.body.ticketPrice,
      location: req.body.location,
      eventDate: req.body.eventDate,
      category: req.body.category,
      description: req.body.description
    });
    newEvent
      .save()
      .then(event =>
        res
          .status(200)
          .json({ message: "Succesfully added Event" })
          .redirect("/ticketvendoradmin/dashboard")
      )
      .catch(e => console.log(e));
  });
});

//Route to delete an event
router.delete("/deletevent/:id", ensureAuthenticated, (req, res) => {
  Event.findByIdAndDelete({ _id: req.params.id })
    .then(event => {
      res.status(200).json({ message: "Event deleted succesfully" });
    })
    .catch(e => {
      res.status(400).json({ eMsg: "something went wrong" });
    });
});
// Access Control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("danger", "Please login");
    res.redirect("/ticketvendoradmin/login");
  }
}

module.exports = router;
