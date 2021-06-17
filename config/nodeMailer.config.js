const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 587,
    service: 'gmail',
    secure: false,
    auth: {
        user: "nativehotelct@gmail.com",
        pass: "Nh@123456"
    }
});

module.exports = { transport };