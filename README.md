# DeployPrime Portfolio Website

Complete full-stack portfolio website with admin panel for DeployPrime freelance agency.

## 🚀 Features

### Public Website
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Glassmorphism effects, smooth animations, rounded elements
- **Hero Section**: Animated typed words and rotating developer role cards
- **Services**: Showcase your offerings with detailed pages
- **Projects**: Portfolio with pagination, detailed project pages
- **Blog**: Full-featured blog with rich content
- **Quote Form**: Let clients request quotes easily
- **SEO Optimized**: Meta tags, sitemap, robots.txt, structured data
- **Floating Contact**: WhatsApp and phone buttons

### Admin Panel
- **Secure Authentication**: JWT-based login system
- **Content Management**: Full CRUD for projects, blogs, services
- **Quote Management**: View and manage client quote requests
- **Site Settings**: Edit hero text, footer, contact info, social links
- **Image Upload**: Cloudinary integration for media management
- **Role-Based Access**: Admin and Editor roles

### Technical Stack
- **Frontend**: React 18 + Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js + Express, MongoDB, JWT
- **Storage**: Cloudinary for images
- **Hosting**: Render (frontend + backend)
- **Database**: MongoDB Atlas

## 📦 Project Structure

```
deployprime-portfolio/
├── backend/              # Node.js API server
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── utils/           # Utilities (email, etc.)
│   ├── scripts/         # Seed & admin creation
│   └── server.js        # Entry point
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── utils/       # API client
│   │   └── App.jsx      # Main app
│   └── index.html
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account
- Cloudinary account
- Render account (for deployment)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update environment variables in `.env`:
```env
# MongoDB Atlas - See MONGODB_ATLAS_SETUP.md for detailed instructions
MONGO_URI=mongodb+srv://primedeploylab_db_user:vicky%40123@YOUR_CLUSTER/deployprime?retryWrites=true&w=majority&appName=Cluster0

JWT_SECRET=your_secret_key_min_32_characters
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SMTP_HOST=smtp.gmail.com
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
ADMIN_DEFAULT_EMAIL=admin@deployprime.com
ADMIN_DEFAULT_PASSWORD=Admin@123456
```

📖 **MongoDB Atlas Setup**: See `MONGODB_ATLAS_SETUP.md` or `MONGODB_CREDENTIALS.md` for your specific credentials and detailed setup instructions.

4. Create admin user:
```bash
npm run create-admin
```

5. Seed database (optional):
```bash
npm run seed
```

6. Start development server:
```bash
npm run dev
```

Backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
npm install
```

2. Create `.env` file:
```
VITE_API_URL=http://localhost:5000/api
```

3. Start development server:
```bash
npm run dev
```

Frontend will run on http://localhost:5173

## 🚢 Deployment

### MongoDB Atlas Setup

1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Create a database user
3. Whitelist all IPs (0.0.0.0/0) for Render access
4. Get connection string

### Cloudinary Setup

1. Sign up at https://cloudinary.com
2. Get your cloud name, API key, and API secret from dashboard
3. Create a folder named "deployprime" (optional)

### Backend Deployment (Render)

1. Create new **Web Service** on Render
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
4. Add environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`
   - `ADMIN_DEFAULT_EMAIL`, `ADMIN_DEFAULT_PASSWORD`
   - `FRONTEND_URL` (your frontend URL)
5. Deploy!

### Frontend Deployment (Render)

1. Create new **Static Site** on Render
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Root Directory**: `frontend`
4. Add environment variable:
   - `VITE_API_URL=https://your-backend-url.onrender.com/api`
5. Deploy!

## 📝 Usage Guide

### Admin Panel Access

1. Navigate to `/admin/login`
2. Login with admin credentials
3. Dashboard shows overview of content

### Managing Content

#### Projects
- Add new projects with images, tech stack, links
- Set time taken (e.g., "3 weeks", "2 months")
- Publish/unpublish projects
- Reorder projects

#### Blogs
- Create blog posts with rich text editor
- Add featured images
- Set tags and SEO metadata
- Draft/publish workflow

#### Services
- Add service offerings
- Set deliverables and pricing
- Customize icons and descriptions

#### Site Settings
- Edit hero headline and typed words
- Update WhatsApp and phone numbers
- Modify footer content
- Change social media links

#### Quote Requests
- View all quote submissions
- Change status (New → In Progress → Closed)
- Export to CSV (future feature)

## 🎨 Customization

### Colors

The color palette is defined in `frontend/tailwind.config.js`:

```js
colors: {
  primary: '#1A73E8',      // Primary blue
  darkNavy: '#0F1D40',     // Dark navy
  lightBlue: '#E5F1FF',    // Light blue background
  grey: '#A7B5D3'          // Grey for text
}
```

### Hero Animations

- **Typed Words**: Rotate every 1 second, configurable from admin
- **Role Cards**: Vertical stack that cycles through roles
- **Skill Icons**: Auto-scrolling horizontal slider

All timings can be adjusted in `frontend/src/components/Hero.jsx`

### Navbar Menu

Menu items are fully editable from the admin panel:
- Change labels
- Reorder items
- Add/remove links

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test
```

### API Testing

Use the provided Postman collection or test endpoints:

```bash
# Health check
curl http://localhost:5000/health

# Get site settings
curl http://localhost:5000/api/site-settings

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@deployprime.com","password":"Admin@123456"}'
```

## 📊 API Endpoints

### Public Endpoints
- `GET /api/site-settings` - Get site configuration
- `GET /api/services` - List all services
- `GET /api/projects` - List projects (paginated)
- `GET /api/projects/:slug` - Get single project
- `GET /api/blogs` - List blogs (paginated)
- `GET /api/blogs/:slug` - Get single blog
- `POST /api/quotes` - Submit quote request
- `GET /api/sitemap.xml` - Generate sitemap
- `GET /api/robots.txt` - Get robots.txt

### Admin Endpoints (require authentication)
- `POST /api/auth/login` - Admin login
- `PUT /api/site-settings` - Update settings
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/blogs` - Create blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog
- `GET /api/quotes` - List quotes
- `PATCH /api/quotes/:id/status` - Update quote status
- `POST /api/upload/image` - Upload image
- `POST /api/upload/images` - Upload multiple images

## 🔒 Security

- JWT authentication for admin routes
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration
- Helmet.js security headers
- Secure file upload validation

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Verify all environment variables are set
- Check port 5000 is not in use

### Frontend can't connect to backend
- Verify `VITE_API_URL` in frontend `.env`
- Check CORS settings in backend
- Ensure backend is running

### Images not uploading
- Verify Cloudinary credentials
- Check file size limits (5MB default)
- Ensure file type is allowed (JPEG, PNG, WebP, GIF)

### Admin login fails
- Run `npm run create-admin` to create admin user
- Check JWT_SECRET is set
- Verify credentials match `.env` values

## 📄 License

MIT License - feel free to use for your projects!

## 🤝 Support

For issues or questions:
- Check the documentation
- Review error logs
- Contact: hello@deployprime.com

---

Built with ❤️ by DeployPrime
