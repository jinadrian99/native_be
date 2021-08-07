const express = require('express');
const router = express.Router();

const customerStayController = require('./CustomerStay.controller');

router.post('/import-excel', customerStayController.importExcel);
router.post('/get-cus-by-date-save/', customerStayController.getCustomerStayByDateSave)

router.get('/', customerStayController.index);
router.get('/:id', customerStayController.show);
router.post('/', customerStayController.store);
router.put('/:id', customerStayController.update);
router.delete('/:id', customerStayController.destroy);

module.exports = router;