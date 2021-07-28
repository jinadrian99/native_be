const express = require('express');
const router = express.Router();
const SafeOffController = require("./SaveOff.controller");

router.post('/find-with-total-cost', SafeOffController.findWithTotalCost);

module.exports = router;