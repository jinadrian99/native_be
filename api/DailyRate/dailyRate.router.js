const express = require('express');
const router = express.Router();

const dailyRateController = require('./dailyRate.controller');

router.get('/', dailyRateController.index);
router.get('/:id', dailyRateController.show);
router.post('/', dailyRateController.store);
router.put('/:id', dailyRateController.update);
router.delete('/:id', dailyRateController.destroy);


module.exports = router;