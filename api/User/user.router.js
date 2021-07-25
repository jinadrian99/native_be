const express = require('express');
const router = express.Router();
const user = require("./user.controller");

router.post('/login-user', user.loginUser);
router.post('/login-admin', user.loginAdmin);
router.post('/register', user.register);
router.patch('/reset-password/:id', user.resetPassword);
router.get('/get_by_idadmin/:id', user.getUserByIDAdmin);
router.put('/update_admin_acc/:id', user.updateUserAdmin);
router.put('/update_cus_acc/:id', user.updateUserCus);
router.get('/', user.getUsers);
router.get('/:id', user.getUserByID);
router.post('/', user.createUser); 
router.delete('/:id', user.deleteUser);


module.exports = router;