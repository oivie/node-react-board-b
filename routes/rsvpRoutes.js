const express = require('express');
const router = express.Router();
const {
    getRSVPs,
    createRSVP,
    updateRSVP,
    deleteRSVP,
    getRSVP,
} = require('../controllers/rsvpController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getRSVPs)
    .post(protect, createRSVP);

router.route('/:id')
    .get(protect, getRSVP)
    .put(protect, updateRSVP)
    .delete(protect, deleteRSVP);

module.exports = router;
