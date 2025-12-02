import express from 'express';
import { body, validationResult } from 'express-validator';
import Quote from '../models/Quote.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { sendQuoteNotification } from '../utils/email.js';

const router = express.Router();

// Submit quote (public)
router.post('/', [
  body('name').notEmpty().trim(),
  body('email').isEmail().normalizeEmail(),
  body('message').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const quote = await Quote.create(req.body);
    
    // Send email notification
    try {
      await sendQuoteNotification(quote);
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
    }

    res.status(201).json({ message: 'Quote submitted successfully', quote });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all quotes (admin)
router.get('/', authenticate, async (req, res) => {
  try {
    const status = req.query.status;
    const filter = status ? { status } : {};
    const quotes = await Quote.find(filter).sort({ createdAt: -1 });
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update quote status
router.patch('/:id/status', authenticate, authorize('admin', 'editor'), async (req, res) => {
  try {
    const { status } = req.body;
    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!quote) {
      return res.status(404).json({ error: 'Quote not found' });
    }
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete quote
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const quote = await Quote.findByIdAndDelete(req.params.id);
    if (!quote) {
      return res.status(404).json({ error: 'Quote not found' });
    }
    res.json({ message: 'Quote deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
