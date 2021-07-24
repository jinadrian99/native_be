const pool = require("../../config/database");

module.exports = {
    createData: (data, cb) => {
        pool.query(
            `insert into DONDATPHONG VALUES(?,?,?,?,?,?,?,?)`,
            [
                null,
                data.ngayDen,
                data.ngayDi,
                data.soDem,
                data.ngayDatPhong,
                data.tongThanhTien,
                data.trangThaiDat,
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
            `select * from DONDATPHONG`,
            [],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result);
            }
        )
    },
    getDataWasDepositOrPaidInBill: (tinhTrangPTT1, tinhTrangPTT2 , cb) => {
        pool.query(
            `SELECT DONDATPHONG.idDDP, PHIEUTHANHTOANPHONG.idPTT, PHIEUTHANHTOANPHONG.tinhTrang, DONDATPHONG.ngayDen, DONDATPHONG.ngayDi 
            FROM DONDATPHONG RIGHT JOIN PHIEUTHANHTOANPHONG ON DONDATPHONG.idDDP = PHIEUTHANHTOANPHONG.idDDP 
            WHERE PHIEUTHANHTOANPHONG.tinhTrang = ? OR  PHIEUTHANHTOANPHONG.tinhTrang = ?`,
            [
                tinhTrangPTT1,
                tinhTrangPTT2
            ],
            (error, results) => {
                if(error) { return cb(error); }
                return cb(null, results);
            }
        )
    },
    getDataByID: (id, cb) => {
        pool.query(
            `select * from DONDATPHONG where idDDP = ?`,
            [id],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result[0]);
            }
        )
    },    
    getDataByIdKHD: (idKHD, cb) => {
        pool.query(
            `select * from DONDATPHONG where idKHD = ?`,
            [idKHD],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result);
            }
        )
    },
    getTotalMoneyBookingByQuarterly: (quarter, year, cb) => {
        pool.query(
            `SELECT SUM(tongThanhTien) AS tongThanhTien FROM DONDATPHONG WHERE QUARTER(ngayDatPhong) = ? and YEAR(ngayDatPhong) = ?`,
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
    getDataDayNumNearToDay: (dayNum, today, cb) => {
        pool.query(
            `
                SELECT * 
                FROM DONDATPHONG 
                WHERE YEAR(ngayDen) = YEAR(?) and MONTH(ngayDen) = MONTH(?) and DAY(?) - DAY(ngayDen) >= 0 and DAY(?) - DAY(ngayDen) <= ?
            `,
            [
                today,
                today,
                today,
                today,
                dayNum
            ],
            (error, results)=>{
                if(error){ return cb(error); }
                return cb(null, results);
            }
        )
    },
    updateData: (id, data, cb) => {
        pool.query(
            `update DONDATPHONG set
                ngayDen = ?,
                ngayDi = ?,
                soDem = ?,
                ngayDatPhong = ?,
                tongThanhTien = ?,
                trangThaiDat = ?,
                idKHD = ?
            where idDDP = ?`,
            [
                data.ngayDen,
                data.ngayDi,
                data.soDem,
                data.ngayDatPhong,
                data.tongThanhTien,
                data.trangThaiDat,
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
    deleteData: (id, callBack) => {
        pool.query(
            `delete from DONDATPHONG where idDDP = ?`,
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