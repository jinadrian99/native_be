var bill = require('./Bill.service');
var RRC = require('../RoomRentalContract/RRC.service');
var booking = require('../Booking/Booking.service');

module.exports = {
    getBillsByIDKHD: (req, res) => {
        const idKHD = req.params.idKHD;
        bill.getDataByIDKHD(idKHD, (err, bills) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json(bills);
        }) 
    },
    getBillByIdDDP: (req, res) => {
        const idDDP = req.params.id;
        bill.getDataByIdddp(idDDP, (err, bills) => {
            if(err) { return res.status(500).json(err); }
            console.log('bill by idDDP: ', bills)
            return res.status(200).json(bills);
        }) 
    },
    changeStatusToDepositByIdPTT: (req, res) => {
        const idPTT = req.params.idPTT;
        bill.changeStatus(idPTT, 2, (err, result) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json('change status to deposit');
        })
    },
    changeStatusToPaidByIdPTT: (req, res) => {
        const idPTT = req.params.idPTT;
        bill.getDataByID(idPTT, (err, objBill) => {
            if(err) { try { return res.status(500).json(err); } catch (error) {} }
            booking.getDataByID(objBill.idDDP, (err, objBooking) => {
                if(err) { try { return res.status(500).json(err); } catch (error) {} }
                if(objBooking != null){ 
                    var data = objBooking;
                    data.trangThaiDat = 2;
                    booking.updateData(objBill.idDDP, data, (err, results) => {
                        if(err) { try { return res.status(500).json(err); } catch (error) {} }
                        bill.changeStatus(idPTT, 3, (err, result) => {
                            if(err) { return res.status(500).json(err); }
                            return res.status(200).json('change status to deposit');
                        })
                    })
                }
            })
        })
    },
    index: (req, res) => {
        bill.getAll((err, result) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json(result);
        })
    },
    show: (req, res) => {
        const id = req.params.id;
        bill.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json(result);
        })
    },
    store: (req, res) => {
        var data = req.body;
        bill.createData(data, (err, results) => {
            if(err) { return res.status(500).json(err); }
            if(results == null) { return res.status(400).json("Create failed!"); }
            res.status(200).json(results);
        })
    },
    update: (req, res) => {
        const id = req.params.id;
        const data = req.body;
        bill.updateData(id, data, (err, result)=>{
            if(err) { return res.status(500).json(err); }
            return res.status(200).json('Update successfully');
        })
    },
    updateBill: (req, res) => {
        const id = req.params.id;
        const data = req.body;
        bill.getDataByID(id, (err, resGet) => {
            if(err) { return res.status(500).json(err); }
            if(resGet == null) { return res.status(400).json("Record not exists!")}
            bill.updateMoneyInBill(id, data, (err, result)=>{
                if(err) { return res.status(500).json(err); }
                return res.status(200).json('Update successfully');
            })
        })
    },
    destroy: (req, res) => {
        const id = req.params.id;
        bill.deleteData(id, (err, result)=>{
            if(err) { return res.status(500).json(err); }
            return res.status(200).json('Update successfully');
        })
    },
    cusCancel: (req, res) => {
        const idBill = req.params.id;
        bill.getDataByID(idBill, (err, objBill) => {
            if(err) { try { return res.status(500).json(err); } catch (error) {} }
            if(objBill == null) {try { return res.status(400).json('Bill is undefined'); } catch (error) {} }
            else {
                if(objBill.tinhTrang == 1) {
                    bill.changeStatus(objBill.idPTT, 4, (err, result) => {
                        if(err) { try { return res.status(500).json(err); } catch (error) {} }
                        try { return res.status(200).json("Bill has changed to cancel status"); } catch (error) {}
                    })
                } else if (objBill.tinhTrang == 2) {
                    const idBooking = objBill.idDDP;
                    bill.getRRCByIdDDPInBill(idBooking, (err, lstRRC) => {
                        if(err) { try { return res.status(500).json(err); } catch (error) {} }
                        if(lstRRC.length == 0) { 
                            bill.changeStatus(objBill.idPTT, 4, (err, result) => {
                                if(err) { try { return res.status(500).json(err); } catch (error) {} }
                                try { return res.status(200).json("Bill has changed to cancel status"); } catch (error) {}
                            })
                        } else { 
                            try { return res.status(200).json("Dear customer, you should go to hotel to cancel!"); } catch (error) {}
                        }
                    })
                } else { 
                    try { return res.status(200).json("Can't change to cancel status"); } catch (error) {}
                }
            }
        })
    },
    changeStatusToCancelByIdPTT: (req, res) => {
        const idBill = req.params.idPTT;
        bill.getDataByID(idBill, (err, objBill) => {
            if(err) { try { return res.status(500).json(err); } catch (error) {} }
            booking.getDataByID(objBill.idDDP, (err, objBooking) => {
                if(err) { try { return res.status(500).json(err); } catch (error) {} }
                if(objBooking != null){ 
                    var data = objBooking;
                    data.trangThaiDat = 1;
                    booking.updateData(objBill.idDDP, data, (err, results) => {
                        if(err) { try { return res.status(500).json(err); } catch (error) {} }
                        RRC.updateStatusByIDDDP(objBill.idDDP, 3, (err, result) => {
                            if(err) { try { return res.status(500).json(err); } catch (error) {} }
                            bill.changeStatus(objBill.idPTT, 4, (err, result) => {
                                if(err) { try { return res.status(500).json(err); } catch (error) {} }
                                try { return res.status(200).json({ flag: true, message: "Bill has changed to cancel status" }); } catch (error) {}
                            })
                        })
                    })
                }
            })
        })
    },
    adminCancel: (req, res) => {
        const idBill = req.params.id;
        bill.getDataByID(idBill, (err, objBill) => {
            if(err) { try { return res.status(500).json(err); } catch (error) {} }
            if(objBill == null) {try { return res.status(400).json('Bill is undefined'); } catch (error) {} }
            else {
                if(objBill.tinhTrang == 1) {
                    bill.changeStatus(objBill.idPTT, 4, (err, result) => {
                        if(err) { try { return res.status(500).json(err); } catch (error) {} }
                        try { return res.status(200).json({ flag: true, message: "Bill has changed to cancel status", cusMustPay: false }); } catch (error) {}
                    })
                } else if (objBill.tinhTrang == 2) {
                    const idBooking = objBill.idDDP;
                    bill.getRRCByIdDDPInBill(idBooking, (err, lstRRC) => {
                        if(err) { try { return res.status(500).json(err); } catch (error) {} }
                        if(lstRRC.length == 0) { 
                            bill.changeStatus(objBill.idPTT, 4, (err, result) => {
                                if(err) { try { return res.status(500).json(err); } catch (error) {} }
                                try { return res.status(200).json({ flag: false, message: "Bill has changed to cancel status, please check and refund 50% of deposit money for customer.", cusMustPay: false }); } catch (error) {}
                            })
                        } else { 
                            try { return res.status(200).json({ flag: true, message: "Customer need to pay bill before to cancel bill", cusMustPay: true }); } catch (error) {}
                        }
                    })
                } else { 
                    try { return res.status(200).json({ flag: true, message: "Can't change to cancel status but customer can leave!", cusMustPay: false }); } catch (error) {}
                }
            }
        })
    }
}