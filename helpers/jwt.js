require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY

function generateToken(dataUser = {}) {
    let token = jwt.sign(dataUser, secretKey, { expiresIn: 3600 * 24 });
    return token;
}

function getLoginData(token) {
    let decoded = jwt.verify(token, secretKey);
    return decoded;
}

module.exports = { generateToken, getLoginData }