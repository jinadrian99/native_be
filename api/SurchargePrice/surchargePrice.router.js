const express = require('express');
const router = express.Router();

const SurchargePriceController = require('./surchargePrice.controller');

router.get('/', SurchargePriceController.index);
router.get('/:id', SurchargePriceController.show);
router.post('/', SurchargePriceController.store);
router.put('/:id', SurchargePriceController.update);
router.delete('/:id', SurchargePriceController.destroy);

module.exports = router;