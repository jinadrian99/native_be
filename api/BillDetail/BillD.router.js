const express = require('express');
const router = express.Router();

const DBillController = require('./BillD.controller');

router.get('/', DBillController.index);
router.get('/:id', DBillController.show);
router.post('/', DBillController.store);
router.put('/:id', DBillController.update);
router.delete('/:id', DBillController.destroy);

module.exports = router;