const express = require('express');
const router = express.Router();

const chartController = require('./chart.controller');

router.get('/booking-money-by-quarterlies', chartController.getBookingMoneyByQuarterlies);
router.get('/booking-service-money-by-quarterlies', chartController.getBookingServiceMoneyByQuarterlies);
router.get('/bill-money-by-months', chartController.getBillMoneyByMonths);
router.post('/get-list-number-room-types-to-be-booked', chartController.getListNumberOfRoomTypesToBeBooked);
router.get('/cus-stay-in-7-n-1-nationals', chartController.getCusStayIn7N1Nationals);
router.get('/get-number-of-admin-account', chartController.getNumberOfAdminAccount);
router.get('/get-number-of-native-hotel-account', chartController.getNumberOfNativeHotelAccount);

module.exports = router;