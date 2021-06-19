const express = require('express');
const router = express.Router();

const roomController = require('./room.controller');

router.get('/', roomController.index);
router.get('/:id', roomController.show);
router.post('/', roomController.store);
router.put('/:id', roomController.update);
router.delete('/:id', roomController.destroy);

module.exports = router;