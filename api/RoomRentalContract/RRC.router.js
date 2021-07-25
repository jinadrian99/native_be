const express = require('express');
const router = express.Router();
const RRCController = require("./RRC.controller");

router.get('/get-by-idDDP/:id', RRCController.getRRCByIDDDP);

router.get('/', RRCController.index);
router.get('/:id', RRCController.show);
router.get('/get-by-idDDP/:id', RRCController.getRRCByIDDDP);
router.post('/', RRCController.store);
router.put('/:id', RRCController.update);

module.exports = router;