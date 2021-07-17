const express = require('express');
const router = express.Router();

const chartController = require('./chart.controller');

router.get('/booking-money-by-quarterlies', chartController.getBookingMoneyByQuarterlies);
router.get('/booking-service-money-by-quarterlies', chartController.getBookingServiceMoneyByQuarterlies);
router.get('/bill-money-by-months', chartController.getBillMoneyByMonths);
router.post('/get-list-number-room-types-to-be-booked', chartController.getListNumberOfRoomTypesToBeBooked)

module.exports = router;