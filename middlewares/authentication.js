const { getLoginData } = require('../helpers/jwt');

async function loginCheck(req, res, next) {
    const bearerToken = req.header('Authorization');

    try{
        const token = bearerToken.replace('Bearer ', '');
        const adminData = getLoginData(token);

        req.admins = adminData;
        next()
    } catch (error) {
        return res.status(401).json({
            status: 'failed',
            message: 'please login as admin first',
        })
    }
}

module.exports = { loginCheck }