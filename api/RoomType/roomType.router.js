const express = require('express');
const router = express.Router();
const { 
    createRoomType, 
    getRoomTypes,
    getRoomTypeByID,
    updateRoomType,
    deleteRoomType,
    getRateByIDLP,
    getRoomsByIDLP,
    searchRoomTypeByDays
} = require("./roomType.controller");

router.post('/search-roomtype-by-days', searchRoomTypeByDays);
router.get('/get-rate-by-idLP/:idLP', getRateByIDLP);
router.get('/get-room-by-idLP/:idLP', getRoomsByIDLP);

router.get('/', getRoomTypes);
router.get('/:id', getRoomTypeByID);
router.post('/', createRoomType);
router.put('/:id', updateRoomType);
router.delete('/:id', deleteRoomType);



module.exports = router;