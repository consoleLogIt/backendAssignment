const mongoose = require("mongoose");

const unStructuredDataSchema = new mongoose.Schema({
  data: {
    type: Array
  },
  files:{
    type:Array
  }
});

const unStructuredData = mongoose.model(
  "UnStructuredData",
  unStructuredDataSchema
);

module.exports = unStructuredData;
