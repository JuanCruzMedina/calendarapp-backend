const {response} = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { generateJwt } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
    const { email } = req.body;
    try {
        let userFound = await User.findOne({ email }).exec();
        if (userFound) {
            return res.status(400).json({
                ok: false,
                msg: 'User already exists with that email'
            });
        }
        const user = User(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(req.body.password, salt);
        await user.save();

        const token = await generateJwt(user.id, user.name);

        return res.status(201).json({
            ok: true,
            msg: 'register',
            uid: user.id,
            name: user.name,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });

    }
}

const loginUser = async (req, res = response) => {
    const { email } = req.body;
    try {
        let userFound = await User.findOne({ email }).exec();
        if (!userFound) {
            return res.status(400).json({
                ok: false,
                msg: 'User not found'
            });
        }
        const { password: userPassword, id: uid, name } = userFound;
        const validPassword = bcrypt.compareSync(req.body.password, userPassword);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect password'
            });
        }

        const token = await generateJwt(uid, name);

        return res.status(201).json({
            ok: true,
            msg: 'login',
            uid,
            name,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }
}

const renewToken = async (req, res = response) => {
    const { uid, name } = req;
    const token = await generateJwt(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    });
}

module.exports = {
    createUser,
    loginUser,
    renewToken
}