var room = require('./room.service');
var roomType = require('../RoomType/roomType.service');
const Validator = require('fastest-validator');
const bill = require('../Bill/Bill.service');
const BillD = require('../BillDetail/BillD.service');
const RCC = require('../RoomRentalContract/RRC.service');

const valid = new Validator();
const schema = {
    maPhong: {
        type: 'string', min: 3, max: 10
        // messages: {
        //     required: "Phải nhập giá!",
        //     number: "Giá phải là số!",
        //     numberMin: "Giá Phải lớn hơn bằng 600$!"
        // }
    }
}
const check = valid.compile(schema);

module.exports = {
    getDataByIdBookingWithBill: (req, res) => {
        var idDDP = req.params.id;
        room.getDataByIdBookingWithBill(idDDP, (err, results) => {
            if (err) { return res.status(500).json(err); }
            return res.status(200).json(results);
        })
    },
    getDataByIdBillWithBill: (req, res) => {
        var idPTT = req.params.id;
        room.getDataByIdBillWithBill(idPTT, (err, results) => {
            if (err) { return res.status(500).json(err); }
            return res.status(200).json(results);
        })
    },
    index: (req, res) => {
        room.getAll((err, result) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json(result);
        })
    },
    show: (req, res) => {
        var id = req.params.id;
        room.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result == null) { return res.status(400).json('Record not exists!'); }
            return res.status(200).json(result);
        })
    },
    store: (req, res) => {
        const data = req.body;

        var constraint = check(data);
        if(constraint !== true) return res.status(400).json(constraint);

        if(data.maPhong.indexOf(" ") >= 0 || data.maPhong.indexOf("?") >= 0){ return res.status(400).json(`id room can't " " or "?"`)}

        room.getDataByID(data.maPhong, (err, result) => {
            if(err) { return res.status(500).json(err);}
            if(result != null) { return res.status(400).json('This id room is Exists!')}
            room.createData(data, (err, result) => {
                if(err) { return res.status(500).json(err); }
                roomType.updateSoLuong(data.idLP, true, (err, result) => {
                    if(err) { return res.status(500).json(err);}
                    roomType.updateSLHienTai(data.idLP, true, (err, result) => {
                        if(err) { return res.status(500).json(err);}
                        return res.status(200).json("Created successfully");
                    })
                })
            });
        });
    },
    update: (req, res) => {
        const id = req.params.id;
        const data = req.body;

        var constraint = check(data);
        if(constraint !== true) return res.status(400).json(constraint);
        
        room.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result == null) { return res.status(400).json(`This room doesn't exists to update!`); }
            if(result.trangThai == 1){
                if(data.trangThai != result.trangThai) {
                    roomType.updateSLHienTai(data.idLP, true, (err, result) => {
                        if(err) { return res.status(500).json(err);}
                        room.updateData(id, data, (err, result) => {
                            if(err) { return res.status(500).json(err); }
                            return res.status(200).json("Updated successfully");
                        }) 
                    })
                } else { 
                    room.updateData(id, data, (err, result) => {
                        if(err) { return res.status(500).json(err); }
                        return res.status(200).json("Updated successfully");
                    }) 
                }
            } else { 
                if(data.trangThai != result.trangThai) {
                    roomType.updateSLHienTai(data.idLP, false, (err, result) => {
                        if(err) { return res.status(500).json(err);}
                        room.updateData(id, data, (err, result) => {
                            if(err) { return res.status(500).json(err); }
                            return res.status(200).json("Updated successfully");
                        }) 
                    })
                } else { 
                    room.updateData(id, data, (err, result) => {
                        if(err) { return res.status(500).json(err); }
                        return res.status(200).json("Updated successfully");
                    }) 
                }
            }
        })
    },
    destroy: (req, res) => {
        const id = req.params.id;
        room.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result == null) { return res.status(400).json('Record not exists to delete!'); }
            roomType.updateSoLuong(result.idLP, false, (err, result) => {
                if(err) { return res.status(500).json(err);}
                roomType.updateSLHienTai(data.idLP, false, (err, result) => {
                    if(err) { return res.status(500).json(err);}
                    room.deleteData(id, (err, result) => {
                        if(err) { return res.status(500).json(err); }
                        return res.status(200).json("Delete successfully");
                    })
                })
                
            })            
        })
    },
    getRoomsByDatesIdlp: (req, res) => {
        const dateA = req.body.dateA;
        const dateB = req.body.dateB;
        const idRT_need = req.body.idLP;

        var arrRoom = [];
        room.getDataByIDLPNotBusy(idRT_need, (err, lstRoom) => {
            // console.log(lstRoom);
            if(err) { try { return res.status(500).json(err); } catch (error) {} }
            if(lstRoom.length <= 0) { try { return res.status(404).json('Chưa có phòng'); } catch (error) {} }
            lstRoom.forEach(room => {
                arrRoom.push(room);
            });
        })

        bill.findIDbyDays(dateA, dateB, 2, (err, lstPTT) => {
            // console.log(lstPTT);
            if(err) { try { return res.status(500).json(err); } catch (error) {} }
            if(lstPTT.length <= 0) { 
                RCC.findIDRoombyDays(dateA, dateB, 1, (err, lstPTP) => {
                    if(err) { return res.status(500).json(err); }
                    if(lstPTP.length <= 0) { 
                        try { return res.status(200).json(arrRoom); } catch (error) {}
                    }
                    var count2 = lstPTP.length;
                    lstPTP.forEach(item => {
                        room.getDataByID(item.maPhong, (err, PHONG) => {
                            count2--;
                            if(err) { try { return res.status(500).json(err); } catch (error) {} }
                            if(PHONG != null) { 
                                console.log(PHONG);
                                if(PHONG.idLP == idRT_need){
                                    arrRoom = arrRoom.filter(item => item.maPhong != PHONG.maPhong);
                                }
                            }
                            if(count2 == 0) { 
                                try { return res.status(200).json(arrRoom); } catch (error) {}
                            }
                        })
                    })
                })
            }
            lstPTT.forEach(item => {
                BillD.getDataByIDPTT(item.idPTT,(err, lstCTPTT) => {
                    if(err) { try { return res.status(500).json(err); } catch (error) {} }
                    if(lstCTPTT.length > 0) {
                        var count1 = lstCTPTT.length;
                        lstCTPTT.forEach(item => {
                            room.getDataByID(item.maPhong, (err, PHONG) => {
                                count1 --;
                                if(err) { try { return res.status(500).json(err); } catch (error) {} }
                                if(PHONG != null){ 
                                    if(PHONG.idLP == idRT_need){
                                        // console.log(PHONG);
                                        // console.log(arrRoom);
                                        arrRoom = arrRoom.filter(item => item.maPhong != PHONG.maPhong);
                                    }
                                }
                                if(count1 == 0){ 
                                    RCC.findIDRoombyDays(dateA, dateB, 1, (err, lstPTP) => {
                                        if(err) { return res.status(500).json(err); }
                                        if(lstPTP.length <= 0) { 
                                            try { return res.status(200).json(arrRoom); } catch (error) {}
                                        }
                                        var count2 = lstPTP.length;
                                        lstPTP.forEach(item => {
                                            room.getDataByID(item.maPhong, (err, PHONG) => {
                                                count2--;
                                                if(err) { try { return res.status(500).json(err); } catch (error) {} }
                                                if(PHONG != null) { 
                                                    // console.log(PHONG);
                                                    if(PHONG.idLP == idRT_need){
                                                        arrRoom = arrRoom.filter(item => item.maPhong != PHONG.maPhong);
                                                    }
                                                }
                                                if(count2 == 0) { 
                                                    try { return res.status(200).json(arrRoom); } catch (error) {}
                                                }
                                            })
                                        })
                                    })
                                }
                            })
                        })
                    }
                });
            });
        });
    },
    getRoomsByDatesIdlpNumber: (req, res) => {
        const dateA = req.body.dateA;
        const dateB = req.body.dateB;
        const idRT_need = req.body.idLP;
        const number = req.body.soLuong;

        var arrRoom = [];
        room.getDataByIDLPNotBusy(idRT_need, (err, lstRoom) => {
            // console.log(lstRoom);
            if(err) { try { return res.status(500).json(err); } catch (error) {} }
            if(lstRoom.length <= 0) { try { return res.status(404).json('Chưa có phòng'); } catch (error) {} }
            lstRoom.forEach(room => {
                arrRoom.push(room.maPhong);
            });
        })

        bill.findIDbyDays(dateA, dateB, 2, (err, lstPTT) => {
            // console.log(lstPTT);
            if(err) { try { return res.status(500).json(err); } catch (error) {} }
            if(lstPTT.length <= 0) { 
                RCC.findIDRoombyDays(dateA, dateB, 1, (err, lstPTP) => {
                    if(err) { return res.status(500).json(err); }
                    if(lstPTP.length <= 0) { 
                        if(arrRoom.length >= number ){
                            arrRoom = arrRoom.filter(item => arrRoom.indexOf(item) < number);
                            try { return res.status(200).json(arrRoom); } catch (error) {}
                        } else { try { return res.status(500).json("The number of rooms is not enough!"); } catch (error) {} }
                    }
                    var count2 = lstPTP.length;
                    lstPTP.forEach(item => {
                        room.getDataByID(item.maPhong, (err, PHONG) => {
                            count2--;
                            if(err) { try { return res.status(500).json(err); } catch (error) {} }
                            if(PHONG != null) { 
                                console.log(PHONG);
                                if(PHONG.idLP == idRT_need){
                                    arrRoom = arrRoom.filter(item => item != PHONG.maPhong);
                                }
                            }
                            if(count2 == 0) { 
                                if(arrRoom.length >= number ){
                                    arrRoom = arrRoom.filter(item => arrRoom.indexOf(item) < number);
                                    try { return res.status(200).json(arrRoom); } catch (error) {}
                                } else { try { return res.status(500).json("The number of rooms is not enough!"); } catch (error) {} }
                            }
                        })
                    })
                })
            }
            lstPTT.forEach(item => {
                BillD.getDataByIDPTT(item.idPTT,(err, lstCTPTT) => {
                    if(err) { try { return res.status(500).json(err); } catch (error) {} }
                    if(lstCTPTT.length > 0) {
                        var count1 = lstCTPTT.length;
                        lstCTPTT.forEach(item => {
                            room.getDataByID(item.maPhong, (err, PHONG) => {
                                count1 --;
                                if(err) { try { return res.status(500).json(err); } catch (error) {} }
                                if(PHONG != null){ 
                                    if(PHONG.idLP == idRT_need){
                                        // console.log(PHONG);
                                        // console.log(arrRoom);
                                        arrRoom = arrRoom.filter(item => item != PHONG.maPhong);
                                    }
                                }
                                if(count1 == 0){ 
                                    RCC.findIDRoombyDays(dateA, dateB, 1, (err, lstPTP) => {
                                        if(err) { return res.status(500).json(err); }
                                        if(lstPTP.length <= 0) { 
                                            if(arrRoom.length >= number ){
                                                arrRoom = arrRoom.filter(item => arrRoom.indexOf(item) < number);
                                                try { return res.status(200).json(arrRoom); } catch (error) {}
                                            } else { try { return res.status(500).json("The number of rooms is not enough!"); } catch (error) {} }
                                        }
                                        var count2 = lstPTP.length;
                                        lstPTP.forEach(item => {
                                            room.getDataByID(item.maPhong, (err, PHONG) => {
                                                count2--;
                                                if(err) { try { return res.status(500).json(err); } catch (error) {} }
                                                if(PHONG != null) { 
                                                    // console.log(PHONG);
                                                    if(PHONG.idLP == idRT_need){
                                                        arrRoom = arrRoom.filter(item => item != PHONG.maPhong);
                                                    }
                                                }
                                                if(count2 == 0) { 
                                                    if(arrRoom.length >= number ){
                                                        arrRoom = arrRoom.filter(item => arrRoom.indexOf(item) < number);
                                                        try { return res.status(200).json(arrRoom); } catch (error) {}
                                                    } else { try { return res.status(500).json("The number of rooms is not enough!"); } catch (error) {} }
                                                }
                                            })
                                        })
                                    })
                                }
                            })
                        })
                    }
                });
            });
        });
    },
};