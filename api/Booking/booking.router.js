const express = require('express');
const router = express.Router();
const BookingController = require('./booking.controller');

router.get('/was-deposit-in-bill', BookingController.getDataWasDepositInBill);
router.get('/get-ddp-by-idkhd-with-rrc-is-using/:id', BookingController.getDDPByIdKHDWithStatusRRCIsUsing);

router.get('/', BookingController.index);
router.get('/:id', BookingController.show);
router.get('/get_by_idKHD/:id', BookingController.showByIdKHD);
router.post('/', BookingController.store);
router.put('/:id', BookingController.update);
router.delete('/:id', BookingController.destroy);

module.exports = router;