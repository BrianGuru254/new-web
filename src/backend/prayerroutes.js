const express = require('express');
const router = express.Router();
const c = require('../controllers/prayerController');
const { protect, restrictTo } = require('../middleware/auth');

// Public
router.post('/', c.submitPrayerRequest);
router.get('/wall', c.getPrayerWall);
router.patch('/:id/pray', c.addPrayerCount);

// Admin only
router.use(protect, restrictTo('admin', 'pastor', 'deacon'));
router.get('/', c.getAllPrayerRequests);
router.patch('/:id/status', c.updatePrayerStatus);
router.delete('/:id', c.deletePrayerRequest);

module.exports = router;