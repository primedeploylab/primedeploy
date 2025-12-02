import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Service from '../models/Service.js';
import Project from '../models/Project.js';
import Blog from '../models/Blog.js';
import SiteSettings from '../models/SiteSettings.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Service.deleteMany({}),
      Project.deleteMany({}),
      Blog.deleteMany({}),
      SiteSettings.deleteMany({})
    ]);

    // Create admin user
    const passwordHash = await User.hashPassword(process.env.ADMIN_DEFAULT_PASSWORD || 'Admin@123456');
    await User.findOneAndUpdate(
      { email: process.env.ADMIN_DEFAULT_EMAIL || 'admin@deployprime.com' },
      {
        name: 'Admin',
        email: process.env.ADMIN_DEFAULT_EMAIL || 'admin@deployprime.com',
        passwordHash,
        role: 'admin'
      },
      { upsert: true }
    );

    // Seed Services
    const services = [
      {
        title: 'Web Development',
        slug: 'web-development',
        shortDesc: 'Custom websites built with modern technologies',
        details: 'Full-stack web development using React, Node.js, and MongoDB. We create responsive, fast, and SEO-optimized websites.',
        deliverables: ['Responsive Design', 'SEO Optimization', 'Performance Tuning', 'Security Best Practices'],
        icon: '🌐',
        order: 1,
        published: true
      },
      {
        title: 'App Development',
        slug: 'app-development',
        shortDesc: 'Native and cross-platform mobile applications',
        details: 'iOS and Android apps using Flutter and React Native. Build once, deploy everywhere with native performance.',
        deliverables: ['Cross-platform Apps', 'Native Performance', 'App Store Deployment', 'Push Notifications'],
        icon: '📱',
        order: 2,
        published: true
      },
      {
        title: 'UI/UX Design',
        slug: 'ui-ux-design',
        shortDesc: 'Beautiful and intuitive user interfaces',
        details: 'User-centered design with modern aesthetics. We create designs that users love and convert.',
        deliverables: ['Wireframes', 'Prototypes', 'Design Systems', 'User Testing'],
        icon: '🎨',
        order: 3,
        published: true
      },
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

    await Service.insertMany(services);
    console.log('✅ Services seeded');

    // Seed Projects
    const placeholderImage = 'https://placehold.co/800x600/1A73E8/white?text=Project+Image';
    const projects = [
      {
        title: 'E-Commerce Platform',
        slug: 'ecommerce-platform',
        shortDesc: 'Full-featured online shopping platform',
        description: 'A complete e-commerce solution with payment integration, inventory management, and admin dashboard.',
        images: [{ url: placeholderImage, publicId: 'sample1' }],
        tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        websiteUrl: 'https://example.com',
        timeTaken: '3 months',
        order: 1,
        published: true
      },
      {
        title: 'Food Delivery App',
        slug: 'food-delivery-app',
        shortDesc: 'Mobile app for food ordering and delivery',
        description: 'Cross-platform mobile application for restaurant discovery and food delivery.',
        images: [{ url: placeholderImage, publicId: 'sample2' }],
        tech: ['Flutter', 'Firebase', 'Google Maps API'],
        playStoreUrl: 'https://play.google.com',
        timeTaken: '2 months',
        order: 2,
        published: true
      },
      {
        title: 'Portfolio Website',
        slug: 'portfolio-website',
        shortDesc: 'Modern portfolio for creative professionals',
        description: 'Stunning portfolio website with animations and project showcase.',
        images: [{ url: placeholderImage, publicId: 'sample3' }],
        tech: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
        websiteUrl: 'https://example.com',
        timeTaken: '3 weeks',
        order: 3,
        published: true
      },
      {
        title: 'Task Management System',
        slug: 'task-management',
        shortDesc: 'Collaborative project management tool',
        description: 'Team collaboration platform with real-time updates and task tracking.',
        images: [{ url: placeholderImage, publicId: 'sample4' }],
        tech: ['React', 'Socket.io', 'PostgreSQL'],
        websiteUrl: 'https://example.com',
        timeTaken: '6 weeks',
        order: 4,
        published: true
      },
      {
        title: 'Fitness Tracker App',
        slug: 'fitness-tracker',
        shortDesc: 'Health and fitness monitoring application',
        description: 'Mobile app for tracking workouts, nutrition, and health metrics.',
        images: [{ url: placeholderImage, publicId: 'sample5' }],
        tech: ['React Native', 'Node.js', 'MongoDB'],
        playStoreUrl: 'https://play.google.com',
        appStoreUrl: 'https://apps.apple.com',
        timeTaken: '2 months',
        order: 5,
        published: true
      },
      {
        title: 'Real Estate Platform',
        slug: 'real-estate-platform',
        shortDesc: 'Property listing and management system',
        description: 'Comprehensive real estate platform with property search and virtual tours.',
        images: [{ url: placeholderImage, publicId: 'sample6' }],
        tech: ['Vue.js', 'Express', 'MongoDB', 'Mapbox'],
        websiteUrl: 'https://example.com',
        timeTaken: '4 months',
        order: 6,
        published: true
      }
    ];

    await Project.insertMany(projects);
    console.log('✅ Projects seeded');

    // Seed Blogs
    const blogPlaceholder = 'https://placehold.co/800x400/1A73E8/white?text=Blog+Image';
    const blogs = [
      {
        title: 'Getting Started with React',
        slug: 'getting-started-with-react',
        excerpt: 'Learn the basics of React and build your first component',
        content: '<h2>Introduction to React</h2><p>React is a powerful JavaScript library for building user interfaces...</p>',
        author: 'DeployPrime Team',
        tags: ['React', 'JavaScript', 'Web Development'],
        featuredImage: { url: blogPlaceholder, publicId: 'blog1' },
        draft: false,
        publishedAt: new Date()
      },
      {
        title: 'Mobile App Development Best Practices',
        slug: 'mobile-app-best-practices',
        excerpt: 'Essential tips for building high-quality mobile applications',
        content: '<h2>Best Practices</h2><p>Building great mobile apps requires attention to detail...</p>',
        author: 'DeployPrime Team',
        tags: ['Mobile', 'Flutter', 'React Native'],
        featuredImage: { url: blogPlaceholder, publicId: 'blog2' },
        draft: false,
        publishedAt: new Date()
      }
    ];

    await Blog.insertMany(blogs);
    console.log('✅ Blogs seeded');

    // Seed Site Settings
    const siteSettings = {
      logoUrl: 'https://placehold.co/200x60/1A73E8/white?text=Logo',
      navItems: [
        { label: 'Home', href: '/', order: 1 },
        { label: 'About Us', href: '/about-us', order: 2 },
        { label: 'Services', href: '/services', order: 3 },
        { label: 'Projects', href: '/projects', order: 4 },
        { label: 'Blogs', href: '/blogs', order: 5 },
        { label: 'Get a Quote', href: '/quote', order: 6 },
        { label: 'Contact', href: '/contact', order: 7 }
      ],
      hero: {
        headline: 'Turn your ideas into reality.',
        typedWords: ['Web Dev', 'App Dev', 'UI Design'],
        subText: 'We build digital products that make a difference',
        cards: [
          { role: 'App Developer', tagline: 'Building mobile experiences', avatarUrl: '📱', order: 1 },
          { role: 'Web Developer', tagline: 'Crafting web solutions', avatarUrl: '💻', order: 2 },
          { role: 'Designer', tagline: 'Creating beautiful interfaces', avatarUrl: '🎨', order: 3 }
        ]
      },
      skillIcons: [
        { name: 'Flutter', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', order: 1 },
        { name: 'React', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', order: 2 },
        { name: 'Node.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', order: 3 },
        { name: 'MongoDB', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', order: 4 },
        { name: 'HTML5', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', order: 5 },
        { name: 'CSS3', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', order: 6 }
      ],
      socialLinks: {
        twitter: 'https://twitter.com/deployprime',
        instagram: 'https://instagram.com/deployprime',
        linkedin: 'https://linkedin.com/company/deployprime',
        facebook: 'https://facebook.com/deployprime'
      },
      whatsappNumber: '+1234567890',
      phoneNumber: '+1234567890',
      footer: {
        companyBrief: 'DeployPrime is a freelance agency specializing in web and mobile development.',
        email: 'hello@deployprime.com',
        location: 'San Francisco, CA',
        workingHours: 'Mon-Fri: 9AM-6PM'
      },
      stats: [
        { number: 50, label: 'Projects Completed', suffix: '+', prefix: '', order: 1 },
        { number: 30, label: 'Happy Clients', suffix: '+', prefix: '', order: 2 },
        { number: 5, label: 'Years Experience', suffix: '+', prefix: '', order: 3 },
        { number: 100, label: 'Client Satisfaction', suffix: '%', prefix: '', order: 4 }
      ],
      about: {
        title: 'About Us',
        subtitle: 'We turn your ideas into powerful digital products.',
        mainHeading: 'Building Digital Excellence Since Day One',
        description1: 'DeployPrime is a freelance agency specializing in web development, mobile app development, and UI/UX design. We work with businesses of all sizes to create digital solutions that drive growth and deliver exceptional user experiences.',
        description2: 'Our team combines technical expertise with creative thinking to build products that not only look great but also perform flawlessly. From concept to deployment, we are with you every step of the way.',
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600',
        features: [
          'Expert team with years of experience',
          'Client-focused approach',
          'Modern technologies and best practices',
          'Ongoing support and maintenance'
        ],
        statsHeading: 'Our Achievements',
        statsSubheading: 'Numbers that speak for themselves'
      }
    };

    await SiteSettings.create(siteSettings);
    console.log('✅ Site settings seeded');

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedData();
