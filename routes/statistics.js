const express = require('express');
const User = require('../models/User');
const Event = require('../models/Event');

const router = express.Router();

router.get('/stats', async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const eventCount = await Event.countDocuments();
    
    const topUsers = await Event.aggregate([
      { $group: { _id: '$createdBy', eventCount: { $sum: 1 } } },
      { $sort: { eventCount: -1 } },
      { $limit: 3 },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
      { $project: { _id: 0, name: '$user.name', eventCount: 1 } }
    ]);

    res.json({ userCount, eventCount, topUsers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
