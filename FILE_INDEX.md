# DeployPrime Portfolio - Complete File Index

Quick reference guide to all files in the project.

## 📁 Root Directory

### Documentation Files
- **README.md** - Main project documentation and overview
- **GETTING_STARTED.md** - Navigation guide for all documentation
- **QUICKSTART.md** - 5-minute setup guide
- **DEPLOYMENT.md** - Complete deployment guide for Render
- **MONGODB_ATLAS_SETUP.md** - Detailed MongoDB Atlas setup guide
- **MONGODB_CREDENTIALS.md** - Quick reference for your MongoDB credentials
- **FAQ.md** - Frequently asked questions and answers
- **CHECKLIST.md** - Pre-launch checklist
- **CONTRIBUTING.md** - Contribution guidelines
- **PROJECT_SUMMARY.md** - Complete feature list and deliverables
- **LICENSE** - MIT License

### Setup & Configuration
- **setup.sh** - Automated setup script for Mac/Linux
- **setup.bat** - Automated setup script for Windows
- **.gitignore** - Git ignore rules
- **DeployPrime-API.postman_collection.json** - Postman API collection

## 🔧 Backend Directory (`/backend`)

### Root Files
- **server.js** - Main Express server and entry point
- **package.json** - Dependencies and scripts
- **.env.example** - Environment variables template
- **.gitignore** - Backend-specific ignore rules
- **README.md** - Backend documentation
- **jest.config.js** - Jest testing configuration

### Models (`/backend/models`)
Database schemas using Mongoose:
- **User.js** - Admin user model with authentication
- **SiteSettings.js** - Site configuration and settings
- **Service.js** - Services/offerings model
- **Project.js** - Portfolio projects model
- **Blog.js** - Blog posts model
- **Quote.js** - Quote requests model

### Routes (`/backend/routes`)
API endpoint handlers:
- **auth.js** - Authentication (login, current user)
- **siteSettings.js** - Site settings CRUD
- **services.js** - Services CRUD
- **projects.js** - Projects CRUD with pagination
- **blogs.js** - Blogs CRUD with pagination
- **quotes.js** - Quote submission and management
- **upload.js** - Cloudinary image upload
- **public.js** - Sitemap and robots.txt generation

### Middleware (`/backend/middleware`)
- **auth.js** - JWT authentication and authorization

### Utils (`/backend/utils`)
- **email.js** - Email notification service

### Scripts (`/backend/scripts`)
- **seed.js** - Database seeding with sample data
- **createAdmin.js** - Admin user creation script

### Tests (`/backend/tests`)
- **api.test.js** - API endpoint tests

## 🎨 Frontend Directory (`/frontend`)

### Root Files
- **index.html** - HTML entry point
- **package.json** - Dependencies and scripts
- **vite.config.js** - Vite build configuration
- **tailwind.config.js** - Tailwind CSS configuration
- **postcss.config.js** - PostCSS configuration
- **.env.example** - Environment variables template
- **.gitignore** - Frontend-specific ignore rules
- **README.md** - Frontend documentation

### Source (`/frontend/src`)

#### Main Files
- **main.jsx** - React entry point
- **App.jsx** - Main app component with routing
- **index.css** - Global styles and Tailwind imports

#### Components (`/frontend/src/components`)
Reusable UI components:
- **Navbar.jsx** - Navigation bar with mobile menu
- **Footer.jsx** - Footer with links and social icons
- **Hero.jsx** - Hero section with animations
- **FloatingContact.jsx** - Floating WhatsApp/Phone buttons
- **PrivateRoute.jsx** - Protected route wrapper

#### Pages (`/frontend/src/pages`)
Public pages:
- **Home.jsx** - Homepage with all sections
- **About.jsx** - About us page
- **Services.jsx** - Services listing page
- **Projects.jsx** - Projects listing with pagination
- **ProjectDetail.jsx** - Individual project page
- **Blogs.jsx** - Blog listing with pagination
- **BlogDetail.jsx** - Individual blog post page
- **Quote.jsx** - Quote request form
- **Contact.jsx** - Contact information page

Admin pages (`/frontend/src/pages/admin`):
- **Login.jsx** - Admin login page
- **Dashboard.jsx** - Admin dashboard overview
- **Projects.jsx** - Projects management
- **Blogs.jsx** - Blogs management
- **Services.jsx** - Services management
- **Quotes.jsx** - Quote requests management
- **Settings.jsx** - Site settings editor

#### Utils (`/frontend/src/utils`)
- **api.js** - Axios API client with all endpoints

## 🔄 CI/CD (`/.github/workflows`)
- **ci.yml** - GitHub Actions workflow for testing and building

## 📊 File Statistics

