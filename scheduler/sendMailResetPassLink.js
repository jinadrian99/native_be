//SP
const mailConfig = require('../config/nodeMailer.config');
const mailOptSend = require('../Helper/mail.helper');

//Model
var user = require('../api/User/user.service');

function sendMailResetPassLink(email, token) {
    user.getUserByEmail(email, (err, resUser) => {
        if (err) { 
            return console.log(err); 
        }
        if (resUser.length <= 0) {
            return;
        }
        if (resUser.length > 0) {
            const toEmail = email;
            const subject = `NativeCity Hotel, reset your password.`;
            const htmlText = `
                <div style="text-align: center; font-family: 'herventical'">
                    <h1 style="margin-bottom: 25px">NativeCity Hotel</h1>
                    <h3>✨ Dear customer, hello ${ resUser[0].displayName } ✨</h3>
                    <p style="margin-bottom: 25px">
                        We have just received request to reset your password for ${ resUser[0].displayName } account.<br/>
                        To reset your password, please click the button below.
                    </p>
                    <p>
                        <a href="https://nativecity.tk/reset-password/${token}">
                            <button style="width: 100px; height: 30px; background-color: white; color: crimson; border: 1px solid crimson">
                                GO NOW!
                            </button>  
                        </a>
                    </p>     
                    <p style="margin-bottom: 25px">
                        If you do not click button within 1 minute, it will expire.
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

module.exports = sendMailResetPassLink;