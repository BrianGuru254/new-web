const express = require('express');
const router = express.Router();
const c = require('../controllers/sermonController');
const { protect, restrictTo } = require('../middleware/auth');

// Public
router.get('/', c.getAllSermons);
router.get('/latest', c.getLatestSermon);
router.get('/:slug', c.getSermon);
router.patch('/:id/download', c.trackDownload);

// Admin only
router.use(protect, restrictTo('admin', 'pastor'));
router.get('/admin/all', c.adminGetAllSermons);
router.post('/', c.createSermon);
router.patch('/:id', c.updateSermon);
router.delete('/:id', c.deleteSermon);

module.exports = router;