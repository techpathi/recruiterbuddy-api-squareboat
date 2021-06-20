const jwt = require('jsonwebtoken');

const generateToken = (username) => {
    return jwt.sign({ id: username }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

module.exports = generateToken;