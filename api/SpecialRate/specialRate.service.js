const pool = require("../../config/database");

module.exports = {
    createData: (data, cb) => {
        pool.query(
            `insert into GIATHEOTHU VALUES(?,?,?,?)`,
            [
                null,
                data.thu,
                data.giaTheoThu,
                data.idGTN
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
            `select * from GIATHEOTHU`,
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
            `select * from GIATHEOTHU where idGTT = ?`,
            [id],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result[0]);
            }
        )
    },
    getDataByIDGTT: (idLP, cb) => {
        pool.query(
            `SELECT * FROM GIATHEOTHU WHERE idGTN = ? ORDER BY thu`,
            [idLP],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result);
            }
        )
    },
    getDataByThuNIDGTN: (thu, idGTN, cb) => {
        pool.query(
            `SELECT * FROM GIATHEOTHU WHERE idGTN = ? and thu = ?`,
            [
                idGTN,
                thu
            ],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result)
            }
        )
    },
    getDataByThuNIDGTNPreventIdGTT: (thu, idGTN, idGTT, cb) => {
        pool.query(
            `SELECT * FROM GIATHEOTHU WHERE idGTN = ? and thu = ? and idGTT != ?`,
            [
                idGTN,
                thu,
                idGTT
            ],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result)
            }
        )
    },
    updateData: (id, data, cb) => {
        pool.query(
            `update GIATHEOTHU set
                thu = ?,
                giaTheoThu = ?,
                idGTN = ?
            where idGTT = ?`,
            [
                data.thu,
                data.giaTheoThu,
                data.idGTN,
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
            `delete from GIATHEOTHU where idGTT = ?`,
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