### Backend
- **Models**: 6 files
- **Routes**: 8 files
- **Middleware**: 1 file
- **Utils**: 1 file
- **Scripts**: 2 files
- **Tests**: 1 file
- **Total Backend Code Files**: ~19 files

### Frontend
- **Components**: 5 files
- **Public Pages**: 9 files
- **Admin Pages**: 7 files
- **Utils**: 1 file
- **Total Frontend Code Files**: ~22 files

### Documentation
- **Main Docs**: 9 files
- **README files**: 3 files
- **Total Documentation**: ~12 files

### Configuration
- **Package.json**: 2 files
- **Config files**: 6 files
- **Environment templates**: 2 files
- **Total Config**: ~10 files

### Grand Total
**~65+ files** across the entire project

## 🎯 File Purpose Quick Reference

### Need to...

**Set up the project?**
- Start with: `setup.sh` or `setup.bat`
- Then read: `QUICKSTART.md`

**Deploy to production?**
- Read: `DEPLOYMENT.md`
- Use: `CHECKLIST.md`

**Understand the architecture?**
- Read: `README.md`
- Check: `PROJECT_SUMMARY.md`

**Add a new feature?**
- Backend: Add route in `/backend/routes`
- Frontend: Add component in `/frontend/src/components`
- Read: `CONTRIBUTING.md`

**Customize design?**
- Colors: `frontend/tailwind.config.js`
- Styles: `frontend/src/index.css`
- Components: `frontend/src/components/*.jsx`

**Manage content?**
- Use admin panel: `/admin/login`
- Models: `/backend/models/*.js`

**Test the API?**
- Import: `DeployPrime-API.postman_collection.json`
- Run tests: `backend/tests/api.test.js`

**Configure environment?**
- Backend: `backend/.env.example`
- Frontend: `frontend/.env.example`

**Get help?**
- Read: `FAQ.md`
- Check: `GETTING_STARTED.md`

## 🔍 Finding Specific Code

### Authentication & Security
- JWT logic: `backend/middleware/auth.js`
- Login route: `backend/routes/auth.js`
- User model: `backend/models/User.js`
- Login page: `frontend/src/pages/admin/Login.jsx`

### Content Management
- Models: `backend/models/*.js`
- API routes: `backend/routes/*.js`
- Admin pages: `frontend/src/pages/admin/*.jsx`

### Public Website
- Homepage: `frontend/src/pages/Home.jsx`
- Hero section: `frontend/src/components/Hero.jsx`
- Navigation: `frontend/src/components/Navbar.jsx`
- Footer: `frontend/src/components/Footer.jsx`

### Image Upload
- Backend: `backend/routes/upload.js`
- API client: `frontend/src/utils/api.js` (uploadImage, uploadImages)

### Email Notifications
- Email service: `backend/utils/email.js`
- Quote submission: `backend/routes/quotes.js`

### Database
- All models: `backend/models/*.js`
- Seed script: `backend/scripts/seed.js`
- Connection: `backend/server.js`

### Styling
- Tailwind config: `frontend/tailwind.config.js`
- Global styles: `frontend/src/index.css`
- Component styles: Inline Tailwind classes

### API Client
- All API calls: `frontend/src/utils/api.js`
- Axios configuration: Same file

## 📝 Notes

### File Naming Conventions
- **Backend**: camelCase for files (e.g., `siteSettings.js`)
- **Frontend**: PascalCase for components (e.g., `Navbar.jsx`)
- **Docs**: UPPERCASE for main docs (e.g., `README.md`)

### Import Paths
- **Backend**: Relative imports with `.js` extension
- **Frontend**: Relative imports, no extension needed
- **Aliases**: Not configured (use relative paths)

### Code Organization
- **Backend**: Feature-based (routes, models, etc.)
- **Frontend**: Component-based (components, pages, utils)
- **Shared**: None (separate frontend/backend)

## 🚀 Quick Navigation

### I want to...

**Modify the homepage**
→ `frontend/src/pages/Home.jsx`

**Change the hero animation**
→ `frontend/src/components/Hero.jsx`

**Add a new API endpoint**
→ Create/edit file in `backend/routes/`

**Change database schema**
→ Edit model in `backend/models/`

**Update admin panel**
→ Edit files in `frontend/src/pages/admin/`

**Modify email templates**
→ `backend/utils/email.js`

**Change color scheme**
→ `frontend/tailwind.config.js`

**Add global styles**
→ `frontend/src/index.css`

**Configure build process**
→ `frontend/vite.config.js`

**Update dependencies**
→ `backend/package.json` or `frontend/package.json`

---

**Tip**: Use your IDE's file search (Ctrl+P or Cmd+P) to quickly find files by name!
