const resetPass = require('./resetPass.service');
const sendMailResetPassLink = require('../../scheduler/sendMailResetPassLink');
const emailExistence = require('email-existence');
const { sign } = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/jwt_secret');

var user = require('../User/user.service');

module.exports = {
    saveInfo: (req, res) => {
        const data = req.body;
        emailExistence.check(data.email, (err, resEmail) => {
            if (resEmail) {
                user.getUserByEmail(data.email, (err, resUser) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json(err);
                    }
                    if (resUser.length <= 0) {
                        return res.status(400).json("Not found");
                    }
                    if (resUser.length > 0) {
                        const request = {
                            email: data.email,
                            idTK: resUser[0].idTK
                        }
                        console.log('request: ', request);
                        const token = sign(request, JWT_SECRET, { 
                            expiresIn: '60s',
                        });
                        resetPass.createData(request, (err, results) => {
                            if (err) {
                                console.log(err);
                                return res.status(500).json(err);
                            }
                            sendMailResetPassLink(data.email, token);
                            return res.status(200).json(results);
                        });
                    }
                })
            }
            else {
                return res.status(400).json("Invalid email!!!");
            }
        })
    }
}