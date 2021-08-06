const pool = require("../../config/database");

module.exports = {
    createData: (data, cb) => {
        pool.query(
            `insert into PHUTHU VALUES(?,?,?,?,?,?)`,
            [
                null,
                data.soLuong,
                data.donGia,
                data.idGPT,
                data.idPTT,
                data.ghiChu
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
    getDataByIDGPT: (idGPT, cb) => {
        pool.query(
            `select * FROM PHUTHU where idGPT = ?`,
            [
                idGPT
            ],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result);
            }
        )
    },
    getDataByIDPTTnIDGPT: (idGPT, idPTT, ghiChu, cb) => {
        pool.query(
            `select * FROM PHUTHU where idGPT = ? and idPTT = ? and ghiChu = ?`,
            [
                idGPT,
                idPTT,
                ghiChu
            ],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result);
            }
        )
    },
    getDataByIdPTTnIdGPTnGhiChuPreventIdGPT: (idPTT, idGPT, ghiChu, idPT, cb) => {
        pool.query(
            `select * FROM PHUTHU where idGPT = ? and idPTT = ? and ghiChu = ? and idPT != ?`,
            [
                idPTT,
                idGPT,
                ghiChu,
                idPT
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
                idPTT = ?,
                ghiChu = ?
            where idPT = ?`,
            [
                data.soLuong,
                data.donGia,
                data.idGPT,
                data.idPTT,
                data.ghiChu,
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