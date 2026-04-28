const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');

const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const sermonRoutes = require('./routes/sermonRoutes');
const eventRoutes = require('./routes/eventRoutes');
const prayerRoutes = require('./routes/prayerRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { announcementRouter, galleryRouter, contactRouter } = require('./routes/otherRoutes');

const app = express();

// ── Security ─────────────────────────────────────────────────────────────────
app.use(helmet());
app.use(mongoSanitize());

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

// ── Rate limiting ────────────────────────────────────────────────────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 200,
  message: { status: 'fail', message: 'Too many requests. Please try again in 15 minutes.' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { status: 'fail', message: 'Too many auth attempts. Please try again later.' },
});

app.use('/api', apiLimiter);
app.use('/api/v1/auth/login', authLimiter);
app.use('/api/v1/auth/register', authLimiter);

// ── Body parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ── Logging ───────────────────────────────────────────────────────────────────
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) =>
  res.status(200).json({ status: 'ok', message: 'Mitombili SDA API is running 🙏', env: process.env.NODE_ENV })
);

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/v1/auth',          authRoutes);
app.use('/api/v1/sermons',       sermonRoutes);
app.use('/api/v1/events',        eventRoutes);
app.use('/api/v1/prayers',       prayerRoutes);
app.use('/api/v1/announcements', announcementRouter);
app.use('/api/v1/gallery',       galleryRouter);
app.use('/api/v1/contact',       contactRouter);
app.use('/api/v1/admin',         adminRoutes);

// ── 404 handler ───────────────────────────────────────────────────────────────
app.all('*', (req, res) =>
  res.status(404).json({ status: 'fail', message: `Route ${req.originalUrl} not found` })
);

// ── Global error handler ──────────────────────────────────────────────────────
app.use(errorHandler);

module.exports = app;