const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "nativehotelct@gmail.com",
        pass: "Nh@123456"
    }
});

module.exports = { transport };