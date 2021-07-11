const express = require('express');
const router = express.Router();
const RRCController = require("./RRC.controller");

router.get('/', RRCController.index);
router.get('/:id', RRCController.show);
router.post('/', RRCController.store);
router.put('/:id', RRCController.update);

module.exports = router;