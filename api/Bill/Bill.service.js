const pool = require("../../config/database");

module.exports = {
    createData: (data, cb) => {
        pool.query(
            `insert into PHIEUTHANHTOANPHONG VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                null,
                data.ngayThanhToan,
                data.tinhTrang,
                data.tongTienPhong,
                data.tienCoc,
                data.phiPhatSinh,
                data.phanTramGiam,
                data.tongTienConLai,
                data.idKM,
                data.idKHD,
                data.idDDP,
                data.ngayDen,
                data.ngayDi,
                data.soDem
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
            `select * from PHIEUTHANHTOANPHONG ORDER BY idPTT DESC`,
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
            `select * from PHIEUTHANHTOANPHONG where idPTT = ?`,
            [id],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result[0]);
            }
        )
    },
    getDataByIDKHD: (idKHD, cb) => {
        pool.query(
            `select * from PHIEUTHANHTOANPHONG where idKHD = ? ORDER BY idPTT DESC`,
            [idKHD],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result);
            }
        )
    },
    getRRCByIdDDPInBill: (idDDP, cb) => {
        //PTT - DDP - PTP
        //lấy rrc, ddp, ptt từ idDDP
        //ptt làm gốc
        pool.query(
            `
                SELECT PHIEUTHANHTOANPHONG.idPTT, PHIEUTHUEPHONG.idPTP, DONDATPHONG.idDDP
                FROM PHIEUTHANHTOANPHONG LEFT JOIN DONDATPHONG ON PHIEUTHANHTOANPHONG.idDDP = DONDATPHONG.idDDP 
                LEFT JOIN PHIEUTHUEPHONG ON DONDATPHONG.idDDP = PHIEUTHUEPHONG.idDDP 
                WHERE PHIEUTHUEPHONG.idDDP = ?
            `,
            [
                idDDP
            ],
            (error, results) => {
                if (error) { return cb(error); }
                return cb(null, results);
            }
        )
    },
    changeStatus: (idPTT, status, cb) => {
        pool.query(
            `update PHIEUTHANHTOANPHONG set tinhTrang = ? where idPTT = ?`,
            [
                status,
                idPTT
            ],
            (error, result) => {
                if(error) {
                    return cb(error);
                }
                return cb(null, result.insertId);
            }
        )
    },
    findIDbyDays: (dateA, dateB, tinhTrang, cb) => {
        pool.query(
            `SELECT idPTT FROM PHIEUTHANHTOANPHONG WHERE ngayDi >= ? and ngayDen <= ? and tinhTrang = ?`,
            [
                dateA,
                dateB,
                tinhTrang
            ],
            (error, results) => {
                if(error)   { return cb(error); }
                return cb(null, results);
            }
        )
    },
    getDataByIdddp: (idDDP, cb) => {
        pool.query(
            `SELECT * FROM PHIEUTHANHTOANPHONG WHERE idDDP = ?`,
            [
                idDDP
            ],
            (error, result) => {
                if(error) { return cb(error); }
                return cb(null, result[0]);
            }
        )
    },
    getDataByIdddpWithStatusUndeposit: (idDDP, cb) => {
        pool.query(
            `SELECT * FROM PHIEUTHANHTOANPHONG WHERE idDDP = ? AND tinhTrang = 1`,
            [
                idDDP
            ],
            (error, result) => {
                if(error) { return cb(error); }
                return cb(null, result[0]);
            }
        )
    },
    updateData: (id, data, cb) => {
        pool.query(
            `update PHIEUTHANHTOANPHONG set
                ngayThanhToan = ?,
                tinhTrang = ?,
                tongTienPhong = ?,
                tienCoc = ?,
                phiPhatSinh = ?,
                phanTramGiam = ?,
                tongTienConLai = ?,
                idKM = ?,
                idKHD = ?,
                idDDP = ?,
                ngayDen = ?,
                ngayDi = ?,
                soDem = ?
            where idPTT = ?`,
            [
                data.ngayThanhToan,
                data.tinhTrang,
                data.tongTienPhong,
                data.tienCoc,
                data.phiPhatSinh,
                data.phanTramGiam,
                data.tongTienConLai,
                data.idKM,
                data.idKHD,
                data.idDDP,
                data.ngayDen,
                data.ngayDi,
                data.soDem,
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
    updateMoneyInBill: (id, data, cb) => {
        pool.query(
            `update PHIEUTHANHTOANPHONG set
                tongTienPhong = ?,
                tienCoc = ?,
                phiPhatSinh = ?,
                phanTramGiam = ?,
                tongTienConLai = ?,
                idKM = ?
            where idPTT = ?`,
            [
                data.tongTienPhong,
                data.tienCoc,
                data.phiPhatSinh,
                data.phanTramGiam,
                data.tongTienConLai,
                data.idKM,
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
            `delete from PHIEUTHANHTOANPHONG where idPTT = ?`,
            [id],
            (error, result) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, result); 
            }
        )
    },
    getTotalMoneyBillByMonth: (month, year, cb) => {
        pool.query(
            `SELECT SUM(tongTienConLai + tienCoc) AS tienPhaiTra FROM PHIEUTHANHTOANPHONG WHERE MONTH(ngayThanhToan) = ? and YEAR(ngayThanhToan) = ?`,
            [
                month,
                year
            ],
            (error, result)=>{
                if(error) {
                    return cb(error);
                }
                return cb(null, result[0]);
            }
        )
    }, 

    //For: Scheduler
    schedulerChangeStatusForUnPaidByDateArriveAndStatus: (statusNewBill, statusNewBooking, statusOldBill, date, callBack) => {
        // PTT - DDP: 
        // đổi trạng thái sang hủy cho PTT và DDP khi ptt đc tạo mà ko trả tiền
        // khi ngày đến đã vào quá khứ n ngày (ngày đến <= ngày xét),
        // lấy ptt làm gốc

        // SELECT PHIEUTHANHTOANPHONG.idPTT, DONDATPHONG.idDDP
        // FROM PHIEUTHANHTOANPHONG LEFT JOIN DONDATPHONG ON DONDATPHONG.idDDP = PHIEUTHANHTOANPHONG.idDDP 
        // WHERE PHIEUTHANHTOANPHONG.tinhTrang = 1  AND PHIEUTHANHTOANPHONG.ngayDen <= "2021-7-11"
        pool.query(
            `
                UPDATE PHIEUTHANHTOANPHONG LEFT JOIN DONDATPHONG ON DONDATPHONG.idDDP = PHIEUTHANHTOANPHONG.idDDP 
                SET PHIEUTHANHTOANPHONG.tinhTrang = ?, DONDATPHONG.trangThaiDat = ?
                WHERE PHIEUTHANHTOANPHONG.tinhTrang = ?  AND PHIEUTHANHTOANPHONG.ngayDen <= ?
            `,
            [
                statusNewBill,
                statusNewBooking,
                statusOldBill,
                date
            ],
            (error, result) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, result.affectedRows); 
            }
        )
    },
    //For: Scheduler
    schedulerChangeStatusForDepositNonRRCByDateArriveAndStatus: (statusNewBill, statusNewBooking, statusOldBill, date, callBack) => {
        // PTT - DDP - PTP: 
        // đổi trạng thái sang hủy cho PTT và DDP khi có ptt đã trả tiền cọc mà ko vào Hotel ở (tạo PTP)
        // khi ngày đến đã vào quá khứ n ngày (ngày đến <= ngày xét),
        // lấy ptt làm gốc

        // SELECT PHIEUTHANHTOANPHONG.idPTT, DONDATPHONG.idDDP
        // FROM PHIEUTHANHTOANPHONG LEFT JOIN DONDATPHONG ON DONDATPHONG.idDDP = PHIEUTHANHTOANPHONG.idDDP 
        // LEFT JOIN PHIEUTHUEPHONG ON DONDATPHONG.idDDP = PHIEUTHUEPHONG.idDDP
        // WHERE PHIEUTHANHTOANPHONG.tinhTrang = 2 AND PHIEUTHUEPHONG.idDDP IS NULL AND PHIEUTHANHTOANPHONG.ngayDen <= "2021-7-11"
        pool.query(
            `
                UPDATE PHIEUTHANHTOANPHONG LEFT JOIN DONDATPHONG ON DONDATPHONG.idDDP = PHIEUTHANHTOANPHONG.idDDP 
                LEFT JOIN PHIEUTHUEPHONG ON DONDATPHONG.idDDP = PHIEUTHUEPHONG.idDDP
                SET PHIEUTHANHTOANPHONG.tinhTrang = ?, DONDATPHONG.trangThaiDat = ?
                WHERE PHIEUTHANHTOANPHONG.tinhTrang = ? AND PHIEUTHUEPHONG.idDDP IS NULL AND PHIEUTHANHTOANPHONG.ngayDen <= ?
            `,
            [
                statusNewBill,
                statusNewBooking,
                statusOldBill,
                date
            ],
            (error, result) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, result.affectedRows); 
            }
        )
    },
};
