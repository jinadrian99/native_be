const pool = require("../../config/database");

module.exports = {
    createData: (data, cb) => {
        pool.query(
            `insert into PHONG VALUES(?,?,?)`,
            [
                data.maPhong,
                data.soNguoi,
                data.idLP
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
            `select * from PHONG`,
            [],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result);
            }
        )
    },
    getDataByIdBookingWithBill: (idDDP, cb) => {
        pool.query(
            `SELECT PHONG.maPhong, PHONG.soNguoi, PHONG.idLP, CHITIETPHIEUTHANHTOAN.idCTPTT, PHIEUTHANHTOANPHONG.idPTT 
            FROM PHONG RIGHT JOIN CHITIETPHIEUTHANHTOAN ON PHONG.maPhong = CHITIETPHIEUTHANHTOAN.maPhong RIGHT JOIN PHIEUTHANHTOANPHONG ON CHITIETPHIEUTHANHTOAN.idPTT = PHIEUTHANHTOANPHONG.idPTT 
            WHERE PHIEUTHANHTOANPHONG.idDDP = ?`,
            [
                idDDP
            ],
            (error, results) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, results);
            }
        )
    },
    getDataByID: (id, cb) => {
        pool.query(
            `select * from PHONG where maPhong = ?`,
            [id],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result[0]);
            }
        )
    },
    getDataByIDLP: (idLP, cb) => {
        pool.query(
            `SELECT * FROM PHONG WHERE idLP = ?`,
            [idLP],
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
            `update PHONG set
                soNguoi = ?,
                idLP = ?
            where maPhong = ?`,
            [
                data.soNguoi,
                data.idLP,
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
            `delete from PHONG where maPhong = ?`,
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