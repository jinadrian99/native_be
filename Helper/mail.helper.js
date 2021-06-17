module.exports = { 
    optSend: (to, subject, html) => { 
        const options = { 
            from: process.env.MAIL_ACC,
            to,
            subject,
            html,
        }
        return options;
    } 
}