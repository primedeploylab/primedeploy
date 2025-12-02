# 🚀 Quick Start Guide - Advanced Features

Get up and running with the advanced features in 5 minutes!

## Prerequisites

- Node.js installed (v16 or higher)
- MongoDB Atlas account with connection string
- Git (optional)

## Step 1: Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Step 2: Configure Environment

### Backend Configuration

Create or update `backend/.env`:

```env
# MongoDB
MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/deployprime?retryWrites=true&w=majority

# JWT Secret (use a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this

# Server
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Email (optional - for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Frontend Configuration

Create or update `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Step 3: Create Admin Account

```bash
cd backend
node scripts/createAdmin.js
```

Follow the prompts to create your admin account.

## Step 4: Start the Servers

### Option A: Using the Batch Script (Windows)

Double-click `START_SERVERS.bat` in the root directory.

### Option B: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Step 5: Access the Application

- **Frontend:** http://localhost:5173
- **Admin Panel:** http://localhost:5173/admin/login
- **Backend API:** http://localhost:5000

## 🎯 Quick Feature Tour

### 1. Admin Login (30 seconds)

1. Go to http://localhost:5173/admin/login
2. Login with your admin credentials
3. You'll see the dashboard with new menu items:
   - Contracts
   - Reviews
   - Client Users

### 2. Create a Contract (2 minutes)

1. Click "Contracts" from dashboard
2. Click "Create New Contract"
3. Fill in:
   - Client Name: John Doe
   - Client Email: john@example.com
   - Project Title: Website Development
   - Price Range: $5000 - $10000
   - Timeline: 4-6 weeks
   - Terms: (use default or customize)
4. Click "Create Contract"
5. Copy the shareable link

### 3. Sign the Contract (1 minute)

1. Open the shareable link in a new tab
2. Review the contract details
3. Choose "Draw Signature"
4. Draw your signature with mouse
5. Check the agreement box
6. Click "Sign Contract"
7. Success! ✅

### 4. Client Registration (1 minute)

1. Go to http://localhost:5173/client/register
2. Fill in:
   - Name: Jane Smith
   - Email: jane@example.com
   - Phone: +1234567890
   - Password: SecurePass123!
3. Submit
4. You'll see "Awaiting admin approval"

### 5. Approve Client (30 seconds)

1. Back in admin panel, click "Client Users"
2. Find Jane Smith (status: pending)
3. Click "Approve"
4. Status changes to "Approved" ✅

### 6. Submit a Review (1 minute)

1. Go to http://localhost:5173/client/login
2. Login as Jane Smith
3. Go to home page
4. Click "Leave a Review"
5. Fill in:
   - Rating: 5 stars
   - Review: "Excellent service!"
6. Submit

### 7. Approve Review (30 seconds)

1. In admin panel, click "Reviews"
2. Find Jane's review (status: pending)
3. Click "Approve"
4. Review is now approved ✅

### 8. View Reviews on Home Page (10 seconds)

1. Go to http://localhost:5173
2. Scroll to "What Our Clients Say"
3. See Jane's review in the carousel
4. Watch it auto-slide every 5 seconds
5. Try pause/play controls

## 🎉 You're Done!

You've successfully:
- ✅ Set up the application
- ✅ Created and signed a contract
- ✅ Registered and approved a client
- ✅ Submitted and approved a review
- ✅ Viewed the review carousel

## 📚 Next Steps

- Read `ADVANCED_FEATURES.md` for detailed feature documentation
- Check `TESTING_ADVANCED_FEATURES.md` for comprehensive testing
- Review `IMPLEMENTATION_COMPLETE.md` for technical details
- Explore the admin panel features
- Customize contract templates
- Add more reviews and contracts

## 🐛 Troubleshooting

### Can't connect to MongoDB?
- Check your `MONGO_URI` in `backend/.env`
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify username and password are correct

### Frontend can't reach backend?
- Make sure backend is running on port 5000
- Check `VITE_API_URL` in `frontend/.env`
- Look for CORS errors in browser console

### Signature canvas not working?
- Clear browser cache
- Try a different browser
- Check console for errors

### Reviews not showing?
- Make sure reviews are approved by admin
- Check that reviews have `isPublic: true`
- Verify API endpoint is working

## 💡 Tips

- Use Chrome DevTools to inspect API calls
- Check backend console for detailed error logs
- MongoDB Compass is great for viewing database
- Postman collection included for API testing
- Keep both servers running while developing

## 🆘 Need Help?

1. Check the documentation files
2. Review browser console for errors
3. Check backend logs for API errors
4. Verify all environment variables
5. Ensure MongoDB connection is working

---

**Happy Building! 🚀**

*Estimated setup time: 5-10 minutes*
*Difficulty: Easy*
