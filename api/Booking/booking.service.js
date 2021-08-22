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
            `select * from DONDATPHONG ORDER BY idDDP DESC`,
            [],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result);
            }
        )
    },
    getDataWasDepositInBill: (tinhTrangPTT1 , cb) => {
        pool.query(
            `SELECT DONDATPHONG.idDDP, PHIEUTHANHTOANPHONG.idPTT, PHIEUTHANHTOANPHONG.tinhTrang, DONDATPHONG.ngayDen, DONDATPHONG.ngayDi 
            FROM DONDATPHONG RIGHT JOIN PHIEUTHANHTOANPHONG ON DONDATPHONG.idDDP = PHIEUTHANHTOANPHONG.idDDP 
            WHERE PHIEUTHANHTOANPHONG.tinhTrang = ?`,
            [
                tinhTrangPTT1,
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
            `select * from DONDATPHONG where idKHD = ? ORDER BY idDDP DESC`,
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
    getDataByIdKHDWithStatusRRC: (idKHD, statusRRC, cb) => {
        pool.query(
            `
                SELECT DONDATPHONG.*
                FROM DONDATPHONG LEFT JOIN PHIEUTHUEPHONG ON DONDATPHONG.idDDP = PHIEUTHUEPHONG.idDDP
                WHERE DONDATPHONG.idKHD = ? AND PHIEUTHUEPHONG.trangThai = ?
                GROUP BY DONDATPHONG.idDDP
            `,
            [
                idKHD, 
                statusRRC
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
    },
    
    //For: Scheduler
    schedulerChangeStatusByDateArriveAndStatus: (statusNew, statusOld, date, callBack) => {
        // SELECT DONDATPHONG.idDDP, PHIEUTHANHTOANPHONG.idDDP
        // FROM DONDATPHONG LEFT JOIN PHIEUTHANHTOANPHONG ON DONDATPHONG.idDDP = PHIEUTHANHTOANPHONG.idDDP 
        // WHERE DONDATPHONG.trangThaiDat = 0 AND PHIEUTHANHTOANPHONG.idDDP IS NULL AND DONDATPHONG.ngayDen <= "2021-7-11"
        pool.query(
            `
                UPDATE DONDATPHONG LEFT JOIN PHIEUTHANHTOANPHONG ON DONDATPHONG.idDDP = PHIEUTHANHTOANPHONG.idDDP 
                SET DONDATPHONG.trangThaiDat = ?
                WHERE DONDATPHONG.trangThaiDat = ? AND PHIEUTHANHTOANPHONG.idDDP IS NULL AND DONDATPHONG.ngayDen <= ?
            `,
            [
                statusNew,
                statusOld,
                date
            ],
            (error, result) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, result.affectedRows); 
            }
        )
    },
};