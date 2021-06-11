const user = require('./user.service');

const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

var khd = require('../KhachHangDat/khd.service');

module.exports = {
    createUser: (req, res) => {
        const data = req.body;
        if (data.loaiTaiKhoan !== 1) {
            const salt = genSaltSync(10);
            data.password = hashSync(data.password, salt);
        }
        user.createData(data, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.status(200).json(results);
        });
    },
    getUsers: (req, res) => {
        user.getAll((err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.status(200).json(results);
        });
    },
    getUserByID: (req, res) => {
        const id = req.params.id;
        user.getDataByID(id, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            if(results == null) {
                return res.status(404).json('Record not found');
            }
            return res.status(200).json(results);
        });
    },
    updateUser: (req, res) => {
        const id = req.params.id;
        const data = req.body;
        const salt = genSaltSync(10);
        data.password = hashSync(data.password, salt);
        user.updateData(id, data, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            if(results == null) {
                return res.status(404).json('Record not found');
            }
            return res.status(200).json('Updated successfully');
        });
    },
    deleteUser: (req, res) => {
        const data = req.body;
        user.deleteData(data.idTK, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            if(results == 0) {
                return res.status(404).json('Record not found');
            }
            return res.status(200).json('Deleted successfully');
        })
    },
    login: (req, res) => {
        const data = req.body;
        user.getUserByEmail(data.email, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }
            if (!results) {
                return res.status(400).json('Invalid email or password')
            }
            const result = compareSync(data.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, "nativeHotel", {
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    message: 'Login successfully',
                    token: jsontoken
                });
            }
            else {
                return res.status(400).json('Invalid email or password')
            }
        });
    },
    register: (req, res, next) => {
        const data = req.body;
        user.getUserByEmail(data.email, (err, results) => {
            if (err) {
                console.log(err);
                khd.deleteData(data.idKHD, (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json(err);
                    }
                    return res.status(200).json(results);
                });
            }
            if (results.length > 0) {
                khd.deleteData(data.idKHD, (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json(err);
                    }
                    return res.status(200).json(results);
                });
                return res.status(400).json('Invalid email')
            }
            if (data.loaiTaiKhoan !== 1) {
                const salt = genSaltSync(10);
                data.password = hashSync(data.password, salt);
            }
            user.createData(data, (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json(err);
                }
                return res.status(200).json(results);
            });
        });
    }
}