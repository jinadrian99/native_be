const pool = require("../../config/database");

module.exports = {
    createData: (data, cb) => {
        pool.query(
            `insert into PHUTHU VALUES(?,?,?,?,?)`,
            [
                null,
                data.soLuong,
                data.donGia,
                data.idGPT,
                data.idPTT
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
            `select * from PHUTHU`,
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
            `select * from PHUTHU where idPT = ?`,
            [id],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result[0]);
            }
        )
    },
    getDataByIDPTT: (idPTT, cb) => {
        pool.query(
            `select * FROM PHUTHU where idPTT = ?`,
            [
                idPTT
            ],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result);
            }
        )
    },
    getDataByIDPTTnIDGPT: (idGPT, idPTT, cb) => {
        pool.query(
            `select * FROM PHUTHU where idGPT = ? and idPTT = ?`,
            [
                idGPT,
                idPTT
            ],
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
            `update PHUTHU set
                soLuong = ?,
                donGia = ?,
                idGPT = ?,
                idPTT = ?
            where idPT = ?`,
            [
                data.soLuong,
                data.donGia,
                data.idGPT,
                data.idPTT,
                id
            ],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result);
            }
        )
    },
    deleteData: (id, callBack) => {
        pool.query(
            `delete from PHUTHU where idPT = ?`,
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