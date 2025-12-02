# MongoDB Atlas Setup Guide

Complete guide to set up MongoDB Atlas for DeployPrime Portfolio.

## 📋 Your MongoDB Atlas Credentials

Based on your setup:
- **Username**: `primedeploylab_db_user`
- **Password**: `vicky@123` (as shown in your screenshot)
- **IP Address**: `152.59.36.229` (already whitelisted)

## 🚀 Step-by-Step Setup

### Step 1: Complete Database User Creation

You're currently on the "Create a database user" step. Here's what to do:

1. ✅ **Username is set**: `primedeploylab_db_user`
2. ✅ **Password is set**: `vicky@123`
3. Click **"Create Database User"** button
4. Wait for confirmation
5. Click **"Choose a connection method"** button at the bottom

### Step 2: Choose Connection Method

1. Select **"Connect your application"**
2. Choose **Driver**: Node.js
3. Choose **Version**: 5.5 or later (latest)
4. Copy the connection string

### Step 3: Get Your Connection String

Your connection string will look like this:

```
mongodb+srv://primedeploylab_db_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

### Step 4: Update Your Connection String

1. Replace `<password>` with `vicky@123`
2. Add database name `deployprime` before the `?`

**Final connection string format**:
```
mongodb+srv://primedeploylab_db_user:vicky@123@cluster0.xxxxx.mongodb.net/deployprime?retryWrites=true&w=majority&appName=Cluster0
```

**Important**: Replace `cluster0.xxxxx` with your actual cluster address (you'll see this in the connection string MongoDB provides).

### Step 5: Add to Your .env File

1. Open `backend/.env` file
2. Update the `MONGO_URI` line:

```env
MONGO_URI=mongodb+srv://primedeploylab_db_user:vicky@123@cluster0.xxxxx.mongodb.net/deployprime?retryWrites=true&w=majority&appName=Cluster0
```

**Replace `cluster0.xxxxx`** with your actual cluster address!

## 🔒 Security Notes

### IP Whitelist

✅ Your current IP (`152.59.36.229`) is already added.

**For production deployment on Render**, you need to add:
- IP Address: `0.0.0.0/0` (allows all IPs)
- Or get Render's IP addresses and whitelist them

To add more IPs:
1. Go to MongoDB Atlas Dashboard
2. Click **Network Access** in left sidebar
3. Click **"Add IP Address"**
4. Enter `0.0.0.0/0` for all access (or specific IPs)
5. Click **"Confirm"**

### Password Security

⚠️ **Important**: Your password `vicky@123` contains special characters. In the connection string:
- `@` symbol needs to be URL-encoded as `%40`
- So `vicky@123` becomes `vicky%40123`

**Updated connection string**:
```
mongodb+srv://primedeploylab_db_user:vicky%40123@cluster0.xxxxx.mongodb.net/deployprime?retryWrites=true&w=majority&appName=Cluster0
```

## 🧪 Testing Your Connection

### Method 1: Using Node.js Script

Create a test file `test-connection.js`:

```javascript
const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://primedeploylab_db_user:vicky%40123@cluster0.xxxxx.mongodb.net/deployprime?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  });
```

Run it:
```bash
cd backend
node test-connection.js
```

### Method 2: Using MongoDB Compass

1. Download MongoDB Compass: https://www.mongodb.com/products/compass
2. Open Compass
3. Paste your connection string
4. Click "Connect"
5. You should see your `deployprime` database

### Method 3: Start Your Backend

```bash
cd backend
npm install
npm run dev
```

Look for: `✅ Connected to MongoDB`

## 🔧 Troubleshooting

### Error: "Authentication failed"

**Solution**: URL-encode your password
- Change `vicky@123` to `vicky%40123` in the connection string

### Error: "IP not whitelisted"

**Solution**: Add your IP to Network Access
1. Go to Network Access in Atlas
2. Add your current IP or `0.0.0.0/0`

### Error: "Could not connect to any servers"

**Solutions**:
1. Check your internet connection
2. Verify cluster is running (not paused)
3. Check firewall settings
4. Verify connection string is correct

### Error: "Server selection timeout"

**Solutions**:
1. Check if cluster is active
2. Verify IP whitelist
3. Check DNS resolution
4. Try different network (VPN might block)

## 📝 Complete .env Example

Here's your complete `backend/.env` file:

```env
PORT=5000
NODE_ENV=development

# MongoDB Atlas
MONGO_URI=mongodb+srv://primedeploylab_db_user:vicky%40123@cluster0.xxxxx.mongodb.net/deployprime?retryWrites=true&w=majority&appName=Cluster0

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# SMTP (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password

# Admin Default
ADMIN_DEFAULT_EMAIL=admin@deployprime.com
ADMIN_DEFAULT_PASSWORD=Admin@123456

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

## 🎯 Next Steps After Connection

Once connected successfully:

1. **Create Admin User**:
   ```bash
   cd backend
   npm run create-admin
   ```

2. **Seed Sample Data** (optional):
   ```bash
   npm run seed
   ```

3. **Start Development**:
   ```bash
   npm run dev
   ```

4. **Verify in Atlas**:
   - Go to MongoDB Atlas Dashboard
   - Click "Browse Collections"
   - You should see `deployprime` database
   - With collections: users, projects, blogs, services, etc.

## 🌐 For Production (Render Deployment)

When deploying to Render:

1. **Update IP Whitelist**:
   - Add `0.0.0.0/0` in Network Access

2. **Use Same Connection String**:
   - Add as environment variable in Render
   - Name: `MONGO_URI`
   - Value: Your full connection string

3. **Security Best Practices**:
   - Use strong passwords
   - Limit IP access if possible
   - Enable MongoDB Atlas monitoring
   - Set up backup schedule

## 📞 Need Help?

### MongoDB Atlas Support
- Documentation: https://docs.atlas.mongodb.com/
- Support: https://support.mongodb.com/

### Common Issues
- Check FAQ.md in project root
- Review error logs carefully
- Verify all credentials
- Test connection with MongoDB Compass first

## ✅ Checklist

Before proceeding:
- [ ] Database user created (`primedeploylab_db_user`)
- [ ] Password copied (`vicky@123` → URL-encoded as `vicky%40123`)
- [ ] IP address whitelisted (`152.59.36.229`)
- [ ] Connection string obtained from Atlas
- [ ] Connection string updated in `backend/.env`
- [ ] Password URL-encoded in connection string
- [ ] Database name added (`deployprime`)
- [ ] Connection tested successfully
- [ ] Admin user created
- [ ] Sample data seeded (optional)

---

**You're on Step 1 of 3 in the Atlas setup. Complete the database user creation, then proceed to get your connection string!**
