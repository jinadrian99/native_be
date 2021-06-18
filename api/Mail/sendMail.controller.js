const mailConfig = require('../../config/nodeMailer.config');
const mailOptSend = require('../../Helper/mail.helper');
const emailExistence = require('email-existence');

module.exports = {
    checkExistEmail: (req, res) => {
        const data = req.body;
        const email = data.email;
        emailExistence.check(email, (err, exists) => {
            if(err)   { console.log(err); return res.status(500).json(err); }
            return res.status(200).json(exists); 
        });
    },
    sendToActive: (req, res) => {
        const data = req.body;
        const toEmail = data.email;
        const subject = `NativeCity Hotel Active mail `;
        const htmlText = `
            <h1>NativeCity Hotel</h1>
            <p>You can active this email now! <a href="#">Click me</a></p>
        `;
        const options = mailOptSend.optSend(toEmail, subject, htmlText);
    
        mailConfig.transport.sendMail(options, (err, info) => {
            if(err) { console.log(err); return res.status(500).json(err); }
            return res.status(200).json(`Please, check you mail: ` + toEmail);
        })
    },
}