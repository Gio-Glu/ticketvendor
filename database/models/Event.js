const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true
  },
  tickets: {
    type: Number,
    required: true,
    default: 500
  },
  ticketPrice: {
    type: Number,
    required: true,
    default: 60
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = User = mongoose.model("events", eventSchema);
