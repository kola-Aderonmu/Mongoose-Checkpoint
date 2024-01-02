const mongoose = require("mongoose");

// Create a person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    trim: true,
  },
  favouriteFoods: { type: [String], required: true },
});

// Create a Person model using the schema
const person = mongoose.model("person", personSchema);
module.exports = person;
