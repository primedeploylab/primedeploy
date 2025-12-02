# Getting Started with DeployPrime Portfolio

Welcome! This guide will help you get your portfolio website up and running.

## 📚 Documentation Overview

We've created comprehensive documentation to help you at every step:

### Essential Reading (Start Here!)
1. **README.md** - Project overview and features
2. **QUICKSTART.md** - Get running in 5 minutes
3. **This file** - Navigation guide

### Setup & Deployment
- **DEPLOYMENT.md** - Complete deployment guide for Render
- **setup.sh / setup.bat** - Automated setup scripts
- **backend/README.md** - Backend-specific documentation
- **frontend/README.md** - Frontend-specific documentation

### Reference & Help
- **FAQ.md** - Frequently asked questions
- **CHECKLIST.md** - Pre-launch checklist
- **CONTRIBUTING.md** - How to contribute
- **PROJECT_SUMMARY.md** - Complete feature list

### Tools
- **DeployPrime-API.postman_collection.json** - API testing collection

## 🚀 Quick Start Paths

### Path 1: I Want to See It Running (5 minutes)
1. Run setup script: `./setup.sh` (Mac/Linux) or `setup.bat` (Windows)
2. **Setup MongoDB Atlas**: See `MONGODB_ATLAS_SETUP.md` or `MONGODB_CREDENTIALS.md`
3. Update `backend/.env` with your MongoDB connection string
4. Create admin: `cd backend && npm run create-admin`
5. Add sample data: `npm run seed`
6. Start backend: `npm run dev`
7. Start frontend: `cd ../frontend && npm run dev`
8. Visit http://localhost:5173

💡 **Quick MongoDB Setup**: Your credentials are in `MONGODB_CREDENTIALS.md`

### Path 2: I Want to Deploy to Production (30 minutes)
1. Complete Path 1 first
2. Push code to GitHub
3. Follow **DEPLOYMENT.md** step-by-step
4. Use **CHECKLIST.md** before going live

### Path 3: I Want to Customize Everything (1-2 hours)
1. Complete Path 1 first
2. Read **README.md** for architecture overview
3. Explore the code structure
4. Modify colors in `frontend/tailwind.config.js`
5. Update content through admin panel
6. Add your own features

## 📖 Learning Path

### For Beginners
1. Start with **QUICKSTART.md**
2. Follow the setup instructions carefully
3. Use the admin panel to add content
4. Read **FAQ.md** when you have questions
5. Check **CHECKLIST.md** before deploying

### For Developers
1. Review **README.md** for architecture
2. Explore the code structure
3. Check **backend/README.md** for API details
4. Review **frontend/README.md** for component structure
5. Import **DeployPrime-API.postman_collection.json** for API testing
6. Read **CONTRIBUTING.md** if you want to contribute

### For Deploying to Production
1. Complete local setup first
2. Read **DEPLOYMENT.md** thoroughly
3. Set up MongoDB Atlas account
4. Set up Cloudinary account
5. Deploy backend to Render
6. Deploy frontend to Render
7. Use **CHECKLIST.md** to verify everything

## 🎯 Common Tasks

### Adding Content
**Location**: Admin panel at `/admin/login`

1. **Add a Project**:
   - Admin → Projects → Add Project
   - Fill in details, upload images
   - Set tech stack and time taken
   - Publish

2. **Write a Blog Post**:
   - Admin → Blogs → Add Blog
   - Write content (HTML supported)
   - Add featured image
   - Set tags and publish

3. **Add a Service**:
   - Admin → Services → Add Service
   - Set title, description, icon
   - Add deliverables
   - Publish

4. **Update Site Settings**:
   - Admin → Settings
   - Edit hero text, footer, contact info
   - Update social links
   - Save changes

### Customizing Design
**Location**: `frontend/` directory

1. **Change Colors**:
   - Edit `tailwind.config.js`
   - Update color values
   - Rebuild frontend

2. **Modify Layout**:
   - Edit component files in `src/components/`
   - Update page files in `src/pages/`
   - Use Tailwind CSS classes

3. **Add Animations**:
   - Use Framer Motion (already included)
   - See examples in existing components

### Managing Database
**Location**: `backend/` directory

1. **Create Admin User**:
   ```bash
   npm run create-admin
   ```

2. **Seed Sample Data**:
   ```bash
   npm run seed
   ```

3. **Clear Database**:
   - Use MongoDB Compass or Atlas dashboard
   - Or drop collections manually

### Testing API
**Location**: Postman or curl

1. **Import Collection**:
   - Open Postman
   - Import `DeployPrime-API.postman_collection.json`
   - Set `baseUrl` variable

2. **Test Endpoints**:
   - Login to get token
   - Test public endpoints
   - Test admin endpoints with token

## 🔧 Troubleshooting

### Quick Fixes

**"Cannot connect to MongoDB"**
- Check connection string in `.env`
- Verify MongoDB Atlas IP whitelist
- Test connection with MongoDB Compass

**"Port already in use"**
- Change PORT in `backend/.env`
- Or kill the process using the port

**"Module not found"**
- Run `npm install` in both directories
- Delete `node_modules` and reinstall

**"Admin login fails"**
- Run `npm run create-admin` again
- Check credentials in `.env`
- Clear browser cache

**"Images not uploading"**
- Verify Cloudinary credentials
- Check file size (< 5MB)
- Ensure you're logged in

### Need More Help?
- Check **FAQ.md** for detailed answers
- Review error logs in terminal
- Check browser console for errors
- Create an issue on GitHub

## 📞 Support

### Documentation
- All documentation is in the root directory
- Each doc has a specific purpose
- Start with the relevant guide for your task

### Community
- GitHub Issues for bugs
- GitHub Discussions for questions
- Email: hello@deployprime.com

### Professional Help
- Need custom features? Contact us
- Want deployment help? We can assist
- Looking for training? We offer it

## ✅ Next Steps

### After Setup
1. [ ] Change admin password
2. [ ] Add your real content
3. [ ] Upload your logo
4. [ ] Update site settings
5. [ ] Test all features
6. [ ] Review **CHECKLIST.md**

### Before Launch
1. [ ] Complete **CHECKLIST.md**
2. [ ] Test on multiple devices
3. [ ] Verify all links work
4. [ ] Check SEO settings
5. [ ] Set up monitoring
6. [ ] Prepare launch announcement

### After Launch
1. [ ] Monitor error logs
2. [ ] Check analytics
3. [ ] Respond to quotes
4. [ ] Update content regularly
5. [ ] Gather feedback
6. [ ] Plan improvements

## 🎉 You're Ready!

You now have everything you need to:
- Set up the project locally
- Customize it for your needs
- Deploy to production
- Manage content
- Get help when needed

**Choose your path above and get started!**

---

**Pro Tips**:
- Bookmark the documentation you use most
- Keep **FAQ.md** handy for quick answers
- Use **CHECKLIST.md** before every deployment
- Join our community for updates and tips

**Questions?** Start with **FAQ.md** or reach out to us!

Happy building! 🚀
