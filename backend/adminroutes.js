const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/auth');
const { catchAsync } = require('../utils/helpers');
const User = require('../models/User');
const Sermon = require('../models/Sermon');
const Event = require('../models/Event');
const PrayerRequest = require('../models/PrayerRequest');
const Contact = require('../models/Contact');
const Gallery = require('../models/Gallery');

router.use(protect, restrictTo('admin', 'pastor'));

// Dashboard summary stats
router.get('/stats', catchAsync(async (req, res) => {
  const now = new Date();

  const [members, sermons, upcomingEvents, newPrayers, newMessages, galleryCount] = await Promise.all([
    User.countDocuments(),
    Sermon.countDocuments({ isPublished: true }),
    Event.countDocuments({ isPublished: true, date: { $gte: now } }),
    PrayerRequest.countDocuments({ status: 'pending' }),
    Contact.countDocuments({ status: 'new' }),
    Gallery.countDocuments({ isPublished: true }),
  ]);

  res.status(200).json({
    status: 'success',
    data: { members, sermons, upcomingEvents, newPrayers, newMessages, galleryCount },
  });
}));

// User management (admin only)
router.get('/users', restrictTo('admin'), catchAsync(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.status(200).json({ status: 'success', results: users.length, data: { users } });
}));

router.patch('/users/:id/role', restrictTo('admin'), catchAsync(async (req, res, next) => {
  const { AppError } = require('../utils/helpers');
  const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true });
  if (!user) return next(new AppError('User not found', 404));
  res.status(200).json({ status: 'success', data: { user } });
}));

router.delete('/users/:id', restrictTo('admin'), catchAsync(async (req, res, next) => {
  const { AppError } = require('../utils/helpers');
  const user = await User.findByIdAndUpdate(req.params.id, { isActive: false });
  if (!user) return next(new AppError('User not found', 404));
  res.status(204).json({ status: 'success', data: null });
}));

module.exports = router;