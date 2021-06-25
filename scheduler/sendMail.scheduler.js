// SP
const scheduler = require('../Helper/scheduler.helper');
const mailConfig = require('../config/nodeMailer.config');
const mailOptSend = require('../Helper/mail.helper');

// Models
var booking = require('../api/Booking/booking.service');
var bill = require('../api/Bill/bill.service');
var user = require('../api/User/user.service');

const crontab = '0 9 * * *';



scheduler.scheduleJob(crontab, () => { 
    var today = new Date();
    booking.getDataDayNumNearToDay(2, today, (err, lstBooking) => {
        if(err) { return console.log(err); }
        // console.log(lstBooking);
        if(lstBooking.length <= 0) { return; }
        // var count1 = lstBooking.length;
        lstBooking.forEach(booking => {
            bill.getIdkhdByIdddp(booking.idDDP, (err, objBill) => {
                if(err) { return console.log(err); }
                if(objBill == null) { 
                    // user đến time r mà chưa tạo bill từ nút create bill trong ddp -> send mail kêu tạo bill và thanh toán
                    user.getEmailByIdkhd(booking.idKHD, (err, objUser) => {
                        if(err) { return console.log(err); }
                        // console.log('send this email: ', objUser.email);
                        if(objUser != null){ 
                            const toEmail = objUser.email;
                            const subject = `NativeCity Hotel deposit 30% for a bill`;
                            const htmlText = `
                                <div style="text-align: center">
                                    <h1>NativeCity Hotel</h1>
                                    <h3>✨ Hello ${ objUser.displayName } ✨</h3>
                                    <p>You must create bill from booking have id: ${ booking.idDDP }
                                    <p>And you must deposit 30% for this bill<a href="#">Click me</a></p>                                
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
                else if(objBill.tinhTrang == 1){
                    // user nhấn nút tạo bill từ ddp r mà chưa thanh toán -> send mail nữa
                    // console.log('idKHD: ', objBill);
                    user.getEmailByIdkhd(objBill.idKHD, (err, objUser) => {
                        if(err) { return console.log(err); }
                        // console.log('send this email: ', objUser.email);
                        if(objUser != null){ 
                            const toEmail = objUser.email;
                            const subject = `NativeCity Hotel deposit 30% for a bill`;
                            const htmlText = `
                                <div style="text-align: center">
                                    <h1>NativeCity Hotel</h1>
                                    <h3>✨ Hello ${ objUser.displayName } ✨</h3>
                                    <p>You must create bill from booking have id: ${ booking.idDDP }
                                    <p>And you must deposit 30% for this bill<a href="#">Click me</a></p>                                
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