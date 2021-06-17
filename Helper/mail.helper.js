module.exports = { 
    optSend: (to, subject, html) => { 
        const options = { 
            from: 'nativecityhotel@outlook.com.vn',
            to,
            subject,
            html,
        }
        return options;
    } 
}