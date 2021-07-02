const express = require('express');
const router = express.Router();

const BookingDController = require('./BookingD.controller');

router.get('/get-booking-detail-by-idDDP/:idDDP', BookingDController.getBooingDetailsByIDDDP);

router.get('/', BookingDController.index);
router.get('/:id', BookingDController.show);
router.post('/', BookingDController.store);
router.put('/:id', BookingDController.update);
router.delete('/:id', BookingDController.destroy);

module.exports = router;