# Deployment Guide - DeployPrime Portfolio

Complete step-by-step guide to deploy your portfolio to Render.

## Prerequisites

- GitHub account with your code pushed
- MongoDB Atlas account
- Cloudinary account
- Render account

## Step 1: MongoDB Atlas Setup

### If You Already Have Atlas Set Up:

Your credentials from the screenshot:
- **Username**: `primedeploylab_db_user`
- **Password**: `vicky@123` (URL-encode as `vicky%40123`)
- **IP Whitelisted**: `152.59.36.229`

**Your connection string format**:
```
mongodb+srv://primedeploylab_db_user:vicky%40123@cluster0.xxxxx.mongodb.net/deployprime?retryWrites=true&w=majority&appName=Cluster0
```

**Important**: Replace `cluster0.xxxxx` with your actual cluster address from Atlas.

### If Setting Up Fresh:

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account or sign in
3. Create a new cluster (free tier M0)
4. Wait for cluster to be created (2-3 minutes)
5. Click "Connect" on your cluster
6. Add a database user:
   - Username: `primedeploylab_db_user` (or your choice)
   - Password: Create a secure password
   - Save credentials securely
7. Whitelist IP addresses:
   - For local: Add your current IP
   - For Render: Add `0.0.0.0/0` (all IPs)
8. Choose connection method: "Connect your application"
9. Copy the connection string
10. Replace `<password>` with your database password (URL-encoded)
11. Add database name `deployprime` before the `?`

**Note**: If your password contains special characters like `@`, URL-encode them:
- `@` becomes `%40`
- `#` becomes `%23`
- `$` becomes `%24`

Example: `vicky@123` → `vicky%40123`

📖 **For detailed MongoDB Atlas setup, see MONGODB_ATLAS_SETUP.md**

## Step 2: Cloudinary Setup

1. Go to https://cloudinary.com
2. Sign up for free account
3. Go to Dashboard
4. Note down:
   - Cloud Name
   - API Key
   - API Secret
5. (Optional) Create a folder named "deployprime" in Media Library

## Step 3: Backend Deployment on Render

1. Go to https://render.com and sign in
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `deployprime-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. Add Environment Variables (click "Advanced" → "Add Environment Variable"):

```
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://deployprime:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/deployprime?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
ADMIN_DEFAULT_EMAIL=admin@deployprime.com
ADMIN_DEFAULT_PASSWORD=Admin@123456
FRONTEND_URL=https://deployprime.onrender.com
```

**Important Notes:**
- Generate a strong JWT_SECRET (at least 32 characters)
- For Gmail SMTP, use an App Password (not your regular password)
  - Go to Google Account → Security → 2-Step Verification → App Passwords
- FRONTEND_URL will be updated after frontend deployment

6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. Once deployed, note your backend URL: `https://deployprime-backend.onrender.com`

### Test Backend

Visit: `https://deployprime-backend.onrender.com/health`

You should see: `{"status":"ok","timestamp":"..."}`

## Step 4: Create Admin User

After backend is deployed:

1. Go to Render dashboard → your backend service
2. Click "Shell" tab
3. Run:
```bash
npm run create-admin
```

This creates the admin user with credentials from environment variables.

## Step 5: Seed Database (Optional)

To add sample data:

1. In the Shell tab, run:
```bash
npm run seed
```

This adds:
- 6 sample projects
- 2 sample blog posts
- 3 sample services
- Site settings with default values

## Step 6: Frontend Deployment on Render

1. Go to Render dashboard
2. Click "New +" → "Static Site"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `deployprime`
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

5. Add Environment Variable:
```
VITE_API_URL=https://deployprime-backend.onrender.com/api
```

Replace with your actual backend URL from Step 3.

6. Click "Create Static Site"
7. Wait for deployment (3-5 minutes)
8. Your site will be live at: `https://deployprime.onrender.com`

## Step 7: Update Backend FRONTEND_URL

1. Go to backend service on Render
2. Go to "Environment" tab
3. Update `FRONTEND_URL` to your frontend URL: `https://deployprime.onrender.com`
4. Save changes (this will redeploy backend)

## Step 8: Custom Domain (Optional)

