const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  age: Number,
  height: Number,

  // NEW FIELDS (optional)
  name: String,
  goal: String,
  activityLevel: String,

  // multiple diseases
  diseases: [String]
});

module.exports = mongoose.model("User", userSchema);