const { Router } = require('express');
const {getEvents, createEvent, updateEvent, deleteEvent} = require("../controllers/events");
const {validateJwt} = require("../middlewares/jwtValidators");
const {check} = require("express-validator");
const {validateFields} = require("../middlewares/fieldValidators");
const isDate = require("../helpers/isDate");

const router = Router();

router.use(validateJwt); // middleware for all routes below

router.get('/', getEvents);
router.post('/', [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
    validateFields,
], createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;