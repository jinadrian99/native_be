const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: "nativecityhotel@outlook.com.vn",
        pass: "123456789!@#"
    }
    
    // host: "smtp.mailtrap.io",
    // port: 2525,
    // auth: {
    //   user: "d938ea764be572",
    //   pass: "ab83feb3e1679f"
    // }
});

module.exports = { transport };