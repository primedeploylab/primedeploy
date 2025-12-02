import express from 'express';
import { body, validationResult } from 'express-validator';
import Review from '../models/Review.js';
import ClientUser from '../models/ClientUser.js';
import Project from '../models/Project.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Middleware to authenticate client users
const authenticateClient = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const jwt = await import('jsonwebtoken');
    const decoded = jwt.default.verify(token, process.env.JWT_SECRET);
    const clientUser = await ClientUser.findById(decoded.userId);

    if (!clientUser) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.clientUser = clientUser;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Public: Get approved reviews (only shows name and project, not email)
router.get('/', async (req, res) => {
  try {
    const { projectId } = req.query;
    const filter = { isApproved: true };

    if (projectId) {
      filter.project = projectId;
    }

    const reviews = await Review.find(filter)
      .populate('project', 'title slug')
      .select('clientName rating reviewText project projectName createdAt')  // Only return necessary fields
      .sort({ createdAt: -1 });

    if (!reviews) {
      return res.json({ reviews: [], stats: { total: 0, averageRating: 0 } });
    }

    // Calculate overall rating
    const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 0;

    res.json({
      reviews,
      stats: {
        total: reviews.length,
        averageRating: parseFloat(averageRating)
      }
    });
  } catch (error) {
    console.error('Error in GET /reviews:', error);
    res.status(500).json({ error: error.message });
  }
});

// Client: Submit review
router.post('/', authenticateClient, [
  body('rating').isInt({ min: 1, max: 5 }),
  body('reviewText').notEmpty().isLength({ max: 1000 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if project exists (if provided)
    if (req.body.project) {
      const project = await Project.findById(req.body.project);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      // Check if user already reviewed this project
      const existingReview = await Review.findOne({
        clientUser: req.clientUser._id,
        project: req.body.project
      });

      if (existingReview) {
        return res.status(400).json({ error: 'You have already reviewed this project' });
      }
    }

    const review = await Review.create({
      ...req.body,
      clientUser: req.clientUser._id,
      clientName: req.clientUser.name  // Automatically use client's name
    });

    const populatedReview = await Review.findById(review._id)
      .populate('clientUser', 'name')
      .populate('project', 'title');

    res.status(201).json({
      message: 'Review submitted successfully. Awaiting admin approval.',
      review: populatedReview
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Get all reviews (including pending)
router.get('/admin', authenticate, async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};

    if (status === 'pending') {
      filter.isApproved = false;
    } else if (status === 'approved') {
      filter.isApproved = true;
    }

    const reviews = await Review.find(filter)
      .populate('clientUser', 'name email phone')
      .populate('project', 'title slug')
      .populate('approvedBy', 'name')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Approve review
router.patch('/:id/approve', authenticate, authorize('admin', 'editor'), async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      {
        isApproved: true,
        approvedBy: req.user._id,
        approvedAt: new Date()
      },
      { new: true }
    ).populate('clientUser', 'name')
      .populate('project', 'title');

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Reject review
router.patch('/:id/reject', authenticate, authorize('admin', 'editor'), [
  body('rejectionReason').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      {
        isApproved: false,
        rejectionReason: req.body.rejectionReason
      },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Delete review
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
