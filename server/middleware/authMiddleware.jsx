const jwt = require('jsonwebtoken')
const HttpError = require('../models/errorModel')

const authMiddleware = async (req, res, next) => {
    //jwt has Authorization header using Bearer schema so the header content is
    //Authorization: Bearer <token> so we work with that header below
    const Authorization = req.headers.Authorization || req.headers.authorization;

    //finds and extracts token from jwt authorization header
    if(Authorization && Authorization.startsWith('Bearer')) {
        const token = Authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, info) => {
            if(err) {
                return next(new HttpError('Unautherized. Invalid token', 403))
            }
            //if token extraction successful asks for info which is the payload of jwt
            req.user = info;
            next()
        })
    } else {
        return next(new HttpError('Unauthorized. No token', 402))
    }
}

module.exports = authMiddleware;