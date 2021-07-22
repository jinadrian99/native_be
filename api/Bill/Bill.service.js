const pool = require("../../config/database");

module.exports = {
    createData: (data, cb) => {
        pool.query(
            `insert into PHIEUTHANHTOANPHONG VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                null,
                data.ngayThanhToan,
                data.tinhTrang,
                data.tongThanhTien,
                data.tienPhaiTra,
                data.tienCoc,
                data.tienConLai,
                data.phanTramGiam,
                data.idKM,
                data.idKHD,
                data.idDDP,
                data.ngayDen,
                data.ngayDi,
                data.soDem
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
            `select * from PHIEUTHANHTOANPHONG`,
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
            `select * from PHIEUTHANHTOANPHONG where idPTT = ?`,
            [id],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result[0]);
            }
        )
    },
    getDataByIDKHD: (idKHD, cb) => {
        pool.query(
            `select * from PHIEUTHANHTOANPHONG where idKHD = ?`,
            [idKHD],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result);
            }
        )
    },
    changeStatus: (idPTT, status, cb) => {
        pool.query(
            `update PHIEUTHANHTOANPHONG set tinhTrang = ? where idPTT = ?`,
            [
                status,
                idPTT
            ],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result.insertId);
            }
        )
    },
    findIDbyDays: (dateA, dateB, tinhTrang, cb) => {
        pool.query(
            `SELECT idPTT FROM PHIEUTHANHTOANPHONG WHERE ngayDi >= ? and ngayDen <= ? and tinhTrang = ?`,
            [
                dateA,
                dateB,
                tinhTrang
            ],
            (error, results) => {
                if(error)   { return cb(error); }
                return cb(null, results);
            }
        )
    },
    getDataByIdddp: (idDDP, cb) => {
        pool.query(
            `SELECT * FROM PHIEUTHANHTOANPHONG WHERE idDDP = ?`,
            [
                idDDP
            ],
            (error, result) => {
                if(error) { return cb(error); }
                return cb(null, result[0]);
            }
        )
    },
    getDataByIdddpWithStatusUndeposit: (idDDP, cb) => {
        pool.query(
            `SELECT * FROM PHIEUTHANHTOANPHONG WHERE idDDP = ? AND tinhTrang = 1`,
            [
                idDDP
            ],
            (error, result) => {
                if(error) { return cb(error); }
                return cb(null, result[0]);
            }
        )
    },
    updateData: (id, data, cb) => {
        pool.query(
            `update PHIEUTHANHTOANPHONG set
                ngayThanhToan = ?,
                tinhTrang = ?,
                tongThanhTien = ?,
                tienPhaiTra = ?,
                tienCoc = ?,
                tienConLai = ?,
                phanTramGiam = ?,
                idKM = ?,
                idKHD = ?,
                idDDP = ?,
                ngayDen = ?,
                ngayDi = ?,
                soDem = ?
            where idPTT = ?`,
            [
                data.ngayThanhToan,
                data.tinhTrang,
                data.tongThanhTien,
                data.tienPhaiTra,
                data.tienCoc,
                data.tienConLai,
                data.phanTramGiam,
                data.idKM,
                data.idKHD,
                data.idDDP,
                data.ngayDen,
                data.ngayDi,
                data.soDem,
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
            `delete from PHIEUTHANHTOANPHONG where idPTT = ?`,
            [id],
            (error, result) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, result); 
            }
        )
    },
    getTotalMoneyBillByMonth: (month, year, cb) => {
        pool.query(
            `SELECT SUM(tienPhaiTra) AS tienPhaiTra FROM PHIEUTHANHTOANPHONG WHERE MONTH(ngayThanhToan) = ? and YEAR(ngayThanhToan) = ?`,
            [
                month,
                year
            ],
            (error, result)=>{
                if(error) {
                    return cb(error);
                }
                return cb(null, result[0]);
            }
        )
    }
};
