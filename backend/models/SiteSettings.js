import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema({
  logoUrl: String,
  adminSignature: String, // New field for authorized signature
  stampUrl: String, // New field for stamp image
  theme: { type: String, default: 'neon' }, // 'neon' or 'bw'
  navItems: [{
    label: String,
    href: String,
    order: Number
  }],
  hero: {
    headline: String,
    typedWords: [String],
    subText: String,
    cards: [{
      role: String,
      tagline: String,
      avatarUrl: String,
      order: Number
    }]
  },
  skillIcons: [{
    name: String,
    iconUrl: String,
    order: Number
  }],
  colors: {
    primary: { type: String, default: '#1A73E8' },
    darkNavy: { type: String, default: '#0F1D40' },
    white: { type: String, default: '#FFFFFF' },
    lightBlue: { type: String, default: '#E5F1FF' },
    grey: { type: String, default: '#A7B5D3' }
  },
  socialLinks: {
    twitter: String,
    instagram: String,
    linkedin: String,
    facebook: String
  },
  whatsappNumber: String,
  phoneNumber: String,
  footer: {
    companyBrief: String,
    email: String,
    location: String,
    workingHours: String
  },
  stats: [{
    number: { type: Number, required: true },
    label: { type: String, required: true },
    suffix: { type: String, default: '' },
    prefix: { type: String, default: '' },
    icon: { type: String, default: '' },
    order: { type: Number, default: 0 }
  }],
  about: {
    title: { type: String, default: 'About Us' },
    subtitle: { type: String, default: 'We turn your ideas into powerful digital products.' },
    mainHeading: { type: String, default: 'Building Digital Excellence Since Day One' },
    description1: String,
    description2: String,
    imageUrl: String,
    features: [{ type: String }],
    statsHeading: { type: String, default: 'Our Achievements' },
    statsSubheading: { type: String, default: 'Numbers that speak for themselves' }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('SiteSettings', siteSettingsSchema);
