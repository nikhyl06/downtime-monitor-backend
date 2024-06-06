const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Spare Schema
const spareSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const breakdownSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  area: { type: String, required: true },
  code: { type: String, required: true },
  manufacturer: { type: String, required: true },
  name: { type: String, required: true },
  breakdownCause: { type: String, required: true },
  rootCause: { type: String, required: true },
  actionTaken: { type: String, required: true },
  attendedBy: { type: String, required: true },
  spares: [spareSchema],
  breakdownTime: { type: Number, required: true },
});

const Breakdown = mongoose.model("Breakdown", breakdownSchema);

module.exports = Breakdown;
