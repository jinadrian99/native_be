const pool = require('../../config/database');

module.exports = {
    createData: (data, callBack) => {
        pool.query(
            `insert into HINHANHLOAIPHONG VALUES(?,?,?)`,
            [
                null,
                data.hinhAnh,
                data.idLP
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
            `select * from HINHANHLOAIPHONG`,
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
            `select * from HINHANHLOAIPHONG where idHinhLP = ?`,
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
            `update HINHANHLOAIPHONG set 
                hinhAnh = ?,
                idLP = ?
            where idHinhLP = ?`,
            [
                data.hinhAnh,
                data.idLP,
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
            `delete from HINHANHLOAIPHONG where idHinhLP = ?`,
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

    getDataByIDLP: (idLP, callBack) => {
        pool.query(
            `select * from HINHANHLOAIPHONG where idLP = ?`,
            [idLP],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                } 
                return callBack(null, results);
            }
        )
    }
};