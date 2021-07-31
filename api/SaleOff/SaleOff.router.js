const express = require('express');
const router = express.Router();
const SaleOffController = require("./SaleOff.controller");

router.post('/find-with-total-cost', SaleOffController.findWithTotalCost);

module.exports = router;