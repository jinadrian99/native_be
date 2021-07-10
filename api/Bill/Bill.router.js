const express = require('express');
const router = express.Router();
const BillController = require("./Bill.controller");

router.get('/get-bills-by-id-customer-booking/:idKHD', BillController.getBillsByIDKHD);
router.get('/change-status-to-deposit-by-id-bill/:idPTT', BillController.changeStatusToDepositByIdPTT);

router.get('/get-bill-by-idDDP/:id', BillController.getBillByIdDDP);
router.get('/:id', BillController.show);
router.post('/', BillController.store);
router.put('/:id', BillController.update);

module.exports = router;