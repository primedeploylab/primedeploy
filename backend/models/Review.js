import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  clientUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClientUser',
    required: true
  },
  clientName: {
    type: String,
    required: true
  },
  projectName: {
    type: String,
    required: false
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: false
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  reviewText: {
    type: String,
    required: true,
    maxlength: 1000
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: Date,
  rejectionReason: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

reviewSchema.index({ project: 1 });
reviewSchema.index({ clientUser: 1 });
reviewSchema.index({ isApproved: 1 });
reviewSchema.index({ rating: 1 });

export default mongoose.model('Review', reviewSchema);
