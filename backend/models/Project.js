import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
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
  description: String,
  images: [{
    url: String,
    publicId: String
  }],
  tech: [String],
  category: String,
  clientName: String,
  websiteUrl: String,
  githubUrl: String,
  playStoreUrl: String,
  appStoreUrl: String,
  timeTaken: String,
  caseStudy: String,
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

projectSchema.index({ slug: 1 });
projectSchema.index({ order: 1 });
projectSchema.index({ published: 1 });

export default mongoose.model('Project', projectSchema);
