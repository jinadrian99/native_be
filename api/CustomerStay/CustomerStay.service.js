const pool = require("../../config/database");

module.exports = {
    createData: (data, cb) => {
        pool.query(
            `insert into KHACHHANGO VALUES(?,?,?,?,?,?,?,?)`,
            [
                null,
                data.CMND,
                data.Passport,
                data.sdt,
                data.quocGia,
                data.title,
                data.tenKH,
                data.ngaySinh      
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
            `select * from KHACHHANGO`,
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
            `select * from KHACHHANGO where idKHO = ?`,
            [id],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result[0]);
            }
        )
    },
    getDataByCMND: (cmnd, cb) => {
        pool.query(
            `select * from KHACHHANGO where CMND = ?`,
            [cmnd],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result[0]);
            }
        )
    },
    getDataByPassport: (passport, cb) => {
        pool.query(
            `select * from KHACHHANGO where Passport = ?`,
            [passport],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result[0]);
            }
        )
    },
    getDataBySdt: (sdt, cb) => {
        pool.query(
            `select * from KHACHHANGO where sdt = ?`,
            [sdt],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result[0]);
            }
        )
    },
    updateData: (id, data, cb) => {
        pool.query(
            `update KHACHHANGO set
                CMND = ?,
                Passport = ?,
                sdt = ?,
                quocGia = ?,
                title = ?,
                tenKH = ?,
                ngaySinh = ?
            where idKHO = ?`,
            [
                data.CMND,
                data.Passport,
                data.sdt,
                data.quocGia,
                data.title,
                data.tenKH,
                data.ngaySinh,
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
            `delete from KHACHHANGO where idKHO = ?`,
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