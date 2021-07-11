const express = require('express');
const router = express.Router();

const roomController = require('./room.controller');

router.post('/get-rooms-by-dates-idlp-number', roomController.getRoomsByDatesIdlpNumber);
router.get('/get-rooms-by-idbooking-with-bill/:id', roomController.getDataByIdBookingWithBill);

router.get('/', roomController.index);
router.get('/:id', roomController.show);
router.post('/', roomController.store);
router.put('/:id', roomController.update);
router.delete('/:id', roomController.destroy);

module.exports = router;