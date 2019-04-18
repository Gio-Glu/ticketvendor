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
router.post(
  "/addevent",
  // passport.authenticate(
  //   "adminLogin",
  //   {
  //     failureRedirect: "/ticketvendoradmin/login"
  //   },
  (req, res) => {
    //Check if Event name is in use or not
    Event.find({ eventName: req.body.name }).then(event => {
      if (event)
        return res.status(400).json({ eMsg: "Event name already in use." });
      const newEvent = new Event({
        eventName: req.body.name,
        tickets: req.body.tickets,
        ticketPrice: req.body.ticketPrice,
        location: req.body.location,
        date: req.body.date,
        category: req.body.category
      });
      newEvent
        .save()
        .then(event =>
          res.status(200).json({ message: "Succesfully added Event" })
        );
    });
  }
);

//Route to delete an event
router.delete("/deleteEvent/:id", () => {
  Event.findByIdAndDelete({ _id: req.params.id })
    .then(event => {
      res.status(200).json({ message: "Event deleted succesfully" });
    })
    .catch(e => {
      res.status(400).json({ eMsg: "something went wrong" });
    });
});

module.exports = router;
