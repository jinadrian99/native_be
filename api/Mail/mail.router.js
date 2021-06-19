const express = require('express');
const router = express.Router();

const sendMailController = require('./sendMail.controller');

router.post('/check-mail-exist', sendMailController.checkExistEmail);
router.post('/send-mail-active', sendMailController.sendToActive);

module.exports = router;