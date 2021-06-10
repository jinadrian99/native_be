const pool = require("../../config/database");

module.exports = {
    createData: (data, cb) => {
        pool.query(
            `insert into GIATHEONGAY VALUES(?,?,?,?)`,
            [
                null,
                data.ngayBatDau,
                data.giaMoiTuan,
                data.idLP
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
            `select * from GIATHEONGAY`,
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
            `select * from GIATHEONGAY where idGTN = ?`,
            [id],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result[0]);
            }
        )
    },
    getDataByIDLP: (idLP, cb) => {
        pool.query(
            `SELECT * FROM GIATHEONGAY WHERE idLP = ? ORDER BY ngayBatDau DESC`,
            [idLP],
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
            `update GIATHEONGAY set
                ngayBatDau = ?,
                giaMoiTuan = ?,
                idLP = ?
            where idGTN = ?`,
            [
                data.ngayBatDau,
                data.giaMoiTuan,
                data.idLP,
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
            `delete from GIATHEONGAY where idGTN = ?`,
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