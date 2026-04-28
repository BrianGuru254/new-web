# Mitombili SDA Church — Backend API

Node.js + Express + MongoDB REST API powering the Mitombili SDA Church website.

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, email credentials, etc.
```

### 3. Seed the database (optional)
```bash
npm run seed
```

### 4. Start the server
```bash
npm run dev       # development (nodemon)
npm start         # production
```

The API will be available at `http://localhost:5000`

---

## 📁 Project Structure

```
src/
├── config/
│   ├── database.js       # MongoDB connection
│   └── cloudinary.js     # Cloudinary + Multer uploader
├── controllers/
│   ├── authController.js
│   ├── sermonController.js
│   ├── eventController.js
│   ├── prayerController.js
│   ├── announcementController.js
│   ├── galleryController.js
│   └── contactController.js
├── middleware/
│   ├── auth.js           # protect + restrictTo
│   └── errorHandler.js   # Global error handler
├── models/
│   ├── User.js
│   ├── Sermon.js
│   ├── Event.js
│   ├── PrayerRequest.js
│   ├── Announcement.js
│   ├── Gallery.js
│   └── Contact.js
├── routes/
│   ├── authRoutes.js
│   ├── sermonRoutes.js
│   ├── eventRoutes.js
│   ├── prayerRoutes.js
│   ├── adminRoutes.js
│   └── otherRoutes.js
├── utils/
│   ├── helpers.js        # AppError + catchAsync
│   ├── email.js          # Nodemailer + templates
│   ├── logger.js         # Winston logger
│   └── seeder.js         # DB seed script
├── app.js                # Express app
└── server.js             # Entry point
```

---

## 🔗 API Endpoints

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |

### Auth `/api/v1/auth`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/register` | Public | Register new member |
| POST | `/login` | Public | Login |
| POST | `/logout` | Public | Logout |
| POST | `/forgot-password` | Public | Send reset email |
| PATCH | `/reset-password/:token` | Public | Reset password |
| GET | `/me` | Protected | Get current user |
| PATCH | `/update-me` | Protected | Update profile |
| PATCH | `/update-password` | Protected | Change password |

### Sermons `/api/v1/sermons`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Public | List sermons (filter: category, speaker, tag, series, featured) |
| GET | `/latest` | Public | Get most recent sermon |
| GET | `/:slug` | Public | Get sermon + increment views |
| PATCH | `/:id/download` | Public | Track download count |
| GET | `/admin/all` | Admin/Pastor | All sermons including drafts |
| POST | `/` | Admin/Pastor | Create sermon |
| PATCH | `/:id` | Admin/Pastor | Update sermon |
| DELETE | `/:id` | Admin/Pastor | Delete sermon |

### Events `/api/v1/events`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Public | List events (filter: upcoming, past, category, featured) |
| GET | `/upcoming` | Public | Next N upcoming events |
| GET | `/:slug` | Public | Get single event |
| POST | `/:slug/register` | Public | Register for event |
| POST | `/` | Admin | Create event |
| PATCH | `/:id` | Admin | Update event |
| DELETE | `/:id` | Admin | Delete event |
| GET | `/:id/registrations` | Admin | View registrations |

### Prayer Requests `/api/v1/prayers`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/` | Public | Submit prayer request |
| GET | `/wall` | Public | Public prayer wall |
| PATCH | `/:id/pray` | Public | Increment "I prayed" count |
| GET | `/` | Admin | All prayer requests |
| PATCH | `/:id/status` | Admin | Update status |
| DELETE | `/:id` | Admin | Delete |

### Announcements `/api/v1/announcements`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Public | Active announcements |
| GET | `/all` | Admin | All announcements |
| POST | `/` | Admin | Create |
| PATCH | `/:id` | Admin | Update |
| DELETE | `/:id` | Admin | Delete |

### Gallery `/api/v1/gallery`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Public | List images (filter: album, event, featured) |
| GET | `/albums` | Public | List album names |
| POST | `/upload` | Admin | Upload image (multipart/form-data) |
| PATCH | `/:id` | Admin | Update image metadata |
| DELETE | `/:id` | Admin | Delete image + Cloudinary asset |

### Contact `/api/v1/contact`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/` | Public | Submit contact form |
| GET | `/` | Admin | All messages |
| GET | `/:id` | Admin | Single message (marks as read) |
| PATCH | `/:id` | Admin | Update status/notes |
| DELETE | `/:id` | Admin | Delete |

### Admin `/api/v1/admin`
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/stats` | Admin/Pastor | Dashboard summary stats |
| GET | `/users` | Admin | All members |
| PATCH | `/users/:id/role` | Admin | Change user role |
| DELETE | `/users/:id` | Admin | Deactivate user |

---

## 👥 User Roles

| Role | Permissions |
|------|-------------|
| `member` | Read-only public content, register for events, submit prayer requests |
| `deacon` | + Manage announcements, gallery, event registrations |
| `pastor` | + Manage sermons, events, prayer requests |
| `admin` | Full access including user management |

---

## 🛡️ Security Features

- JWT authentication with HTTP-only cookies
- Rate limiting (200 req/15 min general; 10/15 min on auth)
- Helmet.js security headers
- MongoDB injection sanitization
- CORS restricted to frontend URL
- Password hashing with bcryptjs (12 rounds)

---

## 📧 Email Notifications

Automated emails are sent for:
- New member welcome
- Password reset
- Prayer request confirmation
- Event registration confirmation
- Contact form acknowledgement
- Admin notifications for new inquiries/prayers

Configure via `EMAIL_*` variables in `.env`. Use [Mailtrap](https://mailtrap.io) for development.

---

## ☁️ Media Uploads

Images are uploaded to **Cloudinary**. Configure via `CLOUDINARY_*` variables.  
Upload endpoint accepts `multipart/form-data` with field name `image`.

---

## 🌱 Environment Variables

See `.env.example` for all required variables.
