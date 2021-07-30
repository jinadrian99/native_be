const express = require('express');
const router = express.Router();

const DBSController = require('./BSD.controller');

router.get('/get-ctdddv-by-iddddv/:id', DBSController.getCtdddvByIddddv);

router.get('/', DBSController.index);
router.get('/:id', DBSController.show);
router.post('/', DBSController.store);
router.put('/:id', DBSController.update);
router.delete('/:id', DBSController.destroy);

module.exports = router;