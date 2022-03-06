const jwt = require('jsonwebtoken');

module.exports = {
    generateTokenForUser: function(userData) {
        const passWordToken = process.env.PASSWORD_TOKEN
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
        `${passWordToken}`,
        {
            expiresIn: '1h'
        })
    }
}