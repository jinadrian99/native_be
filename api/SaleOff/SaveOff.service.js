const pool = require("../../config/database");

module.exports = {
    getAll: (cb) => {
        pool.query(
            `SELECT * FROM KHUYENMAI ORDER BY dinhMucGia`,
            [],
            (error, results) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, results);
            }
        )
    }
};