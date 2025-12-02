import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  excerpt: String,
  content: String,
  author: String,
  tags: [String],
  featuredImage: {
    url: String,
    publicId: String
  },
  seoMeta: {
    title: String,
    description: String,
    ogImage: String
  },
  draft: {
    type: Boolean,
    default: true
  },
  publishedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

blogSchema.index({ slug: 1 });
blogSchema.index({ draft: 1 });
blogSchema.index({ publishedAt: -1 });

export default mongoose.model('Blog', blogSchema);
