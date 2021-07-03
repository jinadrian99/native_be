const express = require('express');
const router = express.Router();

const BookingController = require('./booking.controller');

router.get('/', BookingController.index);
router.get('/:id', BookingController.show);
router.post('/', BookingController.store);
router.put('/:id', BookingController.update);
router.delete('/:id', BookingController.destroy);

module.exports = router;