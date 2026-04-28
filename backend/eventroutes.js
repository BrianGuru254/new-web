const express = require('express');
const router = express.Router();
const c = require('../controllers/eventController');
const { protect, restrictTo } = require('../middleware/auth');

// Public
router.get('/', c.getAllEvents);
router.get('/upcoming', c.getUpcomingEvents);
router.get('/:slug', c.getEvent);
router.post('/:slug/register', c.registerForEvent);

// Admin only
router.use(protect, restrictTo('admin', 'pastor', 'deacon'));
router.post('/', c.createEvent);
router.patch('/:id', c.updateEvent);
router.delete('/:id', c.deleteEvent);
router.get('/:id/registrations', c.getEventRegistrations);

module.exports = router;