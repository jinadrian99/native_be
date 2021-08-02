const express = require('express');
const router = express.Router();
const BookingServiceController = require('./bookingService.controller');

router.get('/update-status-by-idDDDV-to-completed/:id', BookingServiceController.updateStatusByIDToCompleted);

router.get('/get-dddv-by-idkhd/:id', BookingServiceController.getDddvByIdkhd);

router.get('/', BookingServiceController.index);
router.get('/:id', BookingServiceController.show);
router.post('/', BookingServiceController.store);
router.put('/:id', BookingServiceController.update);

module.exports = router;