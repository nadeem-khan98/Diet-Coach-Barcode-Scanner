const mongoose = require("mongoose");

const intakeSchema = new mongoose.Schema({
  userId: String,
  date: String,
  totalCalories: Number,
  totalSugar: Number,
  totalFat: Number,
  totalProtein: Number
});

module.exports = mongoose.model("DailyIntake", intakeSchema);