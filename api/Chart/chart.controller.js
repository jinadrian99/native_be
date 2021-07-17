const booking = require('../Booking/booking.service');
const bookingService = require('../BookingService/bookingService.service');
const bill = require('../Bill/bill.service');
const roomType = require('../RoomType/roomType.service');

const BookingMBquantity = (quarter, year, cb) => {
    booking.getTotalMoneyBookingByQuarterly(quarter, year, (err, money) => {
        if(err) { return res.status(500).json(err) }
        return cb(money.tongThanhTien == null ? 0 : money.tongThanhTien);        
    })
}
const BookingServiceMBquantity = (quarter, year, cb) => {
    bookingService.getTotalMoneyBookingServiceByQuarterly(quarter, year, (err, money) => {
        if(err) { return res.status(500).json(err) }
        return cb(money.tongThanhTien == null ? 0 : money.tongThanhTien);        
    })
}
const BillMBmonth = (month, year, cb) => {
    bill.getTotalMoneyBillByMonth(month, year, (err, money) => {
        if(err) { return res.status(500).json(err) }
        return cb(money.tienPhaiTra == null ? 0 : money.tienPhaiTra);        
    })
}

module.exports = {
    getBookingMoneyByQuarterlies: (req, res) => {
        var today = new Date();
        var year = today.getFullYear();
        var arrMoneyByQuarter = [];
        
        BookingMBquantity(1, year, (money) => {
            arrMoneyByQuarter.push(money)
            BookingMBquantity(2, year, (money) => {
                arrMoneyByQuarter.push(money)
                BookingMBquantity(3, year, (money) => {
                    arrMoneyByQuarter.push(money)
                    BookingMBquantity(4, year, (money) => {
                        arrMoneyByQuarter.push(money)
                        return res.status(200).json(arrMoneyByQuarter);
                    })
                })
            })
        })
    },
    getBookingServiceMoneyByQuarterlies: (req, res) => {
        var today = new Date();
        var year = today.getFullYear();
        var arrMoneyByQuarter = [];

        BookingServiceMBquantity(1, year, (money) => {
            arrMoneyByQuarter.push(money)
            BookingServiceMBquantity(2, year, (money) => {
                arrMoneyByQuarter.push(money)
                BookingServiceMBquantity(3, year, (money) => {
                    arrMoneyByQuarter.push(money)
                    BookingServiceMBquantity(4, year, (money) => {
                        arrMoneyByQuarter.push(money)
                        return res.status(200).json(arrMoneyByQuarter);
                    })
                })
            })
        })
    },
    getBillMoneyByMonths: (req, res) => {
        var today = new Date();
        var year = today.getFullYear();
        var i = 1;
        var arrMoneyByMonth = [];

        BillMBmonth(i++, year, (money) => {
            arrMoneyByMonth.push(money);
            BillMBmonth(i++, year, (money) => {
                arrMoneyByMonth.push(money);
                BillMBmonth(i++, year, (money) => {
                    arrMoneyByMonth.push(money);
                    BillMBmonth(i++, year, (money) => {
                        arrMoneyByMonth.push(money);
                        BillMBmonth(i++, year, (money) => {
                            arrMoneyByMonth.push(money);
                            BillMBmonth(i++, year, (money) => {
                                arrMoneyByMonth.push(money);
                                BillMBmonth(i++, year, (money) => {
                                    arrMoneyByMonth.push(money);
                                    BillMBmonth(i++, year, (money) => {
                                        arrMoneyByMonth.push(money);
                                        BillMBmonth(i++, year, (money) => {
                                            arrMoneyByMonth.push(money);
                                            BillMBmonth(i++, year, (money) => {
                                                arrMoneyByMonth.push(money);
                                                BillMBmonth(i++, year, (money) => {
                                                    arrMoneyByMonth.push(money);
                                                    BillMBmonth(i++, year, (money) => {
                                                        arrMoneyByMonth.push(money);
                                                        return res.status(200).json(arrMoneyByMonth);
                                                    })  
                                                })  
                                            })  
                                        }) 
                                    })  
                                })  
                            })  
                        })  
                    })  
                })  
            }) 
        })  
    },
    getListNumberOfRoomTypesToBeBooked: (req, res) => {
        var month = req.body.month;
        var year = req.body.year;
        var rooms = [];
        var numberRoomTypes = [];

        roomType.getDataNumberOfRoomTypesToBeBooked(month, year, (err, results) => {
            // console.log("RT: ", result);
            if (err) { try { return res.status(500).json(err); } catch (error) {} }
            if(results.length > 0){
                results.map((item) => {
                    rooms.push(item.tenLP);
                    numberRoomTypes.push(item.soLuong);
                })    
            }
            // console.log("room: ", room);
            // console.log("numberRoomTypes: ", numberRoomTypes);
            res.status(200).json({rooms, numberRoomTypes});
        })
    }
}