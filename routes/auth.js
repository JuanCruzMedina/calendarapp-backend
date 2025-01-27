const { Router } = require('express');
const router = Router();
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateFields } = require("../middlewares/fieldValidators");
const { validateJwt } = require("../middlewares/jwtValidators");

router.post('/new',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').isLength({min: 6}),
        validateFields,
    ],
    createUser);
router.post('/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').isLength({min: 6}),
        validateFields
    ],
    loginUser);
router.get('/renew', validateJwt, renewToken);

module.exports = router;