### For Frontend:
1. Go to your static site on Render
2. Click "Settings" → "Custom Domains"
3. Add your domain (e.g., `deployprime.com`)
4. Follow DNS instructions to add CNAME record
5. Wait for DNS propagation (up to 48 hours)

### For Backend:
1. Go to your web service on Render
2. Add custom domain (e.g., `api.deployprime.com`)
3. Update CNAME record in DNS
4. Update `VITE_API_URL` in frontend environment variables

## Step 9: Verify Deployment

### Test Public Website:
1. Visit your frontend URL
2. Check all pages load correctly
3. Test navigation
4. Verify images load
5. Test quote form submission

### Test Admin Panel:
1. Go to `/admin/login`
2. Login with:
   - Email: `admin@deployprime.com`
   - Password: `Admin@123456`
3. Verify dashboard loads
4. Test creating a project
5. Test uploading an image
6. Test updating site settings

### Test API:
```bash
# Get site settings
curl https://deployprime-backend.onrender.com/api/site-settings

# Test login
curl -X POST https://deployprime-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@deployprime.com","password":"Admin@123456"}'
```

## Troubleshooting

### Backend Issues

**"Application failed to respond"**
- Check logs in Render dashboard
- Verify MongoDB connection string
- Ensure all environment variables are set

**"Cannot connect to MongoDB"**
- Check MongoDB Atlas IP whitelist (should be 0.0.0.0/0)
- Verify connection string format
- Check database user credentials

**"JWT malformed"**
- Ensure JWT_SECRET is set and at least 32 characters
- Clear browser localStorage and login again

### Frontend Issues

**"Network Error" or "Failed to fetch"**
- Verify VITE_API_URL is correct
- Check backend is running
- Verify CORS settings in backend

**Images not loading**
- Check Cloudinary credentials
- Verify images were uploaded successfully
- Check browser console for errors

**Admin login fails**
- Verify admin user was created (run create-admin script)
- Check credentials match environment variables
- Clear browser cache and cookies

### Performance Issues

**Slow initial load**
- Render free tier spins down after inactivity
- First request may take 30-60 seconds
- Consider upgrading to paid tier for always-on

**Images loading slowly**
- Cloudinary should auto-optimize
- Check image sizes in admin panel
- Consider using Cloudinary transformations

## Maintenance

### Update Content
- Use admin panel to update projects, blogs, services
- Changes are immediate

### Update Code
- Push changes to GitHub
- Render auto-deploys on push to main branch
- Check deployment logs for errors

### Backup Database
1. Go to MongoDB Atlas
2. Click "..." on cluster → "Backup"
3. Configure backup schedule

### Monitor Usage
- Check Render dashboard for bandwidth usage
- Monitor MongoDB Atlas for storage usage
- Review Cloudinary usage in dashboard

### Update Dependencies
```bash
# Backend
cd backend
npm update
npm audit fix

# Frontend
cd frontend
npm update
npm audit fix
```

Push changes to trigger redeployment.

## Security Checklist

- [ ] Changed default admin password
- [ ] JWT_SECRET is strong and unique
- [ ] MongoDB user has strong password
- [ ] SMTP credentials are secure (use app password)
- [ ] Cloudinary API secret is not exposed
- [ ] CORS is configured correctly
- [ ] Rate limiting is enabled
- [ ] HTTPS is enforced (Render does this automatically)

## Cost Estimate

### Free Tier:
- Render: Free (with limitations)
- MongoDB Atlas: Free (512MB storage)
- Cloudinary: Free (25GB storage, 25GB bandwidth)

### Paid Tier (Recommended for production):
- Render Web Service: $7/month (always-on)
- Render Static Site: Free
- MongoDB Atlas: $9/month (2GB storage)
- Cloudinary: $0-89/month (based on usage)

**Total**: ~$16-105/month

## Next Steps

1. Change admin password after first login
2. Add your real content (projects, blogs, services)
3. Upload your logo and images
4. Update site settings (hero text, footer, contact info)
5. Configure custom domain
6. Set up Google Analytics (optional)
7. Submit sitemap to Google Search Console
8. Test on multiple devices and browsers

## Support

If you encounter issues:
1. Check Render logs
2. Review MongoDB Atlas metrics
3. Check browser console for errors
4. Verify all environment variables
5. Test API endpoints directly

---

Congratulations! Your DeployPrime portfolio is now live! 🎉
