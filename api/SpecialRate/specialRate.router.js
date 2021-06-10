const express = require('express');
const router = express.Router();

const specialRateController = require('./specialRate.controller');

router.get('/', specialRateController.index);
router.get('/:id', specialRateController.show);
router.post('/', specialRateController.store);
router.put('/:id', specialRateController.update);
router.delete('/:id', specialRateController.destroy);

module.exports = router;