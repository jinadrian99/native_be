const pool = require("../../config/database");

module.exports = {
    createData: (data, cb) => {
        pool.query(
            `insert into PHONG VALUES(?,?,?,?)`,
            [
                data.maPhong,
                data.soNguoi,
                data.trangThai,
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
        // lấy các phòng có trong chi tiết ptt của ptt theo cái idDDP
        // phiếu tt sẽ làm gốc
        pool.query(
            `
                SELECT PHONG.maPhong, PHONG.soNguoi, PHONG.idLP, CHITIETPHIEUTHANHTOAN.idCTPTT, PHIEUTHANHTOANPHONG.idPTT 
                FROM PHONG RIGHT JOIN CHITIETPHIEUTHANHTOAN ON PHONG.maPhong = CHITIETPHIEUTHANHTOAN.maPhong 
                RIGHT JOIN PHIEUTHANHTOANPHONG ON CHITIETPHIEUTHANHTOAN.idPTT = PHIEUTHANHTOANPHONG.idPTT 
                WHERE PHIEUTHANHTOANPHONG.idDDP = ?
            `,
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
    getDataByIdBillWithBill: (idPTT, cb) => {
        // lấy các phòng có trong chi tiết ptt của ptt theo cái idPTT
        // phiếu tt sẽ làm gốc
        pool.query(
            `
                SELECT PHONG.maPhong, PHONG.soNguoi, PHONG.idLP, CHITIETPHIEUTHANHTOAN.idCTPTT, PHIEUTHANHTOANPHONG.idPTT 
                FROM PHONG RIGHT JOIN CHITIETPHIEUTHANHTOAN ON PHONG.maPhong = CHITIETPHIEUTHANHTOAN.maPhong 
                RIGHT JOIN PHIEUTHANHTOANPHONG ON CHITIETPHIEUTHANHTOAN.idPTT = PHIEUTHANHTOANPHONG.idPTT 
                WHERE PHIEUTHANHTOANPHONG.idPTT = ?
            `,
            [
                idPTT
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
    getDataByIDLPNotBusy: (idLP, cb) => {
        pool.query(
            `SELECT * FROM PHONG WHERE idLP = ? AND trangThai = 2`,
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
                trangThai = ?,
                idLP = ?
            where maPhong = ?`,
            [
                data.soNguoi,
                data.trangThai,
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
    updateSoNguoiByIdLP: (id, soNguoi, cb) => {
        pool.query(
            `UPDATE PHONG SET soNguoi = ? WHERE idLP = ? `,
            [
                soNguoi,
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