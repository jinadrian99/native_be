const pool = require("../../config/database");

module.exports = {
    createData: (data, cb) => {
        pool.query(
            `insert into CHITIETDONDATPHONG VALUES(?,?,?,?)`,
            [
                null,
                data.donGia,
                data.maPhong,
                data.idDDP
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
            `select * from CHITIETDONDATPHONG`,
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
            `select * from CHITIETDONDATPHONG where idCTDDP = ?`,
            [id],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result[0]);
            }
        )
    },
    getDataByMaPhongNIDDDP: (maPhong, idDDP, cb) => {
        pool.query(
            `select * from CHITIETDONDATPHONG where maPhong = ? and idDDP = ?`,
            [
                maPhong,
                idDDP
            ],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result[0]);
            }
        )
    },
    getDataByIDDDP: (idDDP, cb) => {
        pool.query(
            `select * from CHITIETDONDATPHONG where idDDP = ?`,
            [
                idDDP
            ],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result);
            }
        )
    },
    updateData: (id, data, cb) => {
        pool.query(
            `update CHITIETDONDATPHONG set
                donGia = ?,
                maPhong = ?,
                idDDP = ?
            where idCTDDP = ?`,
            [
                data.donGia,
                data.maPhong,
                data.idDDP,
                data.idCTDDP
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
            `delete from CHITIETDONDATPHONG where idCTDDP = ?`,
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