const express = require('express');
const router = express.Router();
const { 
    createService, 
    getServices,
    getServiceID,
    updateService,
    deleteService
} = require("./service.controller");

router.get('/', getServices);
router.get('/:id', getServiceID);
router.post('/', createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

module.exports = router;