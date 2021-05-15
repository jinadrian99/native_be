const pool = require('../../config/database');

module.exports = {
    createData: (data, callBack) => {
        pool.query(
            `insert into SLIDEQUANGCAO(hinhAnh) VALUES(?)`,
            [
                data.hinhAnh
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
            `select idSlide, hinhAnh from SLIDEQUANGCAO`,
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
            `select idSlide, hinhAnh from SLIDEQUANGCAO where idSlide = ?`,
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
            `update SLIDEQUANGCAO set hinhAnh=? where idSlide = ?`,
            [
                data.hinhAnh, 
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
            `delete from SLIDEQUANGCAO where idSlide = ?`,
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