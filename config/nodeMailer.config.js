const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "nativehotelct@gmail.com",
        pass: "Tran@1461967"
    }
    
    // host: "smtp.mailtrap.io",
    // port: 2525,
    // auth: {
    //   user: "d938ea764be572",
    //   pass: "ab83feb3e1679f"
    // }
});

module.exports = { transport };