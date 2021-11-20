const bcrypt = require('bcrypt');

function encrypt(rawPass) {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(rawPass, saltRounds);
    return hash
};

function comparePass(rawPass, hashedPass) {
    return bcrypt.compareSync(rawPass, hashedPass)
};

module.exports = { encrypt, comparePass };