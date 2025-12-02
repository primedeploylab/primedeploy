import express from 'express';
import SiteSettings from '../models/SiteSettings.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get site settings (public)
router.get('/', async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update site settings (admin only)
router.put('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    settings.updatedAt = Date.now();
    await settings.save();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
