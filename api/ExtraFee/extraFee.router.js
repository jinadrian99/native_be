const express = require('express');
const router = express.Router();

const ExtraFeeController = require('./extraFee.controller');

router.get('/get-extra-fee-by-idPTT/:idPTT', ExtraFeeController.getExtraFeeByIDPTT);
router.get('/', ExtraFeeController.index);
router.get('/:id', ExtraFeeController.show);
router.post('/', ExtraFeeController.store);
router.put('/:id', ExtraFeeController.update);
router.delete('/:id', ExtraFeeController.destroy);

module.exports = router;