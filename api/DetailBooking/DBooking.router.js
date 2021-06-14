const express = require('express');
const router = express.Router();

const DBookingController = require('./DBooking.controller');

router.get('/', DBookingController.index);
router.get('/:id', DBookingController.show);
router.post('/', DBookingController.store);
router.put('/:id', DBookingController.update);
router.delete('/:id', DBookingController.destroy);

module.exports = router;