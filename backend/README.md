# DeployPrime Backend API

Node.js + Express backend for DeployPrime portfolio website.

## Features

- RESTful API with Express
- MongoDB with Mongoose ODM
- JWT authentication
- Cloudinary image uploads
- Email notifications
- Rate limiting & security
- Input validation

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update environment variables in `.env`

4. Create admin user:
```bash
npm run create-admin
```

5. Seed database (optional):
```bash
npm run seed
```

6. Start server:
```bash
npm run dev
```

## API Endpoints

### Public Routes
- `GET /api/site-settings` - Get site settings
- `GET /api/services` - Get all services
- `GET /api/projects` - Get all projects (paginated)
- `GET /api/blogs` - Get all blogs (paginated)
- `POST /api/quotes` - Submit quote request
- `GET /api/sitemap.xml` - Generate sitemap
- `GET /api/robots.txt` - Get robots.txt

### Admin Routes (require authentication)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user
- `PUT /api/site-settings` - Update site settings
- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/blogs` - Create blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog
- `GET /api/quotes` - Get all quotes
- `PATCH /api/quotes/:id/status` - Update quote status
- `POST /api/upload/image` - Upload single image
- `POST /api/upload/images` - Upload multiple images

## Deployment to Render

1. Create new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables from `.env.example`
6. Deploy!

## Environment Variables

See `.env.example` for required variables.
