import mongoose from 'mongoose';

const contractSchema = new mongoose.Schema({
  // Admin fills these when creating contract
  projectName: {
    type: String,
    required: true
  },
  projectDescription: {
    type: String,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  duration: {
    type: Number,
    required: true
  },
  durationUnit: {
    type: String,
    enum: ['days', 'weeks', 'months'],
    default: 'days'
  },
  paymentSchedule: {
    advance: {
      percentage: { type: Number, required: true },
      amount: Number
    },
    mid: {
      percentage: { type: Number, required: true },
      amount: Number
    },
    final: {
      percentage: { type: Number, required: true },
      amount: Number
    }
  },
  contractTerms: {
    type: String,
    required: true,
    default: `TERMS AND CONDITIONS

1. PROJECT SCOPE
The service provider agrees to deliver the project as described above within the specified timeline.

2. PAYMENT TERMS
- Advance Payment: {advance}% of total amount to be paid before project starts
- Mid Payment: {mid}% to be paid at 50% project completion
- Final Payment: {final}% to be paid upon project completion and delivery

3. TIMELINE
Project will be completed within {duration} {durationUnit} from the advance payment date.

4. REVISIONS
Up to 3 rounds of revisions are included in the project cost.

5. CANCELLATION
If the client cancels the project, advance payment is non-refundable.

6. INTELLECTUAL PROPERTY
Upon full payment, all rights to the deliverables will be transferred to the client.

7. CONFIDENTIALITY
Both parties agree to keep all project information confidential.

8. AGREEMENT
By signing this contract, both parties agree to the terms and conditions stated above.`
  },
  
  // Client fills these when they open the link
  clientName: String,
  clientEmail: String,
  clientPhone: String,
  status: {
    type: String,
    enum: ['pending', 'viewed', 'signed', 'completed', 'expired'],
    default: 'pending'
  },
  signature: {
    type: {
      type: String,
      enum: ['drawn', 'uploaded']
    },
    data: String,
    signedAt: Date,
    ipAddress: String
  },
  shareableToken: {
    type: String,
    required: true,
    unique: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  viewedAt: Date,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate payment amounts before saving
contractSchema.pre('save', function(next) {
  if (this.isModified('totalPrice') || this.isModified('paymentSchedule')) {
    this.paymentSchedule.advance.amount = (this.totalPrice * this.paymentSchedule.advance.percentage) / 100;
    this.paymentSchedule.mid.amount = (this.totalPrice * this.paymentSchedule.mid.percentage) / 100;
    this.paymentSchedule.final.amount = (this.totalPrice * this.paymentSchedule.final.percentage) / 100;
  }
  next();
});

contractSchema.index({ shareableToken: 1 });
contractSchema.index({ status: 1 });
contractSchema.index({ clientEmail: 1 });
contractSchema.index({ expiresAt: 1 });

export default mongoose.model('Contract', contractSchema);
