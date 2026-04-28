const express = require('express');
const announcementController = require('../controllers/announcementController');
const galleryController = require('../controllers/galleryController');
const contactController = require('../controllers/contactController');
const { protect, restrictTo } = require('../middleware/auth');

// ── Announcements ────────────────────────────────────────────────────────────
const announcementRouter = express.Router();
announcementRouter.get('/', announcementController.getAnnouncements);
announcementRouter.use(protect, restrictTo('admin', 'pastor', 'deacon'));
announcementRouter.get('/all', announcementController.getAllAnnouncements);
announcementRouter.post('/', announcementController.createAnnouncement);
announcementRouter.patch('/:id', announcementController.updateAnnouncement);
announcementRouter.delete('/:id', announcementController.deleteAnnouncement);

// ── Gallery ──────────────────────────────────────────────────────────────────
const galleryRouter = express.Router();
galleryRouter.get('/', galleryController.getGallery);
galleryRouter.get('/albums', galleryController.getAlbums);
galleryRouter.use(protect, restrictTo('admin', 'pastor', 'deacon'));
galleryRouter.post('/upload', galleryController.upload, galleryController.uploadImage);
galleryRouter.patch('/:id', galleryController.updateImage);
galleryRouter.delete('/:id', galleryController.deleteImage);

// ── Contact ──────────────────────────────────────────────────────────────────
const contactRouter = express.Router();
contactRouter.post('/', contactController.submitContact);
contactRouter.use(protect, restrictTo('admin', 'pastor'));
contactRouter.get('/', contactController.getAllContacts);
contactRouter.get('/:id', contactController.getContact);
contactRouter.patch('/:id', contactController.updateContact);
contactRouter.delete('/:id', contactController.deleteContact);

module.exports = { announcementRouter, galleryRouter, contactRouter };