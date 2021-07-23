const pool = require("../../config/database");

module.exports = {
    createData: (data, cb) => {
        pool.query(
            `insert into PHIEUTHUEPHONG VALUES(?,?,?,?,?,?,?)`,
            [
                data.idPTP,
                data.ngayDen,
                data.NgayDi,
                data.trangThai,
                data.maPhong,
                data.idDDP,
                data.idKHO
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
            `select * from PHIEUTHUEPHONG`,
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
            `select * from PHIEUTHUEPHONG where idPTP = ?`,
            [id],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result[0]);
            }
        )
    },
    getDataByIdKHO: (idKHO, cb) => {
        pool.query(
            `select * from PHIEUTHUEPHONG where idKHO = ?`,
            [idKHO],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result);
            }
        )
    },
    getDataByIdDDP: (idDDP, cb) => {
        pool.query(
            `select * from PHIEUTHUEPHONG where idDDP = ?`,
            [idDDP],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result);
            }
        )
    },
    findIDRoombyDays: (dateA, dateB, trangThai, cb) => {
        pool.query(
            `SELECT maPhong FROM PHIEUTHUEPHONG WHERE ngayDi >= ? and ngayDen <= ? and trangThai = ?`,
            [
                dateA,
                dateB,
                trangThai
            ],
            (error, result) => {
                if(error) { return cb(error); }
                return cb(null, result);
            }
        )
    },
    updateData: (id, data, cb) => {
        pool.query(
            `update PHIEUTHUEPHONG set
                ngayDen = ?,
                NgayDi = ?,
                trangThai = ?,
                maPhong = ?,
                idDDP = ?,
                idKHO = ?
            where idPTP = ?`,
            [
                data.ngayDen,
                data.NgayDi,
                data.trangThai,
                data.maPhong,
                data.idDDP,
                data.idKHO,
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
            `delete from PHIEUTHUEPHONG where idPTP = ?`,
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