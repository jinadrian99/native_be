const pool = require('../../config/database');

module.exports = {
    createData: (data, callBack) => {
        pool.query(
            `insert into LOAIPHONG VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
            [
                null,
                data.tenLP,
                data.moTaCT,
                data.moTaGT,
                data.moTaTD,
                data.hangPhong,
                data.soNguoi,
                data.giuong,
                data.phongTam,
                data.soLuong,
                data.slHienTai
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
            `select * from LOAIPHONG`,
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
            `select * from LOAIPHONG where idLP = ?`,
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
            `update LOAIPHONG set 
                tenLP = ?,
                moTaCT = ?,
                moTaGT = ?,
                moTaTD = ?,
                hangPhong = ?,
                soNguoi = ?,
                giuong = ?,
                phongTam = ?,
                soLuong = ?,
                slHienTai = ? 
            where idLP = ?`,
            [
                data.tenLP,
                data.moTaCT,
                data.moTaGT,
                data.moTaTD,
                data.hangPhong,
                data.soNguoi,
                data.giuong,
                data.phongTam,
                data.soLuong,
                data.slHienTai,
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
            `delete from LOAIPHONG where idLP = ?`,
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