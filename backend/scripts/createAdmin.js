import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const email = process.env.ADMIN_DEFAULT_EMAIL || 'admin@deployprime.com';
    const password = process.env.ADMIN_DEFAULT_PASSWORD || 'Admin@123456';

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    const passwordHash = await User.hashPassword(password);
    const admin = await User.create({
      name: 'Admin',
      email,
      passwordHash,
      role: 'admin'
    });

    console.log('✅ Admin user created successfully');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('⚠️  Please change the password after first login');

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
