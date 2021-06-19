const express = require('express');
const router = express.Router();

const chartController = require('./chart.controller');

router.get('/booking-money-by-quarterlies', chartController.getBookingMoneyByQuarterlies);

module.exports = router;