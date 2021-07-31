const pool = require("../../config/database");

module.exports = {
    createData: (data, cb) => {
        pool.query(
            `insert into CHITIETDATDICHVU VALUES(?,?,?,?,?,?)`,
            [
                null,
                data.donGia,
                data.hinhThuc,
                data.soLuong,
                data.idDDDV,
                data.idDV
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
            `select * from CHITIETDATDICHVU`,
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
            `select * from CHITIETDATDICHVU where idCTDDV = ?`,
            [id],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result[0]);
            }
        )
    },
    getDataByIdDDDV: (idDDDV, cb) => {
        pool.query(
            `select * FROM CHITIETDATDICHVU where idDDDV = ?`,
            [
                idDDDV
            ],
            (error, results) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, results);
            }
        )
    },
    getDataByIdDDDVIdDV: (idDDDV, idDV, cb) => {
        pool.query(
            `select * FROM CHITIETDATDICHVU where idDDDV = ? and idDV = ?`,
            [
                idDDDV,
                idDV
            ],
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
            `update CHITIETDATDICHVU set
                donGia = ?,
                hinhThuc = ?,
                soLuong = ?,
                idDDDV = ?,
                idDV = ?
            where idCTDDV = ?`,
            [
                data.donGia,
                data.hinhThuc,
                data.soLuong,
                data.idDDDV,
                data.idDV,
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
            `delete from CHITIETDATDICHVU where idCTDDV = ?`,
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