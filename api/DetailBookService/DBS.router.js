const express = require('express');
const router = express.Router();

const DBSController = require('./DBS.controller');

router.get('/', DBSController.index);
router.get('/:id', DBSController.show);
router.post('/', DBSController.store);
router.put('/:id', DBSController.update);
router.delete('/:id', DBSController.destroy);

module.exports = router;