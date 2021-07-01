const express = require('express');
const router = express.Router();
const admin = require("./admin.controller");

router.get('/', admin.getAdmin);
router.get('/:id', admin.getAdminByID);
router.post('/', admin.createAdmin);
router.put('/:id', admin.updateAdmin);
router.delete('/:id', admin.deleteAdmin);

module.exports = router;