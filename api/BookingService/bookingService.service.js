const pool = require("../../config/database");

module.exports = {
    createData: (data, cb) => {
        pool.query(
            `insert into DONDATDICHVU VALUES(?,?,?,?,?,?,?)`,
            [
                null,
                data.ngayDat,
                data.tongThanhTien,
                data.trangThai,
                data.idPTP,
                data.idKHD,
                data.idThe
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
            `select * from DONDATDICHVU`,
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
    getTotalMoneyBookingServiceByQuarterly: (quarter, year, cb) => {
        pool.query(
            ` SELECT SUM(tongThanhTien) AS tongThanhTien FROM DONDATDICHVU WHERE QUARTER(ngayDat) = ? and YEAR(ngayDat) = ?`,
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
                idKHD = ?,
                idThe = ?
            where idDDDV = ?`,
            [
                data.ngayDat,
                data.tongThanhTien,
                data.trangThai,
                data.idPTP,
                data.idKHD,
                data.idThe,
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