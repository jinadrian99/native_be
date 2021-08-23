const booking = require('../Booking/booking.service');
const bookingService = require('../BookingService/bookingService.service');
const bill = require('../Bill/Bill.service');
const roomType = require('../RoomType/roomType.service');
const customerStay = require('../CustomerStay/CustomerStay.service');
const admin = require('../Admin/admin.service');
const user = require('../User/user.service');

const BookingMBquantity = (quarter, year, cb) => {
    booking.getTotalMoneyBookingByQuarterly(quarter, year, (err, money) => {
        if(err) { return console.log(err) }
        return cb(money.tongThanhTien == null ? 0 : money.tongThanhTien);        
    })
}
const BookingServiceMBquantity = (quarter, year, cb) => {
    bookingService.getTotalMoneyBookingServiceByQuarterly(quarter, year, (err, money) => {
        if(err) { return console.log(err) }
        return cb(money.tongThanhTien == null ? 0 : money.tongThanhTien);        
    })
}
const BillMBmonth = (month, year, cb) => {
    bill.getTotalMoneyBillByMonth(month, year, (err, money) => {
        if(err) { return console.log(err) }
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
    },
    getCusStayIn7N1Nationals: (req, res) => {
        var nationals = [];
        var numberCusStay = [];
        customerStay.getDataNumbersCusBy7Nationals((err, results) => {
            if(err) { try { return res.status(500).json(err); } catch (error) {} }
            if(results.length > 0) {
                results.map(item => {
                    nationals.push(item.national);
                    numberCusStay.push(item.numberCusStay);
                })
            }
            try { return res.status(200).json({nationals, numberCusStay}); } catch (error) {} 
        })
    },
    getNumberOfAdminAccount: (req, res) => {
        var adminAccounts = [];
        var numberAdminAcc = [];
        admin.getDataNumberOfAdminAccount((err, results) => {
            if(err) { try { return res.status(500).json(err); } catch (error) {} }
            if(results.length > 0) {
                results.map(item => {
                    adminAccounts.push(item.adminAccount);
                    numberAdminAcc.push(item.numberAdminAcc);
                })
            }
            try { return res.status(200).json({adminAccounts, numberAdminAcc}); } catch (error) {} 
        })
    },
    getNumberOfNativeHotelAccount: (req, res) => {
        var typeOfAccounts = [];
        var numberTypeOfAcc = [];
        user.getDataNumberOfNativeHotelAccount((err, results) => {
            if(err) { try { return res.status(500).json(err); } catch (error) {} }
            if(results.length > 0) {
                results.map(item => {
                    typeOfAccounts.push(item.typeOfAccount);
                    numberTypeOfAcc.push(item.numberTypeOfAcc);
                })
            }
            try { return res.status(200).json({typeOfAccounts, numberTypeOfAcc}); } catch (error) {} 
        })
    }
}