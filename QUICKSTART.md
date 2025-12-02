# Quick Start Guide

Get DeployPrime portfolio running in 5 minutes!

## Step 1: Clone & Install (2 min)

```bash
# Clone the repository
git clone <your-repo-url>
cd deployprime-portfolio

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Step 2: Setup Environment (1 min)

### Backend `.env`

Create `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/deployprime
JWT_SECRET=your-secret-key-at-least-32-characters-long
CLOUDINARY_CLOUD_NAME=demo
CLOUDINARY_API_KEY=demo
CLOUDINARY_API_SECRET=demo
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_DEFAULT_EMAIL=admin@deployprime.com
ADMIN_DEFAULT_PASSWORD=Admin@123456
FRONTEND_URL=http://localhost:5173
```

### Frontend `.env`

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Step 3: Start MongoDB (Local Development)

### Option A: MongoDB Atlas (Recommended)

**If you have Atlas credentials** (from your screenshot):
```env
MONGO_URI=mongodb+srv://primedeploylab_db_user:vicky%40123@cluster0.xxxxx.mongodb.net/deployprime?retryWrites=true&w=majority&appName=Cluster0
```
Replace `cluster0.xxxxx` with your actual cluster address.

**Note**: Password `vicky@123` is URL-encoded as `vicky%40123` (@ becomes %40)

**If setting up fresh**:
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (for all access)
5. Get connection string
6. Update `MONGO_URI` in backend `.env`

📖 **See MONGODB_ATLAS_SETUP.md for detailed instructions**

### Option B: Local MongoDB
```bash
# Install MongoDB locally
# macOS
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Use local connection string
MONGO_URI=mongodb://localhost:27017/deployprime
```

## Step 4: Initialize Database (1 min)

```bash
cd backend

# Create admin user
npm run create-admin

# Add sample data (optional)
npm run seed
```

## Step 5: Start Development Servers (1 min)

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

Backend runs on http://localhost:5000

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

Frontend runs on http://localhost:5173

## Step 6: Access the Application

### Public Website
Open http://localhost:5173

### Admin Panel
1. Go to http://localhost:5173/admin/login
2. Login with:
   - Email: `admin@deployprime.com`
   - Password: `Admin@123456`

## Next Steps

1. **Change Admin Password**: First thing after login!
2. **Add Your Content**: Projects, blogs, services
3. **Upload Images**: Use Cloudinary integration
4. **Customize Settings**: Hero text, footer, contact info
5. **Test Everything**: Forms, navigation, responsiveness

## Common Issues

### "Cannot connect to MongoDB"
- Make sure MongoDB is running
- Check connection string in `.env`
- For Atlas: whitelist your IP

### "Port already in use"
- Backend: Change `PORT` in `.env`
- Frontend: Change port in `vite.config.js`

### "Module not found"
- Run `npm install` in both directories
- Delete `node_modules` and reinstall

### "Cloudinary upload fails"
- Get real credentials from https://cloudinary.com
- Update `.env` with your credentials

## Development Tips

### Hot Reload
Both frontend and backend support hot reload. Changes are reflected immediately.

### API Testing
Use the health endpoint to verify backend:
```bash
curl http://localhost:5000/health
```

### Database GUI
Use MongoDB Compass to view your data:
- Download: https://www.mongodb.com/products/compass
- Connect to: `mongodb://localhost:27017`

### Clear Database
```bash
cd backend
node -e "require('mongoose').connect(process.env.MONGO_URI).then(() => mongoose.connection.dropDatabase())"
npm run seed
```

## Production Deployment

When ready to deploy, follow the complete guide in `DEPLOYMENT.md`.

Quick deploy to Render:
1. Push code to GitHub
2. Create Render account
3. Deploy backend (Web Service)
4. Deploy frontend (Static Site)
5. Update environment variables

---

Need help? Check README.md for detailed documentation!
