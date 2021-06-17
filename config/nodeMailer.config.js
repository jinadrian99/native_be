const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    // pool: true,
    // host: "smtp.gmail.com",
    // port: 465,
    // secure: true,
    // auth: {
    //     user: "nativehotelct@gmail.com",
    //     pass: "Nh@123456"
    // }
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d938ea764be572",
      pass: "ab83feb3e1679f"
    }
});

module.exports = { transport };