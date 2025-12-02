import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  shortDesc: String,
  details: String,
  icon: String,
  deliverables: [String],
  priceEstimate: String,
  order: {
    type: Number,
    default: 0
  },
  published: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

serviceSchema.index({ slug: 1 });
serviceSchema.index({ order: 1 });

export default mongoose.model('Service', serviceSchema);
