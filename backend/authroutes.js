const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/logout', auth.logout);
router.post('/forgot-password', auth.forgotPassword);
router.patch('/reset-password/:token', auth.resetPassword);

// Protected
router.use(protect);
router.get('/me', auth.getMe);
router.patch('/update-me', auth.updateMe);
router.patch('/update-password', auth.updatePassword);

module.exports = router;