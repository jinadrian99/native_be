const pool = require('../../config/database');

module.exports = {
    createData: (data, cb) => {
        pool.query(
            `insert into ADMIN VALUES(?,?,?)`,
            [
                null,
                data.phanQuyen,
                data.tenAdmin
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
            `select * from ADMIN`,
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
            `select * from ADMIN where idAdmin = ?`,
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
            `update ADMIN set
                phanQuyen = ?,
                tenAdmin = ?
            where idAdmin = ?`,
            [
                data.phanQuyen,
                data.tenAdmin,
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
            `delete from ADMIN where idAdmin = ?`,
            [id],
            (error, result) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, result); 
            }
        )
    },
    getDataNumberOfAdminAccount: (callBack) => {
        pool.query(
            `
                SELECT 
                CASE 
                    WHEN phanQuyen = 1 THEN "IT Admin"
                    WHEN phanQuyen = 2 THEN "Manager"
                    ELSE "Receptionist"
                END AS adminAccount,
                COUNT(
                CASE 
                    WHEN phanQuyen = 1 THEN "IT Admin"
                    WHEN phanQuyen = 2 THEN "Manager"
                    ELSE "Receptionist"
                END
                ) AS numberAdminAcc
                FROM ADMIN
                GROUP BY adminAccount
            `,
            [],
            (error, results) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results); 
            }
        )
    }
};