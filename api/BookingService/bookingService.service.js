const pool = require("../../config/database");

module.exports = {
    createData: (data, cb) => {
        pool.query(
            `insert into DONDATDICHVU VALUES(?,?,?,?,?,?)`,
            [
                null,
                data.ngayDat,
                data.tongThanhTien,
                data.trangThai,
                data.idPTP,
                data.idKHD
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
            `select * from DONDATDICHVU ORDER BY idDDDV DESC`,
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
            `select * from DONDATDICHVU where idDDDV = ?`,
            [id],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result[0]);
            }
        )
    },
    getDataByIdkhd: (idKHD, cb) => {
        pool.query(
            `select * from DONDATDICHVU where idKHD = ? ORDER BY idDDDV DESC`,
            [idKHD],
            (error, results) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, results);
            }
        )
    },
    getTotalMoneyBookingServiceByQuarterly: (quarter, year, cb) => {
        pool.query(
            `SELECT SUM(tongThanhTien) AS tongThanhTien FROM DONDATDICHVU WHERE QUARTER(ngayDat) = ? and YEAR(ngayDat) = ?`,
            [
                quarter,
                year
            ],
            (error, result)=>{
                if(error) {
                    return cb(error);
                }
                return cb(null, result[0]);
            }
        )
    },
    updateData: (id, data, cb) => {
        pool.query(
            `update DONDATDICHVU set
                ngayDat = ?,
                tongThanhTien = ?,
                trangThai = ?,
                idPTP = ?,
                idKHD = ?
            where idDDDV = ?`,
            [
                data.ngayDat,
                data.tongThanhTien,
                data.trangThai,
                data.idPTP,
                data.idKHD,
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
    updateStatusDataByID: (id, status, cb) => {
        pool.query(
            `update DONDATDICHVU set
                trangThai = ?
            where idDDDV = ?`,
            [
                status,
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
            `delete from DONDATDICHVU where idDDDV = ?`,
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