const express = require('express');
const router = express.Router();
const resetPass = require("./resetPass.controller");

router.post('/', resetPass.saveInfo);
// router.get('/',(req, res)=>{
//     var email = req.query.email;
//     var token = req.query.token;

//     return res.status(200).json({email, token});

//     SELECT * FROM RESETPASS WHERE emaiL = ? AND token = ? AND exp > ?
//     [email, token, (new Date(),'yyyy/MM/dd')]

//     => result[0] != null -> change password

// })

module.exports = router;