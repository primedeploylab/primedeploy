import express from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import ClientUser from '../models/ClientUser.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Client: Register
router.post('/register', [
  body('name').notEmpty().trim(),
  body('password').isLength({ min: 6 }),
  body('email').optional().isEmail().normalizeEmail(),
  body('phone').optional().isMobilePhone()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, phone, password } = req.body;

    // Check if at least email or phone is provided
    if (!email && !phone) {
      return res.status(400).json({ error: 'Email or phone number is required' });
    }

    // Check if user already exists
    const existingUser = await ClientUser.findOne({
      $or: [
        ...(email ? [{ email }] : []),
        ...(phone ? [{ phone }] : [])
      ]
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email or phone' });
    }

    const passwordHash = await ClientUser.hashPassword(password);

    const clientUser = await ClientUser.create({
      name,
      email,
      phone,
      passwordHash,
      passwordHistory: [{ hash: passwordHash }]
    });

    res.status(201).json({
      message: 'Registration successful. Awaiting admin approval.',
      user: {
        id: clientUser._id,
        name: clientUser.name,
        email: clientUser.email,
        phone: clientUser.phone,
        isApproved: clientUser.isApproved
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Client: Login
router.post('/login', [
  body('password').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, phone, password } = req.body;

    if (!email && !phone) {
      return res.status(400).json({ error: 'Email or phone number is required' });
    }

    const clientUser = await ClientUser.findOne({
      $or: [
        ...(email ? [{ email }] : []),
        ...(phone ? [{ phone }] : [])
      ]
    });

    if (!clientUser || !(await clientUser.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // if (!clientUser.isApproved) {
    //   return res.status(403).json({ error: 'Your account is pending admin approval' });
    // }

    const token = jwt.sign(
      { userId: clientUser._id, type: 'client' },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      token,
      user: {
        id: clientUser._id,
        name: clientUser.name,
        email: clientUser.email,
        phone: clientUser.phone
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Client: Forgot password (using password history)
router.post('/forgot-password', [
  body('oldPassword').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, phone, oldPassword, newPassword } = req.body;

    if (!email && !phone) {
      return res.status(400).json({ error: 'Email or phone number is required' });
    }

    const clientUser = await ClientUser.findOne({
      $or: [
        ...(email ? [{ email }] : []),
        ...(phone ? [{ phone }] : [])
      ]
    });

    if (!clientUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if old password matches any of the last 3 passwords
    let isOldPasswordValid = false;
    for (const historyEntry of clientUser.passwordHistory) {
      if (await import('bcryptjs').then(bcrypt => bcrypt.default.compare(oldPassword, historyEntry.hash))) {
        isOldPasswordValid = true;
        break;
      }
    }

    if (!isOldPasswordValid) {
      return res.status(401).json({ error: 'Old password does not match any of your previous passwords' });
    }

    // Update password
    const newPasswordHash = await ClientUser.hashPassword(newPassword);
    clientUser.passwordHash = newPasswordHash;
    await clientUser.addPasswordToHistory(newPassword);
    await clientUser.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Get all client users
router.get('/admin/users', authenticate, async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};

    if (status === 'pending') {
      filter.isApproved = false;
    } else if (status === 'approved') {
      filter.isApproved = true;
    }

    const users = await ClientUser.find(filter)
      .select('-passwordHash -passwordHistory')
      .populate('approvedBy', 'name')
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Approve client user
router.patch('/admin/users/:id/approve', authenticate, authorize('admin', 'editor'), async (req, res) => {
  try {
    const user = await ClientUser.findByIdAndUpdate(
      req.params.id,
      {
        isApproved: true,
        approvedBy: req.user._id,
        approvedAt: new Date()
      },
      { new: true }
    ).select('-passwordHash -passwordHistory');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Reject/Delete client user
router.delete('/admin/users/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const user = await ClientUser.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
