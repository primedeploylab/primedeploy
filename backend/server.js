import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import routes
import authRoutes from './routes/auth.js';
import siteSettingsRoutes from './routes/siteSettings.js';
import servicesRoutes from './routes/services.js';
import projectsRoutes from './routes/projects.js';
import blogsRoutes from './routes/blogs.js';
import quotesRoutes from './routes/quotes.js';
import uploadRoutes from './routes/upload.js';
import publicRoutes from './routes/public.js';
import contractsRoutes from './routes/contracts.js';
import reviewsRoutes from './routes/reviews.js';
import clientAuthRoutes from './routes/clientAuth.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    // Allow any localhost port in development and ngrok urls
    if (!origin || origin.startsWith('http://localhost:') || origin.endsWith('.ngrok-free.app')) {
      callback(null, true);
    } else {
      callback(null, process.env.FRONTEND_URL || 'http://localhost:5173');
    }
  },
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 1000 // limit each IP to 1000 requests per minute
});
app.use('/api/', limiter);

// Body parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/site-settings', siteSettingsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/blogs', blogsRoutes);
app.use('/api/quotes', quotesRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/contracts', contractsRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/client-auth', clientAuthRoutes);
app.use('/api', publicRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from frontend build
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
  // Handle React routing - return index.html for all non-API routes
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    }
  });
}

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Connect to MongoDB and start server
// Auto-seed default data
const autoSeed = async () => {
  const Service = (await import('./models/Service.js')).default;
  const Project = (await import('./models/Project.js')).default;
  const SiteSettings = (await import('./models/SiteSettings.js')).default;

  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    await Service.insertMany([
      { title: 'Web Development', slug: 'web-development', shortDesc: 'Custom websites', details: 'Full-stack web development', deliverables: ['Responsive Design'], icon: '🌐', order: 1, published: true },
      { title: 'App Development', slug: 'app-development', shortDesc: 'Mobile applications', details: 'iOS and Android apps', deliverables: ['Cross-platform Apps'], icon: '📱', order: 2, published: true },
      { title: 'UI/UX Design', slug: 'ui-ux-design', shortDesc: 'Beautiful interfaces', details: 'User-centered design', deliverables: ['Wireframes'], icon: '🎨', order: 3, published: true },
      { title: 'Bug Fixing', slug: 'bug-fixing', shortDesc: 'Quick bug fixes', details: 'Identify and fix bugs', deliverables: ['Bug Analysis'], icon: '🐛', order: 4, published: true },
      { title: 'Maintenance', slug: 'maintenance', shortDesc: 'Ongoing support', details: 'Keep apps running smoothly', deliverables: ['Regular Updates'], icon: '🔧', order: 5, published: true },
      { title: 'Redesign & Upgrade', slug: 'redesign-upgrade', shortDesc: 'Modernize apps', details: 'Upgrade with modern tech', deliverables: ['Modern UI/UX'], icon: '✨', order: 6, published: true }
    ]);
    console.log('✅ Default services added');
  }
};

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    await autoSeed();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

export default app;
