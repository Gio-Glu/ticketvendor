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
  eventDate: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    default: "concert"
  },
  description: {
    type: String,
    required: true
  },
  eventImage: {
    type: String,
    default:
      "https://www.awakeningsfestival.nl/extend/assets/images/mobile/share_19.png"
  }
});

module.exports = User = mongoose.model("events", eventSchema);
