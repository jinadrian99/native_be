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

    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
});

module.exports = { transport };