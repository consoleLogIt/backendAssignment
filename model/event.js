const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  registrationLink: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  speakersDetails: {
    speakers: {
      type: Array,
    },
    files: {
      type: Array,
    },
  },
  moderatorDetails: {
    moderators: {
      type: Array,
    },
    files: {
      type: Array,
    },
  },
  aboutTheEvent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UnStructuredData",
  },

  readingMaterialsResource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UnStructuredData",
  },

  joiningInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UnStructuredData",
  },

  organizers: [],
  tags: [],
});

const Events = mongoose.model("Events", eventSchema);

module.exports = Events;
