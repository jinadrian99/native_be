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
            if(err){
                return res.status(500).json(err);
            }
            if(results == null) {
                return res.status(404).json('Record not found');
            }
            if(results.length > 0)
                return res.status(400).json('Exists room type image!');
            else {
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
}