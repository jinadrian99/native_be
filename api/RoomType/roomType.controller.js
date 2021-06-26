const { 
    createData,
    getAll, 
    getDataByID,
    updateData,
    deleteData
} = require('./roomType.service');

var roomTypeImage = require('../ImageRoomType/imageRoomType.service');
var dailyRate = require('../DailyRate/dailyRate.service');
var specialRate = require('../SpecialRate/specialRate.service');
var room = require('../Room/room.service');
var bill = require('../Bill/bill.service');
var DBill = require('../BillDetail/BillD.service');
var RRC = require('../RoomRentalContract/RRC.service');

module.exports = {
    createRoomType: (req, res) => {
        const data = req.body;
        createData(data, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.status(200).json(results);
        });
    },
    getRoomTypes: (req, res) => {
        getAll((err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.status(200).json(results);
        });
    },
    getRoomTypeByID: (req, res) => {
        const id = req.params.id;
        getDataByID(id, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            if(results == null) {
                return res.status(404).json('Record not found');
            }
            return res.status(200).json(results);
        });
    },
    updateRoomType: (req, res) => {
        const id = req.params.id;
        const data = req.body;
        updateData(id, data, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }
            if(results == null) {
                return res.status(404).json('Record not found');
            }
            return res.status(200).json('Updated successfully');
        });
    },
    deleteRoomType: (req, res) => {
        const id = req.params.id;
        roomTypeImage.getDataByIDLP(id, (err, results)=>{
            if(err){ return res.status(500).json(err); }
            if(results.length > 0) return res.status(400).json('Exists room type image!');
            else {
                room.getDataByIDLP(id, (err, results) => {
                    if(err){ return res.status(500).json(err); }
                    if(results.length > 0) return res.status(400).json('Exists room type of rooms');
                    deleteData(id, (err, results) => {
                        if(err) {
                            console.log(err);
                            return res.status(500).json(err);
                        }
                        if(results == 0) {
                            return res.status(404).json('Record not found');
                        }
                        return res.status(200).json('Deleted successfully');
                    });
                })
            }
        });
    },
    getRateByIDLP : (req, res) => {
        const idLP = req.params.idLP;

        dailyRate.getDataByIDLP(idLP, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result.length <= 0) { return res.status(200).json(null); } // chưa có bảng giá  
            if (result.length > 0) {
                // lấy ngày gần nhất trong quá khứ kể cả ngày hiện tại, không lấy ngày tương lai
                var today = new Date();
                var arrRate = result;
                var recordRate = null;
                var diffDayMin = null;

                arrRate.forEach(item => {
                    var day = new Date(item.ngayBatDau);
                    var diffDay = (today.getTime() - day.getTime())/(1000*60*60*24);

                    if(diffDay >= 0 && diffDayMin == null){
                        recordRate = item;
                        diffDayMin = diffDay;
                    }
                    if(diffDay >= 0 && diffDayMin >= diffDay){
                        console.log(item);
                        recordRate = item;
                        diffDayMin = diffDay;
                    }
                });

                //có đc recordRate ta sẽ len lõi vào tận trong Special Rate để xem có ngày nào là hn ko?
                var thu = today.getDay();
                var idGTN = recordRate.idGTN;

                specialRate.getDataByThuNIDGTN(thu, idGTN, (err, result) => {
                    if(err) { return res.status(500).json(err); }
                    if(result.length > 0) { 
                        return res.status(200).json(result[0].giaTheoThu);
                    }
                    return res.status(200).json(recordRate.giaMoiTuan);
                })
            }
        })
    },
    getRoomsByIDLP: (req, res) => {
        const idLP = req.params.idLP;
        room.getDataByIDLP(idLP, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result.length <= 0) { return res.status(200).json(null) }
            return res.status(200).json(result);
        })
    },
    searchRoomTypeByDays: (req, res) => {
        const dateA = req.body.dateA;
        const dateB = req.body.dateB;

        var arrLP = [];
        getAll((err, lstLP) => {
            if(err) { return res.status(500).json(err) }
            if(lstLP.length <= 0){ return res.status(200).json("Chưa có LP"); }
            lstLP.forEach(item => {
                var obj = {
                    idLP: item.idLP, 
                    tenLP: item.tenLP,
                    hangPhong: item.hangPhong,
                    soLuong: item.soLuong
                };
                arrLP.push(obj); // lấy dsLP ra để trừ
            });
            // console.log(arrLP);

            //SELECT `idPTT` FROM `PHIEUTHANHTOANPHONG` WHERE ngayDen <= "2021-06-19" and ngayDi >= "2021-06-15"
            bill.findIDbyDays(dateA, dateB, 2, (err, lstPTT) => {
                if(err) { return res.status(500).json(err) }
                //Kiểm tra xem đây có phải là nhánh KH đang ở hay ko?
                if(lstPTT.length <= 0) { //Phiếu thanh toán phòng ko phải ở trạng thái (2)thanh toán tiền cọc
                    RRC.findIDRoombyDays(dateA, dateB, 1, (err, lstPTP) => { //Nếu ko có trạng thái thanh toán tiền cọc thì chạy dòng này
                        if(err) { return res.status(500).json(err) }
                        if(lstPTP.length <= 0) { return res.status(200).json(arrLP) }
                        if(lstPTP.length > 0) { 
                            var count2 = lstPTP.length;
                            lstPTP.forEach(item => {
                                room.getDataByID(item.maPhong, (err, PHONG) => {
                                    count2 --; //bộ đếm dùng để xét khi nào ngừng dòng for (vì asynchronous)
                                    if(err) { return res.status(500).json(err) }
                                    if(PHONG != null){ 
                                        // console.log("PHONG_idLP", PHONG.idLP);
                                        var index = arrLP.findIndex(item => item.idLP == PHONG.idLP); // tìm index trong arrLP để trừ 
                                        arrLP[index]={
                                            idLP: arrLP[index].idLP,
                                            tenLP: arrLP[index].tenLP,
                                            hangPhong: arrLP[index].hangPhong,
                                            soLuong: arrLP[index].soLuong - 1
                                        }
                                    }
                                    if(count2 == 0){ 
                                        return res.status(200).json(arrLP);
                                    }
                                })
                            })
                        }
                    })
                }
                //Nhánh KH thanh toán tiền cọc
                lstPTT.forEach(item => { //Nếu có trạng thái (2)thanh toán tiền cọc thì chạy dòng này
                    // console.log("PTT: ", item.idPTT);
                    DBill.getDataByIDPTT(item.idPTT, (err, lstCTPTT) => {
                        if(err) { return res.status(500).json(err) }
                        if(lstCTPTT.length > 0) { 
                            var count1 = lstCTPTT.length;
                            lstCTPTT.forEach(item => {
                                // console.log("CTPTT_maPhong: ", item.maPhong);
                                room.getDataByID(item.maPhong, (err, PHONG) => {
                                    count1 --;
                                    if(err) { return res.status(500).json(err) }
                                    if(PHONG != null){ 
                                        // console.log("PHONG_idLP", PHONG.idLP);
                                        var index = arrLP.findIndex(item => item.idLP == PHONG.idLP);
                                        arrLP[index]={
                                            idLP: arrLP[index].idLP,
                                            tenLP: arrLP[index].tenLP,
                                            hangPhong: arrLP[index].hangPhong,
                                            soLuong: arrLP[index].soLuong - 1
                                        }
                                    }
                                    // console.log(arrLP, count);
                                    if(count1 == 0){ 
                                        RRC.findIDRoombyDays(dateA, dateB, 1, (err, lstPTP) => {
                                            if(err) { return res.status(500).json(err) }
                                            if(lstPTP.length > 0) { 
                                                var count2 = lstPTP.length;
                                                lstPTP.forEach(item => {
                                                    room.getDataByID(item.maPhong, (err, PHONG) => {
                                                        count2 --;
                                                        if(err) { return res.status(500).json(err) }
                                                        if(PHONG != null){ 
                                                            // console.log("PHONG_idLP", PHONG.idLP);
                                                            var index = arrLP.findIndex(item => item.idLP == PHONG.idLP);
                                                            arrLP[index]={
                                                                idLP: arrLP[index].idLP,
                                                                tenLP: arrLP[index].tenLP,
                                                                hangPhong: arrLP[index].hangPhong,
                                                                soLuong: arrLP[index].soLuong - 1
                                                            }
                                                        }
                                                        if(count2 == 0){ 
                                                            return res.status(200).json(arrLP);
                                                        }
                                                    })
                                                })
                                            }
                                        })
                                    }
                                })
                            });
                        }
                    });
                }); 
                
            });  
        })
        
    },
};