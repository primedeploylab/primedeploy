# MongoDB Atlas - Quick Reference

## 🔑 Your Credentials

**Database User**:
- Username: `primedeploylab_db_user`
- Password: `vicky@123`
- Password (URL-encoded): `vicky%40123`

**Network Access**:
- Whitelisted IP: `152.59.36.229`
- For production: Add `0.0.0.0/0`

**Database Name**: `deployprime`

## 📋 Connection String

### Format
```
mongodb+srv://primedeploylab_db_user:vicky%40123@<CLUSTER_ADDRESS>/deployprime?retryWrites=true&w=majority&appName=Cluster0
```

### Where to Get Cluster Address
1. Go to MongoDB Atlas Dashboard
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Look for the part like: `cluster0.abc123.mongodb.net`

### Example (Replace cluster address)
```
mongodb+srv://primedeploylab_db_user:vicky%40123@cluster0.abc123.mongodb.net/deployprime?retryWrites=true&w=majority&appName=Cluster0
```

## 🚀 Quick Setup

### 1. Get Your Cluster Address
- Login to MongoDB Atlas
- Find your cluster address in the connection string

### 2. Update backend/.env
```env
MONGO_URI=mongodb+srv://primedeploylab_db_user:vicky%40123@YOUR_CLUSTER_ADDRESS/deployprime?retryWrites=true&w=majority&appName=Cluster0
```

### 3. Test Connection
```bash
cd backend
npm install
npm run dev
```

Look for: `✅ Connected to MongoDB`

## ⚠️ Important Notes

### URL Encoding
Your password contains `@` which must be encoded:
- Original: `vicky@123`
- Encoded: `vicky%40123`

Always use the encoded version in connection strings!

### IP Whitelist
**Current**: `152.59.36.229` (your local IP)

**For Render deployment**, add:
1. Go to Network Access in Atlas
2. Click "Add IP Address"
3. Enter: `0.0.0.0/0`
4. Click "Confirm"

### Security
- ✅ Keep credentials secure
- ✅ Don't commit `.env` to Git
- ✅ Use environment variables in production
- ✅ Consider changing password for production

## 🔧 Troubleshooting

### "Authentication failed"
→ Check password is URL-encoded: `vicky%40123`

### "IP not whitelisted"
→ Add `0.0.0.0/0` to Network Access in Atlas

### "Could not connect"
→ Verify cluster address is correct

### "Server selection timeout"
→ Check internet connection and firewall

## 📞 Next Steps

1. ✅ Complete database user creation in Atlas
2. ✅ Get your cluster address
3. ✅ Update `backend/.env` with connection string
4. ✅ Test connection: `npm run dev`
5. ✅ Create admin user: `npm run create-admin`
6. ✅ Seed data: `npm run seed` (optional)

## 📚 More Help

- **Detailed Setup**: See `MONGODB_ATLAS_SETUP.md`
- **Deployment**: See `DEPLOYMENT.md`
- **FAQ**: See `FAQ.md`

---

**⚡ Quick Copy-Paste**

```env
# Add this to backend/.env (replace YOUR_CLUSTER_ADDRESS)
MONGO_URI=mongodb+srv://primedeploylab_db_user:vicky%40123@YOUR_CLUSTER_ADDRESS/deployprime?retryWrites=true&w=majority&appName=Cluster0
```

**Remember**: Replace `YOUR_CLUSTER_ADDRESS` with your actual cluster address from MongoDB Atlas!
