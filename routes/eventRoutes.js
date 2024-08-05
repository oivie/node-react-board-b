const express = require('express');
const { 
  getEvents,
  createEvent, 
  updateEvent, 
  deleteEvent, 
  getEvent, 
  getEventsByUser 
} = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getEvents)
  .post(protect, createEvent);

router.route('/:id')
  .get(getEvent)
  .put(protect, updateEvent)
  .delete(protect, deleteEvent);

router.route('/user/:userId')
  .get(protect, getEventsByUser);

module.exports = router;
