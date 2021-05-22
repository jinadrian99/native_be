const express = require('express');
const router = express.Router();
const { 
    createImageRoomType, 
    getImageRoomTypes,
    getImageRoomTypeByID,
    updateImageRoomType,
    deleteImageRoomType,

    getImageRoomTypeByIDLP
} = require("./imageRoomType.controller");

router.get('/', getImageRoomTypes);
router.get('/:id', getImageRoomTypeByID);
router.post('/', createImageRoomType);
router.put('/:id', updateImageRoomType);
router.delete('/:id', deleteImageRoomType);

router.get('/get_by_idlp/:id', getImageRoomTypeByIDLP);

module.exports = router;