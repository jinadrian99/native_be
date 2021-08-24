// SP
const scheduler = require('../Helper/scheduler.helper');
const mailConfig = require('../config/nodeMailer.config');
const mailOptSend = require('../Helper/mail.helper');

// Models
var booking = require('../api/Booking/booking.service');
var bill = require('../api/Bill/Bill.service');
var user = require('../api/User/user.service');

const crontab = '48 9 * * *';

//Demo: 
// const crontab = '* * * * *';
// SELECT * 
// FROM DONDATPHONG 
// WHERE YEAR(ngayDen) = 2021 and MONTH(ngayDen) = 8 and 25 - DAY(ngayDen) >= 0 and 25 - DAY(ngayDen) <= 2
// Booking láy booking 40, 42, 43, 44, 54 -> đổi 42: tìnhTrang: 2->1 (để tạo booking mà ko giữ chân phòng), khd: 5->130 (để send mail cho qht321)

scheduler.scheduleJob(crontab, () => { 
    var today = new Date();
    booking.getDataDayNumNearToDay(2, today, (err, lstBooking) => { //lấy các booking còn 2 ngày là đến ở trong tháng này năm này
        if(err) { return console.log(err); }
        // console.log(lstBooking);
        if(lstBooking.length <= 0) { return; }
        // var count1 = lstBooking.length;
        lstBooking.forEach(booking => {
            bill.getDataByIdddp(booking.idDDP, (err, objBill) => {
                if(err) { return console.log(err); }
                if(objBill == null) { 
                    // user đến time r mà chưa tạo bill từ nút create bill trong ddp -> send mail kêu tạo bill và thanh toán
                    user.getEmailByIdkhd(booking.idKHD, (err, objUser) => {
                        if(err) { return console.log(err); }
                        // console.log('send this email: ', objUser.email);
                        if(objUser != null){ 
                            const toEmail = objUser.email;
                            const subject = `NativeCity Hotel, deposit for a bill before you come in we hotel`;
                            const htmlText = `
                                <div style="text-align: center; font-family: 'herventical'">
                                    <h1 style="margin-bottom: 25px">NativeCity Hotel</h1>
                                    <h3>✨ Dear customer, hello ${ objUser.displayName } ✨</h3>
                                    <p>Good day, my name is Jin Adrian.</p>
                                    <p style="margin-bottom: 25px">
                                        In a few days you will arrive at the hotel, you must complete the deposit procedure.<br />
                                        To complete the deposit procedure, you must create bill from booking have id: ${ booking.idDDP } and pay deposit 30% for this bill.
                                    </p>
                                    <p>
                                        <a href="https://nativecity.tk/login">
                                            <button style="width: 100px; height: 30px; background-color: white; color: crimson; border: 1px solid crimson">
                                                GO NOW!
                                            </button>  
                                        </a>
                                    </p>                            
                                </div>
                            `;
                            const options = mailOptSend.optSend(toEmail, subject, htmlText);
    
                            mailConfig.transport.sendMail(options, (err, info) => {
                                if(err) { console.log(err) }
                                return console.log(`Please, check you mail: ` + toEmail);
                            })
                        }
                    })
                }
                else if(objBill.tinhTrang == 0){
                    // user nhấn nút tạo bill từ ddp r mà chưa thanh toán -> send mail nữa
                    // console.log('idKHD: ', objBill);
                    user.getEmailByIdkhd(objBill.idKHD, (err, objUser) => {
                        if(err) { return console.log(err); }
                        // console.log('send this email: ', objUser.email);
                        if(objUser != null){ 
                            const toEmail = objUser.email;
                            const subject = `NativeCity Hotel, deposit for a bill before you come in we hotel`;
                            const htmlText = `
                                <div style="text-align: center; font-family: 'herventical'">
                                    <h1 style="margin-bottom: 25px">NativeCity Hotel</h1>
                                    <h3>✨ Dear customer, hello ${ objUser.displayName } ✨</h3>
                                    <p>Good day, my name is Jin Adrian.</p>
                                    <p style="margin-bottom: 25px">
                                        In a few days you will arrive at the hotel, you must complete the deposit procedure.<br />
                                        To complete the deposit procedure, you must pay deposit 30% for this bill have id: ${ objBill.idPTT }.
                                    </p>
                                    <p>
                                        <a href="https://nativecity.tk/login">
                                            <button style="width: 100px; height: 30px; background-color: white; color: crimson; border: 1px solid crimson">
                                                GO NOW!
                                            </button>  
                                        </a>
                                    </p>                            
                                </div>
                            `;
                            const options = mailOptSend.optSend(toEmail, subject, htmlText);

                            mailConfig.transport.sendMail(options, (err, info) => {
                                if(err) { console.log(err) }
                                return console.log(`Please, check you mail: ` + toEmail);
                            })
                        }
                    })
                }
            })
        })
    });
})