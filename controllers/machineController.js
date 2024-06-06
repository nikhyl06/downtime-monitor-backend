// controller.js
const Machine = require("../model/Machine");

// Centralized error handling function
const handleError = (res, error) => {
  console.error("Error:", error.message);
  res.status(500).json({ message: error.message });
};

// Function to add a machine to a unit, creating BU and unit if they do not exist

const addMachine = async (req, res) => {
  const { code, name, manufacturer, area } = req.body;
  try {
    const result = await Machine.create({ code, name, manufacturer, area });

    res.status(201).json({ message: "Machine added successfully", result });
  } catch (error) {
    handleError(res, error);
  }
};

const getMachines = async (req, res) => {
  try {
    const machines = await Machine.find({});
    res.json(machines);
  } catch (error) {
    handleError(res, error);
  }
};


const deleteMachine = async (req, res) => {
  const { code } = req.params;
  try {
    const machine = await Machine.findOneAndDelete({ code });
    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }
    res.json({ message: "Machine deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateMachine = async (req, res) => {
  const { code, name, manufacturer, area } = req.body;
  try {
    const machine = await Machine.findOneAndUpdate(
      { code },
      { name, manufacturer, area },
      { new: true, runValidators: true }
    );
    if (!machine) {
      return res.status(404).json({ message: "Machine not found" });
    }
    res.status(201).json({ message: "Machine updated successfully", machine });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  getMachines,
  addMachine,
  updateMachine,
  deleteMachine
};
