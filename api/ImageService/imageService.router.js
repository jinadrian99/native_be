const express = require('express');
const router = express.Router();
const { 
    createImageService, 
    getImageServices,
    getImageServiceByID,
    updateImageService,
    deleteImageService,

    getImageServiceByIDDV
} = require("./imageService.controller");

router.get('/', getImageServices);
router.get('/:id', getImageServiceByID);
router.post('/', createImageService);
router.put('/:id', updateImageService);
router.delete('/:id', deleteImageService);

router.get('/get_by_iddv/:id', getImageServiceByIDDV);

module.exports = router;