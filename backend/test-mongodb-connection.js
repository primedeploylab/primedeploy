#!/usr/bin/env node

/**
 * MongoDB Atlas Connection Test Script
 * 
 * This script tests your MongoDB Atlas connection.
 * Run: node test-mongodb-connection.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

console.log('🔍 Testing MongoDB Atlas Connection...\n');

if (!MONGO_URI) {
  console.error('❌ Error: MONGO_URI not found in .env file');
  console.log('\n📝 Please add MONGO_URI to your backend/.env file:');
  console.log('MONGO_URI=mongodb+srv://primedeploylab_db_user:vicky%40123@YOUR_CLUSTER/deployprime?retryWrites=true&w=majority&appName=Cluster0\n');
  console.log('📖 See MONGODB_ATLAS_SETUP.md for detailed instructions');
  process.exit(1);
}

console.log('📋 Connection Details:');
console.log('   URI:', MONGO_URI.replace(/:[^:@]+@/, ':****@')); // Hide password
console.log('');

// Test connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ SUCCESS! Connected to MongoDB Atlas\n');
    console.log('📊 Connection Info:');
    console.log('   Database:', mongoose.connection.db.databaseName);
    console.log('   Host:', mongoose.connection.host);
    console.log('   Port:', mongoose.connection.port || 'default');
    console.log('');
    console.log('🎉 Your MongoDB Atlas is configured correctly!');
    console.log('');
    console.log('📝 Next Steps:');
    console.log('   1. Create admin user: npm run create-admin');
    console.log('   2. Seed sample data: npm run seed');
    console.log('   3. Start server: npm run dev');
    console.log('');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ FAILED! Could not connect to MongoDB Atlas\n');
    console.error('Error:', err.message);
    console.log('');
    console.log('🔧 Troubleshooting:');
    
    if (err.message.includes('authentication failed')) {
      console.log('   → Check your password is URL-encoded');
      console.log('   → vicky@123 should be vicky%40123');
      console.log('   → See MONGODB_CREDENTIALS.md');
    } else if (err.message.includes('IP') || err.message.includes('whitelist')) {
      console.log('   → Add your IP to Network Access in MongoDB Atlas');
      console.log('   → Or add 0.0.0.0/0 for all IPs');
    } else if (err.message.includes('ENOTFOUND') || err.message.includes('timeout')) {
      console.log('   → Check your cluster address is correct');
      console.log('   → Verify internet connection');
      console.log('   → Check if cluster is running in Atlas');
    } else {
      console.log('   → Verify connection string format');
      console.log('   → Check MONGODB_ATLAS_SETUP.md for help');
    }
    
    console.log('');
    console.log('📖 Full Setup Guide: MONGODB_ATLAS_SETUP.md');
    console.log('📋 Quick Reference: MONGODB_CREDENTIALS.md');
    console.log('');
    process.exit(1);
  });

// Handle connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('\nMongoDB connection closed');
  process.exit(0);
});
