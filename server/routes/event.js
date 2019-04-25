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
router.post("/addevent", (req, res) => {
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
      description: req.body.description,
      eventImage: req.body.eventImage
    });
    newEvent
      .save()
      .then(event =>
        res.status(200).json({
          msg: "Succesfully added new event, reload the dashboard to see it"
        })
      )
      .catch(e => console.log(e));
  });
});
//Route to delete an event
router.delete("/deletevent/:id", (req, res) => {
  Event.findByIdAndDelete({ _id: req.params.id })
    .then(event => {
      res.status(200).json({ message: "Event deleted succesfully" });
    })
    .catch(e => {
      res.status(400).json({ eMsg: "something went wrong" });
    });
});

module.exports = router;
