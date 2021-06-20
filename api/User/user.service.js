const pool = require("../../config/database");

module.exports = {
    createData: (data, cb) => {
        pool.query(
            `insert into TAIKHOAN VALUES(?,?,?,?,?,?,?,?)`,
            [
                null,
                data.email,
                data.password,
                data.displayName,
                data.title,
                data.loaiTaiKhoan,
                data.idAdmin,
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
            `select * from TAIKHOAN`,
            [],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result);
            }
        )
    },    
    getUserByEmail: (email, cb) => {
        pool.query(
            `select * from TAIKHOAN where email = ?`,
            [email],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result);
            }
        )
    },
    getDataByIDAdmin: (idAdmin, cb) => {
        pool.query(
            `select * from TAIKHOAN where idAdmin = ?`,
            [idAdmin],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result);
            }
        )
    },
    getUserByEmail: (email, cb) => {
        pool.query(
            `select * from TAIKHOAN where email = ?`,
            [email],
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
            `select * from TAIKHOAN where idTK = ?`,
            [id],
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
            `update TAIKHOAN set
                email = ?,
                password = ?,
                displayName = ?,
                title = ?,
                loaiTaiKhoan = ?,
                idAdmin = ?,
                idKHD = ?
            where idTK = ?`,
            [
                data.email,
                data.password,
                data.displayName,
                data.title,
                data.loaiTaiKhoan,
                data.idAdmin,
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
            `delete from TAIKHOAN where idAdmin = ?`,
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