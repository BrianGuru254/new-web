require('dotenv').config({ path: `${__dirname}/../../.env` });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Sermon = require('../models/Sermon');
const Event = require('../models/Event');
const Announcement = require('../models/Announcement');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data (dev only!)
    await Promise.all([
      User.deleteMany(),
      Sermon.deleteMany(),
      Event.deleteMany(),
      Announcement.deleteMany(),
    ]);
    console.log('🗑  Cleared existing data');

    // Seed admin
    const admin = await User.create({
      name: process.env.ADMIN_NAME || 'Church Admin',
      email: process.env.ADMIN_EMAIL || 'admin@mitombilisda.org',
      password: process.env.ADMIN_PASSWORD || 'Admin@1234!',
      role: 'admin',
      isVerified: true,
    });
    console.log(`👤 Admin created: ${admin.email}`);

    // Seed sample sermons
    await Sermon.insertMany([
      {
        title: 'Walking in Faith',
        speaker: 'Pastor James Kariuki',
        speakerRole: 'Head Pastor',
        date: new Date('2024-12-07'),
        description: 'A powerful message on trusting God through life\'s storms.',
        scripture: 'Hebrews 11:1-6',
        category: 'sunday-service',
        series: 'Faith in Action',
        tags: ['faith', 'trust', 'prayer'],
        isPublished: true,
        isFeatured: true,
        uploadedBy: admin._id,
      },
      {
        title: 'The Power of Prayer',
        speaker: 'Pastor James Kariuki',
        speakerRole: 'Head Pastor',
        date: new Date('2024-11-30'),
        description: 'Discover how prayer transforms your relationship with God.',
        scripture: 'Philippians 4:6-7',
        category: 'prayer-meeting',
        tags: ['prayer', 'spiritual growth'],
        isPublished: true,
        uploadedBy: admin._id,
      },
    ]);
    console.log('📖 Sermons seeded');

    // Seed sample events
    await Event.insertMany([
      {
        title: 'Annual Church Campmeeting 2025',
        description: 'Join us for a week of revival, worship, and spiritual renewal.',
        shortDescription: 'A week-long revival camp for the whole family.',
        category: 'special',
        date: new Date('2025-04-10'),
        endDate: new Date('2025-04-17'),
        time: '8:00 AM – 9:00 PM',
        location: 'Mitombili SDA Church Grounds',
        registrationRequired: true,
        maxAttendees: 500,
        isPublished: true,
        isFeatured: true,
        createdBy: admin._id,
      },
      {
        title: 'Youth Week of Prayer',
        description: 'A dedicated week of prayer and spiritual growth for the youth.',
        category: 'youth',
        date: new Date('2025-03-22'),
        endDate: new Date('2025-03-29'),
        time: '4:00 PM – 6:00 PM',
        isPublished: true,
        createdBy: admin._id,
      },
    ]);
    console.log('📅 Events seeded');

    // Seed announcements
    await Announcement.insertMany([
      {
        title: 'Sabbath Service — All Welcome',
        body: 'Join us every Saturday at 9:00 AM for Sabbath School and 11:00 AM for Divine Service. All are welcome!',
        category: 'general',
        priority: 'high',
        isPinned: true,
        isActive: true,
        createdBy: admin._id,
      },
      {
        title: 'New Members Class Starting Soon',
        body: 'Are you interested in joining our church family? Our next new members class begins on the first Sabbath of next month.',
        category: 'general',
        priority: 'medium',
        isActive: true,
        createdBy: admin._id,
      },
    ]);
    console.log('📢 Announcements seeded');

    console.log('\n✅ Database seeded successfully!');
    console.log(`\n🔑 Admin login:\n   Email: ${admin.email}\n   Password: ${process.env.ADMIN_PASSWORD || 'Admin@1234!'}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
};

seed();