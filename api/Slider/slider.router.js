const express = require('express');
const router = express.Router();
const { 
    createSlider, 
    getSliders,
    getSliderByID,
    updateSlider,
    deleteSlider
} = require("./slider.controller");

router.get('/', getSliders);
router.get('/:id', getSliderByID);
router.post('/', createSlider);
router.put('/:id', updateSlider);
router.delete('/:id', deleteSlider);

module.exports = router;