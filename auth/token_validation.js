const { verify } = require('jsonwebtoken');

module.exports = {
    checkToken: (req, res, next) => {
        const token = req.get('authorization');
        if (token) {
            token = token.slice(7);
            verify(token, "nativeHotel", (err, decoded) => {
                if (err) {
                    return res.status(400).json('Invalid token');
                }
                else {
                    next();
                }
            });
        }
        else {
            return res.status(400).json('Access denied');
        }
    }
};