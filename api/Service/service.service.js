const pool = require('../../config/database');

module.exports = {
    createData: (data, callBack) => {
        pool.query(
            `insert into DICHVU VALUES(?,?,?,?,?,?)`,
            [
                null,
                data.tenDV,
                data.hinhThuc,
                data.donGia,
                data.moTaTD,
                data.moTaCT,
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAll: callBack => {
        pool.query(
            `select * from DICHVU`,
            [],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results); 
            }
        )
    },
    getDataByID: (id, callBack) => {
        pool.query(
            `select * from DICHVU where idDV = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]); 
            }
        )
    },
    updateData: (id, data, callBack) => {
        pool.query(
            `update DICHVU set 
                tenDV = ?,
                hinhThuc = ?,
                donGia = ?,
                moTaTD = ?,
                moTaCT = ?,
            where idDV = ?`,
            [
                data.tenDV,
                data.hinhThuc,
                data.donGia,
                data.moTaTD,
                data.moTaCT,
                id
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                // results[1]: affectedRows: hàng bị ảnh hưởng
                return callBack(null, results.affectedRows); 
            }
        )
    },
    deleteData: (id, callBack) => {
        pool.query(
            `delete from DICHVU where idDV = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                // results[1]: affectedRows: hàng bị ảnh hưởng
                return callBack(null, results.affectedRows); 
            }
        )
    }
};