import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from '../models/Service.js';

dotenv.config();

const addNewServices = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Add only the 3 new services
    const newServices = [
      {
        title: 'Bug Fixing',
        slug: 'bug-fixing',
        shortDesc: 'Quick and reliable bug fixes',
        details: 'Identify and fix bugs in your existing applications. Fast turnaround with thorough testing.',
        deliverables: ['Bug Analysis', 'Quick Fixes', 'Testing', 'Documentation'],
        icon: '🐛',
        order: 4,
        published: true
      },
      {
        title: 'Maintenance',
        slug: 'maintenance',
        shortDesc: 'Ongoing support and maintenance',
        details: 'Keep your applications running smoothly with regular updates, monitoring, and support.',
        deliverables: ['Regular Updates', 'Performance Monitoring', 'Security Patches', '24/7 Support'],
        icon: '🔧',
        order: 5,
        published: true
      },
      {
        title: 'Redesign & Upgrade',
        slug: 'redesign-upgrade',
        shortDesc: 'Modernize your existing applications',
        details: 'Upgrade old applications with modern technologies and fresh designs. Improve performance and user experience.',
        deliverables: ['Modern UI/UX', 'Technology Upgrade', 'Performance Boost', 'Feature Enhancement'],
        icon: '✨',
        order: 6,
        published: true
      }
    ];

    for (const service of newServices) {
      const exists = await Service.findOne({ slug: service.slug });
      if (!exists) {
        await Service.create(service);
        console.log(`✅ Added: ${service.title}`);
      } else {
        console.log(`⏭️  Skipped: ${service.title} (already exists)`);
      }
    }

    console.log('\n🎉 Services added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

addNewServices();
