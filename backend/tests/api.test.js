import request from 'supertest';
import app from '../server.js';

describe('API Tests', () => {
  describe('Health Check', () => {
    it('should return 200 OK', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status', 'ok');
    });
  });

  describe('Site Settings', () => {
    it('should get site settings', async () => {
      const res = await request(app).get('/api/site-settings');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('hero');
    });
  });

  describe('Services', () => {
    it('should get all services', async () => {
      const res = await request(app).get('/api/services');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('Projects', () => {
    it('should get projects with pagination', async () => {
      const res = await request(app).get('/api/projects?page=1&limit=6');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('projects');
      expect(res.body).toHaveProperty('pagination');
    });
  });

  describe('Blogs', () => {
    it('should get blogs with pagination', async () => {
      const res = await request(app).get('/api/blogs?page=1&limit=10');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('blogs');
      expect(res.body).toHaveProperty('pagination');
    });
  });

  describe('Authentication', () => {
    it('should reject login with invalid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'wrong@email.com', password: 'wrongpass' });
      expect(res.statusCode).toBe(401);
    });

    it('should require authentication for admin routes', async () => {
      const res = await request(app).put('/api/site-settings');
      expect(res.statusCode).toBe(401);
    });
  });

  describe('Quote Submission', () => {
    it('should accept valid quote submission', async () => {
      const res = await request(app)
        .post('/api/quotes')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message'
        });
      expect(res.statusCode).toBe(201);
    });

    it('should reject invalid quote submission', async () => {
      const res = await request(app)
        .post('/api/quotes')
        .send({ name: 'Test User' }); // Missing required fields
      expect(res.statusCode).toBe(400);
    });
  });
});
