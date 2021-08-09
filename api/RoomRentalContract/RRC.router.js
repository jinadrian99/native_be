const express = require('express');
const router = express.Router();
const RRCController = require("./RRC.controller");

router.get('/get-by-idDDP/:id', RRCController.getRRCByIDDDP);
router.get('/update-status-paid-by-idddp/:id', RRCController.updateStatusPaidByIDDDP);

router.get('/get-rrc-by-idkhd-with-status-rrc-is-using/:id', RRCController.getRRCByIdKHDWithStatusRRCIsUsing);
router.post('/get-rrc-by-idkhd-idddp-with-status-rrc-is-using', RRCController.getRRCByIdKHDIdDDPWithStatusRRCIsUsing);

router.get('/', RRCController.index);
router.get('/:id', RRCController.show);
router.post('/', RRCController.store);
router.put('/:id', RRCController.update);

module.exports = router;