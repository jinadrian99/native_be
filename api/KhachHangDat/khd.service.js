const pool = require("../../config/database");

module.exports = {
    createData: (data, cb) => {
        pool.query(
            `insert into KHACHHANGDAT VALUES(?,?,?,?,?)`,
            [
                null,
                data.tenKH,
                data.sdt,
                data.CMND,
                data.Passport
            ],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result.insertId);
            }
        )
    },
    getAll: (cb) => {
        pool.query(
            `select * from KHACHHANGDAT`,
            [],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result);
            }
        )
    },
    getDataByID: (id, cb) => {
        pool.query(
            `select * from KHACHHANGDAT where idKHD = ?`,
            [id],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result);
            }
        )
    },
    getDataByCMND: (CMND, cb) => {
        pool.query(
            `select * from KHACHHANGDAT where CMND = ?`,
            [CMND],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result);
            }
        )
    },
    getDataByPassport: (Passport, cb) => {
        pool.query(
            `select * from KHACHHANGDAT where Passport = ?`,
            [Passport],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result);
            }
        )
    },
    updateData: (id, data, cb) => {
        pool.query(
            `update KHACHHANGDAT set
                tenKH = ?,
                sdt = ?,
                CMND = ?,
                Passport = ?
            where idKHD = ?`,
            [
                data.tenKH,
                data.sdt,
                data.CMND,
                data.Passport,
                id
            ],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result.insertId);
            }
        )
    },
    deleteData: (id, callBack) => {
        pool.query(
            `delete from KHACHHANGDAT where idKHD = ?`,
            [id],
            (error, result) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, result); 
            }
        )
    }
};