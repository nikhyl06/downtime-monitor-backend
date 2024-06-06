const express = require("express");
const router = express.Router();
const refreshController = require("../controllers/auth/refreshController")


router.get("/", refreshController.handleRefreshToken);

module.exports = router;