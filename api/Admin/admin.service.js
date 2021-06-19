const pool = require('../../config/database');

module.exports = {
    createData: (data, cb) => {
        pool.query(
            `insert into ADMIN VALUES(?,?,?)`,
            [
                null,
                data.phanQuyen,
                data.tenAdmin
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
            `select * from ADMIN`,
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
            `select * from ADMIN where idAdmin = ?`,
            [id],
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
            `update ADMIN set
                phanQuyen = ?,
                tenAdmin = ?
            where idAdmin = ?`,
            [
                data.phanQuyen,
                data.tenAdmin,
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
            `delete from ADMIN where idAdmin = ?`,
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