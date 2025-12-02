import express from 'express';
import Project from '../models/Project.js';
import Blog from '../models/Blog.js';
import Service from '../models/Service.js';

const router = express.Router();

// Generate sitemap.xml
router.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = process.env.FRONTEND_URL || 'https://deployprime.com';
    
    const projects = await Project.find({ published: true }).select('slug updatedAt');
    const blogs = await Blog.find({ draft: false }).select('slug publishedAt');
    const services = await Service.find({ published: true }).select('slug updatedAt');

    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Static pages
    const staticPages = ['', 'about-us', 'services', 'projects', 'blogs', 'contact'];
    staticPages.forEach(page => {
      sitemap += `  <url>\n    <loc>${baseUrl}/${page}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    // Projects
    projects.forEach(project => {
      sitemap += `  <url>\n    <loc>${baseUrl}/projects/${project.slug}</loc>\n    <lastmod>${project.updatedAt || new Date().toISOString()}</lastmod>\n    <changefreq>monthly</changefreq>\n  </url>\n`;
    });

    // Blogs
    blogs.forEach(blog => {
      sitemap += `  <url>\n    <loc>${baseUrl}/blogs/${blog.slug}</loc>\n    <lastmod>${blog.publishedAt?.toISOString() || new Date().toISOString()}</lastmod>\n    <changefreq>monthly</changefreq>\n  </url>\n`;
    });

    sitemap += '</urlset>';

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate robots.txt
router.get('/robots.txt', (req, res) => {
  const baseUrl = process.env.FRONTEND_URL || 'https://deployprime.com';
  const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/api/sitemap.xml`;

  res.header('Content-Type', 'text/plain');
  res.send(robots);
});

export default router;
