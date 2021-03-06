const pool = require("../../config/database");

module.exports = {
    createData: (data, cb) => {
        pool.query(
            `insert into CHITIETPHIEUTHANHTOAN VALUES(?,?,?,?)`,
            [
                null,
                data.donGia,
                data.maPhong,
                data.idPTT
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
            `select * from CHITIETPHIEUTHANHTOAN`,
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
            `select * from CHITIETPHIEUTHANHTOAN where idCTPTT = ?`,
            [id],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result[0]);
            }
        )
    },
    getDataByIDPTT: (idPTT, cb) => {
        pool.query(
            `select * FROM CHITIETPHIEUTHANHTOAN where idPTT = ?`,
            [
                idPTT
            ],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result);
            }
        )
    },
    getDataByMaPhongNIDPTT: (maPhong, idPTT, cb) => {
        pool.query(
            `select * from CHITIETPHIEUTHANHTOAN where maPhong = ? and idPTT = ?`,
            [
                maPhong,
                idPTT
            ],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result[0]);
            }
        )
    },
    getDataByMaPhongNIDPTTExceptID: (maPhong, idPTT, id, cb) => {
        pool.query(
            `select * from CHITIETPHIEUTHANHTOAN where maPhong = ? and idPTT = ? and idCTPTT != ?`,
            [
                maPhong,
                idPTT,
                id
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
            `update CHITIETPHIEUTHANHTOAN set
                donGia = ?,
                maPhong = ?,
                idPTT = ?
            where idCTPTT = ?`,
            [
                data.donGia,
                data.maPhong,
                data.idPTT,
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
            `delete from CHITIETPHIEUTHANHTOAN where idCTPTT = ?`,
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