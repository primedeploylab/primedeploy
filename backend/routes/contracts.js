import express from 'express';
import { body, validationResult } from 'express-validator';
import Contract from '../models/Contract.js';
import { authenticate, authorize } from '../middleware/auth.js';
import crypto from 'crypto';

const router = express.Router();

// Admin: Create contract (only project details, client fills info later)
router.post('/', authenticate, authorize('admin', 'editor'), [
  body('projectName').notEmpty().withMessage('Project name is required'),
  body('projectDescription').notEmpty().withMessage('Project description is required'),
  body('totalPrice').isNumeric().withMessage('Total price must be a number'),
  body('duration').isInt({ min: 1 }).withMessage('Duration must be at least 1'),
  body('paymentSchedule.advance.percentage').isInt({ min: 0, max: 100 }),
  body('paymentSchedule.mid.percentage').isInt({ min: 0, max: 100 }),
  body('paymentSchedule.final.percentage').isInt({ min: 0, max: 100 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Validate payment percentages add up to 100
    const { advance, mid, final } = req.body.paymentSchedule;
    if (advance.percentage + mid.percentage + final.percentage !== 100) {
      return res.status(400).json({ 
        error: 'Payment percentages must add up to 100%' 
      });
    }

    // Generate unique shareable token
    const shareableToken = crypto.randomBytes(32).toString('hex');
    
    // Set expiry to 30 days from now
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    // Get default contract terms or use provided ones
    let contractTerms = req.body.contractTerms;
    if (!contractTerms) {
      // Use default template
      contractTerms = `TERMS AND CONDITIONS

1. PROJECT SCOPE
The service provider agrees to deliver the project as described above within the specified timeline.

2. PAYMENT TERMS
- Advance Payment: ${advance.percentage}% of total amount to be paid before project starts
- Mid Payment: ${mid.percentage}% to be paid at 50% project completion
- Final Payment: ${final.percentage}% to be paid upon project completion and delivery

3. TIMELINE
Project will be completed within ${req.body.duration} ${req.body.durationUnit || 'days'} from the advance payment date.

4. REVISIONS
Up to 3 rounds of revisions are included in the project cost.

5. CANCELLATION
If the client cancels the project, advance payment is non-refundable.

6. INTELLECTUAL PROPERTY
Upon full payment, all rights to the deliverables will be transferred to the client.

7. CONFIDENTIALITY
Both parties agree to keep all project information confidential.

8. AGREEMENT
By signing this contract, both parties agree to the terms and conditions stated above.`;
    }

    const contract = await Contract.create({
      projectName: req.body.projectName,
      projectDescription: req.body.projectDescription,
      totalPrice: req.body.totalPrice,
      currency: req.body.currency || 'USD',
      duration: req.body.duration,
      durationUnit: req.body.durationUnit || 'days',
      paymentSchedule: req.body.paymentSchedule,
      contractTerms,
      shareableToken,
      expiresAt,
      createdBy: req.user._id,
      status: 'pending'
    });

    const shareableUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/contract/${shareableToken}`;

    res.status(201).json({
      message: 'Contract created successfully',
      contract,
      shareableUrl
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Get all contracts
router.get('/admin', authenticate, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    
    const contracts = await Contract.find(filter)
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name email');
    
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Public: Get contract by token (for client viewing)
router.get('/:token', async (req, res) => {
  try {
    const contract = await Contract.findOne({ shareableToken: req.params.token });
    
    if (!contract) {
      return res.status(404).json({ error: 'Contract not found' });
    }

    // Check if expired
    if (new Date() > contract.expiresAt) {
      contract.status = 'expired';
      await contract.save();
      return res.status(410).json({ error: 'Contract has expired' });
    }

    // Update viewed status on first view
    if (contract.status === 'pending' && !contract.viewedAt) {
      contract.status = 'viewed';
      contract.viewedAt = new Date();
      await contract.save();
    }

    res.json(contract);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Public: Client fills details and signs contract
router.post('/:token/sign', [
  body('clientName').notEmpty().withMessage('Name is required'),
  body('clientEmail').isEmail().withMessage('Valid email is required'),
  body('clientPhone').notEmpty().withMessage('Phone is required'),
  body('signature.type').isIn(['drawn', 'uploaded']).withMessage('Invalid signature type'),
  body('signature.data').notEmpty().withMessage('Signature is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const contract = await Contract.findOne({ shareableToken: req.params.token });
    
    if (!contract) {
      return res.status(404).json({ error: 'Contract not found' });
    }

    if (contract.status === 'signed') {
      return res.status(400).json({ error: 'Contract already signed' });
    }

    if (new Date() > contract.expiresAt) {
      return res.status(410).json({ error: 'Contract has expired' });
    }

    // Update contract with client details and signature
    contract.clientName = req.body.clientName;
    contract.clientEmail = req.body.clientEmail;
    contract.clientPhone = req.body.clientPhone;
    contract.signature = {
      type: req.body.signature.type,
      data: req.body.signature.data,
      signedAt: new Date(),
      ipAddress: req.ip || req.connection.remoteAddress
    };
    contract.status = 'signed';
    await contract.save();

    res.json({ 
      message: 'Contract signed successfully!',
      contract: {
        projectName: contract.projectName,
        clientName: contract.clientName,
        signedAt: contract.signature.signedAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Update contract
router.put('/:id', authenticate, authorize('admin', 'editor'), async (req, res) => {
  try {
    const contract = await Contract.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    
    if (!contract) {
      return res.status(404).json({ error: 'Contract not found' });
    }
    
    res.json(contract);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Delete contract
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const contract = await Contract.findByIdAndDelete(req.params.id);
    
    if (!contract) {
      return res.status(404).json({ error: 'Contract not found' });
    }
    
    res.json({ message: 'Contract deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
