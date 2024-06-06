const express = require("express");
const router = express.Router();
const breakDownController = require("../../controllers/breakDownController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(breakDownController.getBreakDown)
  .post(verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.Editor), breakDownController.addBreakDown);

router.route("/:year/:month").get(breakDownController.getMonthlyBreakdown);

router.route("/:year").get(breakDownController.getYearlyBreakdown);

module.exports = router;
