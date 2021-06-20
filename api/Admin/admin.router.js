const express = require('express');
const router = express.Router();
const admin = require("./admin.controller");

<<<<<<< HEAD
router.get('/', admin.getAdmin);
router.get('/:id', admin.getAdminByID);
router.post('/', admin.createAdmin);
router.put('/:id', admin.updateAdmin);
router.delete('/:id', admin.deleteAdmin);
=======
const admin = require("./admin.controller");
>>>>>>> db7a37515a0db321cfec7d87c4471bb930ef8aad

router.get('/', admin.getAdmin);
router.get('/:id', admin.getAdminByID);
router.post('/', admin.createAdmin);
router.put('/:id', admin.updateAdmin);
router.delete('/:id', admin.deleteAdmin);

module.exports = router;