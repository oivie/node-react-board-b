const Event = require('../models/Event');

// Get all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'name email');
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch events created by a specific user
const getEventsByUser = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.params.userId }).populate('createdBy', 'name email');
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single event
const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'name email');
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new event
const createEvent = async (req, res) => {
  const { title, description, date, location, tags } = req.body;
  try {
    const event = new Event({
      title,
      description,
      date,
      location,
      tags,
      createdBy: req.user._id,
    });
    await event.save();
    await event.populate('createdBy', 'name email').execPopulate(); // Populate the createdBy field
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Update an event
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Check if the logged-in user is the creator of the event
    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized to update this event' });
    }

    const { title, description, date, location, tags } = req.body;
    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.location = location || event.location;
    event.tags = tags || event.tags;

    await event.save();
    await event.populate('createdBy', 'name email').execPopulate(); // Ensure createdBy is populated
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Delete an event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Check if the logged-in user is the creator of the event
    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized to delete this event' });
    }

    await event.remove();
    res.status(200).json({ message: 'Event removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsByUser
};
