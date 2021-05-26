const pool = require('../../config/database');

module.exports = {
    createData: (data, callBack) => {
        pool.query(
            `insert into HINHANHDICHVU VALUES(?,?,?)`,
            [
                null,
                data.hinhAnh,
                data.idDV
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
            `select * from HINHANHDICHVU`,
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
            `select * from HINHANHDICHVU where idHinhDV = ?`,
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
            `update HINHANHDICHVU set 
                hinhAnh = ?,
                idDV = ?
            where idHinhDV = ?`,
            [
                data.hinhAnh,
                data.idDV,
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
            `delete from HINHANHDICHVU where idHinhDV = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                // results[1]: affectedRows: hàng bị ảnh hưởng
                return callBack(null, results.affectedRows); 
            }
        )
    },

    getDataByIDDV: (idDV, callBack) => {
        pool.query(
            `select * from HINHANHDICHVU where idDV = ?`,
            [idDV],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                } 
                return callBack(null, results);
            }
        )
    }
};