module.exports = { 
    optSend: (to, subject, html) => { 
        const options = { 
            from: process.env.MAIL_USER,
            to,
            subject,
            html,
        }
        return options;
    } 
}