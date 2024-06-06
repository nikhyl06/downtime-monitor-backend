const express = require("express");
const router = express.Router();
const {
  deleteMachine,
  getMachines,
  addMachine,
  updateMachine,
} = require("../../controllers/machineController");

router
  .route("/")
  .get(getMachines)
  .post(addMachine)
  .put(updateMachine);

router.delete("/:code", deleteMachine);

module.exports = router;
