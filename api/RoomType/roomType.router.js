const express = require('express');
const router = express.Router();
const { 
    createRoomType, 
    getRoomTypes,
    getRoomTypeByID,
    updateRoomType,
    deleteRoomType
} = require("./roomType.controller");

router.get('/', getRoomTypes);
router.get('/:id', getRoomTypeByID);
router.post('/', createRoomType);
router.put('/:id', updateRoomType);
router.delete('/:id', deleteRoomType);

module.exports = router;