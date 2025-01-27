const jwt = require('jsonwebtoken');

const { SECRET_JWT_SEED } = process.env;

const generateJwt = (uid, name) => {
    return new Promise((resolve, reject) => {

        const payload = {uid, name};

        jwt.sign(payload, SECRET_JWT_SEED, { expiresIn: '2h' },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('Could not generate token');
                } else {
                    resolve(token);
                }
            });
    });
}

module.exports = {
    generateJwt
}