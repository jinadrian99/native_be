const pool = require("../../config/database");

//SELECT `idThe`, `tenThe`, `thoiHanThe`, `loaiThe`, `nganHang`, `email`, `diaChi` FROM `THETHANHTOAN` WHERE 1

module.exports = {
    createData: (data, cb) => {
        pool.query(
            `insert into THETHANHTOAN VALUES(?,?,?,?,?,?,?)`,
            [
                data.idThe,
                data.tenThe,
                data.thoiHanThe,
                data.loaiThe,
                data.nganHang,
                data.email,
                data.diaChi
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
            `select * from THETHANHTOAN`,
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
            `select * from THETHANHTOAN where idThe = ?`,
            [id],
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
            `update THETHANHTOAN set
                tenThe = ?,
                thoiHanThe = ?,
                loaiThe = ?,
                nganHang = ?,
                email = ?,
                diaChi = ?
            where idThe = ?`,
            [
                data.tenThe,
                data.thoiHanThe,
                data.loaiThe,
                data.nganHang,
                data.email,
                data.diaChi,
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
            `delete from THETHANHTOAN where idThe = ?`,
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