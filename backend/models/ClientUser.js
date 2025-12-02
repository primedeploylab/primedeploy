import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const clientUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    unique: true,
    sparse: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  passwordHistory: [{
    hash: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isApproved: {
    type: Boolean,
    default: false
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

clientUserSchema.index({ email: 1 });
clientUserSchema.index({ phone: 1 });
clientUserSchema.index({ isApproved: 1 });

clientUserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

clientUserSchema.methods.addPasswordToHistory = async function(password) {
  const hash = await bcrypt.hash(password, 10);
  this.passwordHistory.unshift({ hash });
  // Keep only last 3 passwords
  if (this.passwordHistory.length > 3) {
    this.passwordHistory = this.passwordHistory.slice(0, 3);
  }
};

clientUserSchema.statics.hashPassword = async function(password) {
  return bcrypt.hash(password, 10);
};

export default mongoose.model('ClientUser', clientUserSchema);
