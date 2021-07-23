const express = require('express');
const router = express.Router();
const rrc = require("./rrc.controller");

router.get('/', rrc.getRRC);
router.get('/:id', rrc.getRRCByID);
router.get('/get-by-idDDP/:id', rrc.getRRCByIDDDP);

module.exports = router;