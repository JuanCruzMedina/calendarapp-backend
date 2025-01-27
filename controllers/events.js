const {response} = require('express');
const Event = require('../models/eventModel');
const getEvents = async (req, res = response) => {
    try {
        const events = await Event.find().populate('user', 'name');


        return res.status(200).json({
            ok: true,
            events
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }
}

const createEvent = async (req, res = response) => {
    try {
        const event = new Event(req.body);
        event.user = req.uid;
        const savedEvent = await event.save();

        return res.status(200).json({
            ok: true,
            savedEvent
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }
}

const updateEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Event not found'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have permission to edit this event'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        };

        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            newEvent,
            {new: true} // return the updated event instead of the old one
        );


        return res.status(200).json({
            ok: true,
            updatedEvent,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }
}

const deleteEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Event not found'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have permission to delete this event'
            });
        }

        const deletedEvent = await Event.findByIdAndDelete(eventId);

        return res.status(200).json({
            ok: true,
            deletedEvent
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}
