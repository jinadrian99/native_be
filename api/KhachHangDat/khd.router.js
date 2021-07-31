const express = require('express');
const router = express.Router();
const khd = require("./khd.controller");

router.get('/get-khd-with-status-rrc-is-using', khd.getKHDWithStatusRRCIsUsing);

router.get('/', khd.getKHD);
router.get('/:id', khd.getKHDByID);
router.post('/', khd.createKHD);
router.put('/:id', khd.updateKHD);
// router.delete('/:id', khd.deleteKHD);

module.exports = router;