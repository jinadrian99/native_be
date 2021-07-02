const express = require('express');
const router = express.Router();
const PayerC = require("./Payer.controller");

router.get('/', PayerC.index);
router.get('/:id', PayerC.show);
router.post('/', PayerC.store);
router.put('/:id', PayerC.update);
router.delete('/:id', PayerC.destroy);

module.exports = router;