const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema({
  name: String,
  category: String,
  experience: Number,
  rating: Number,
  availableSlots: [String],
});

module.exports = mongoose.model("Expert", expertSchema);
