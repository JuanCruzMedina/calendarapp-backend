const { response } = require('express');
const jwt = require('jsonwebtoken');

const  { SECRET_JWT_SEED } = process.env;

const validateJwt = (req, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }

    try {

        const { uid, name } = jwt.verify(token, SECRET_JWT_SEED);

        req.uid = uid;
        req.name = name;

        next();

    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = {
    validateJwt
}