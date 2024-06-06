const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const machineSchema = new Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  area: { type: String, required: true },
});

const Machine = mongoose.model("Machine", machineSchema);

module.exports = Machine;
