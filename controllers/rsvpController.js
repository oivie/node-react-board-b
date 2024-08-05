const RSVP = require('../models/RSVP');

// Get all RSVPs
const getRSVPs = async (req, res) => {
    try {
        const rsvps = await RSVP.find().populate('event').populate('user', 'name email');
        res.status(200).json(rsvps);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single RSVP
const getRSVP = async (req, res) => {
    try {
        const rsvp = await RSVP.findById(req.params.id).populate('event').populate('user', 'name email');
        if (!rsvp) return res.status(404).json({ message: 'RSVP not found' });
        res.status(200).json(rsvp);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new RSVP
const createRSVP = async (req, res) => {
    const { event, status } = req.body;
    try {
        const rsvp = new RSVP({
            event,
            user: req.user._id,
            status,
        });
        await rsvp.save();
        res.status(201).json(rsvp);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an RSVP
const updateRSVP = async (req, res) => {
    try {
        const rsvp = await RSVP.findById(req.params.id);
        if (!rsvp) return res.status(404).json({ message: 'RSVP not found' });

        // Check if the logged-in user is the creator of the RSVP
        if (rsvp.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'User not authorized to update this RSVP' });
        }

        const { status } = req.body;
        rsvp.status = status || rsvp.status;

        await rsvp.save();
        res.status(200).json(rsvp);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an RSVP
const deleteRSVP = async (req, res) => {
    try {
        const rsvp = await RSVP.findById(req.params.id);
        if (!rsvp) return res.status(404).json({ message: 'RSVP not found' });

        // Check if the logged-in user is the creator of the RSVP
        if (rsvp.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'User not authorized to delete this RSVP' });
        }

        await rsvp.remove();
        res.status(200).json({ message: 'RSVP removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getRSVPs, getRSVP, createRSVP, updateRSVP, deleteRSVP };
