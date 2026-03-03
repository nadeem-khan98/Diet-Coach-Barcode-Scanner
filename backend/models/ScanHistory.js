const mongoose = require("mongoose");

const scanSchema = new mongoose.Schema({
  userId: String,
  productName: String,
  calories: Number,
  sugar: Number,
  fat: Number,
  protein: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ScanHistory", scanSchema);