const express = require('express');
const router = express.Router();
const resetPass = require("./resetPass.controller");

router.post('/', resetPass.saveInfo);

module.exports = router;