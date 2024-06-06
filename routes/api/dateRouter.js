const express = require('express');
const router = express.Router();
const dateController = require('../../controllers/dateController');

router.route('/')
    .get(dateController.getDates);



module.exports = router;