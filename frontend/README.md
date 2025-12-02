# DeployPrime Frontend

React + Vite frontend for DeployPrime portfolio website.

## Features

- Modern React with Vite
- Tailwind CSS for styling
- Framer Motion animations
- React Router for navigation
- Responsive design
- SEO optimized with React Helmet
- Admin panel for content management

## Setup

1. Install dependencies:
```bash
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

4. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   └── FloatingContact.jsx
├── pages/           # Page components
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Services.jsx
│   ├── Projects.jsx
│   ├── Blogs.jsx
│   ├── Quote.jsx
│   ├── Contact.jsx
│   └── admin/       # Admin pages
├── utils/           # Utilities
│   └── api.js       # API client
├── App.jsx          # Main app component
└── main.jsx         # Entry point
```

## Deployment to Render

1. Create new Static Site on Render
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variable: `VITE_API_URL=https://your-backend-url.onrender.com/api`
6. Deploy!

## Admin Panel

Access the admin panel at `/admin/login`

Default credentials (change after first login):
- Email: admin@deployprime.com
- Password: Admin@123456

### Admin Features

- Manage projects (CRUD operations)
- Manage blog posts
- Manage services
- View and manage quote requests
- Update site settings (hero, footer, contact info)
- Upload images to Cloudinary

## Customization

### Colors

Edit `tailwind.config.js` to change the color scheme:

```js
colors: {
  primary: '#1A73E8',
  darkNavy: '#0F1D40',
  lightBlue: '#E5F1FF',
  grey: '#A7B5D3'
}
```

### Hero Animation

The hero section features:
- Typed words that rotate every 1 second
- Vertical card stack showing developer roles
- Auto-scrolling skill icons

All configurable from the admin panel.

## Performance

- Code splitting with React.lazy
- Image lazy loading
- Optimized bundle size
- CDN-ready static assets
