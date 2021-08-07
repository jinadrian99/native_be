const express = require('express');
const router = express.Router();

const roomController = require('./room.controller');

router.post('/get-rooms-by-dates-idlp', roomController.getRoomsByDatesIdlp);
router.post('/get-rooms-by-dates-idlp-number', roomController.getRoomsByDatesIdlpNumber);
router.get('/get-rooms-by-idbooking-with-bill/:id', roomController.getDataByIdBookingWithBill);
router.get('/get-rooms-by-idbill-with-bill/:id', roomController.getDataByIdBillWithBill);

router.get('/', roomController.index);
router.get('/:id', roomController.show);
router.post('/', roomController.store);
router.put('/:id', roomController.update);
router.delete('/:id', roomController.destroy);

module.exports = router;