import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: String,
  projectType: String,
  message: String,
  budget: String,
  files: [{
    url: String,
    publicId: String
  }],
  status: {
    type: String,
    enum: ['new', 'in-progress', 'closed'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

quoteSchema.index({ status: 1 });
quoteSchema.index({ createdAt: -1 });

export default mongoose.model('Quote', quoteSchema);
