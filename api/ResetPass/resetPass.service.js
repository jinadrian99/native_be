const pool = require("../../config/database");

module.exports = {
    createData: (data, cb) => {
        pool.query(
            `insert into RESETPASS VALUES(?,?,?)`,
            [
                null,
                data.email,
                data.idTK
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
            `select * from RESETPASS`,
            [],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result);
            }
        )
    },
    getDataByIdTK: (idTK, cb) => {
        pool.query(
            `select * from RESETPASS where idTK = ?`,
            [idTK],
            (error, result) => {
                if(error) { return cb(error); }
                return cb(null, result);
            }
        )
    },
    getDataByID: (id, cb) => {
        pool.query(
            `select * from RESETPASS where idReset = ?`,
            [id],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result);
            }
        )
    }
};