const express = require('express');
const router = express.Router();
const user = require("./user.controller");

router.get('/', user.getUsers);
router.get('/get_by_idadmin/:id', user.getUserByIDAdmin);
router.get('/:id', user.getUserByID);
router.post('/', user.createUser);
router.put('/:id', user.updateUser);
router.delete('/:id', user.deleteUser);
router.post('/login', user.login);
router.post('/register', user.register);


module.exports = router;