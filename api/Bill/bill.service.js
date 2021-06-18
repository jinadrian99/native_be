const pool = require("../../config/database");

module.exports = {
    createData: (data, cb) => {
        pool.query(
            `insert into PHIEUTHANHTOANPHONG VALUES()`,
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
                data.idThe,
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
                idThe = ?,
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
                data.idThe,
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
    }
};