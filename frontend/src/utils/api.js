import axios from 'axios';

const isNgrok = typeof window !== 'undefined' && window.location.hostname.includes('ngrok-free.app');
const API_URL = isNgrok ? '/api' : (import.meta.env.VITE_API_URL || '/api');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
// Add token to requests
api.interceptors.request.use((config) => {
  // If Authorization header is already set, don't overwrite it
  if (config.headers.Authorization) {
    return config;
  }

  const token = localStorage.getItem('token');
  const clientToken = localStorage.getItem('clientToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (clientToken) {
    config.headers.Authorization = `Bearer ${clientToken}`;
  }

  return config;
});

// Auth
export const login = (credentials) => api.post('/auth/login', credentials);
export const getCurrentUser = () => api.get('/auth/me');

// Site Settings
export const getSiteSettings = () => api.get('/site-settings');
export const updateSiteSettings = (data) => api.put('/site-settings', data);

// Services
export const getServices = () => api.get('/services');
export const getService = (slug) => api.get(`/services/${slug}`);
export const getAdminServices = () => api.get('/services/admin');
export const createService = (data) => api.post('/services', data);
export const updateService = (id, data) => api.put(`/services/${id}`, data);
export const deleteService = (id) => api.delete(`/services/${id}`);

// Projects
export const getProjects = (page = 1, limit = 6, category = 'All') => api.get(`/projects?page=${page}&limit=${limit}&category=${category}`);
export const getProject = (slug) => api.get(`/projects/${slug}`);
export const getAdminProjects = () => api.get('/projects/admin');
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// Blogs
export const getBlogs = (page = 1, limit = 10) => api.get(`/blogs?page=${page}&limit=${limit}`);
export const getBlog = (slug) => api.get(`/blogs/${slug}`);
export const getAdminBlogs = () => api.get('/blogs/admin');
export const createBlog = (data) => api.post('/blogs', data);
export const updateBlog = (id, data) => api.put(`/blogs/${id}`, data);
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);

// Quotes
export const submitQuote = (data) => api.post('/quotes', data);
export const getQuotes = (status) => api.get(`/quotes${status ? `?status=${status}` : ''}`);
export const updateQuoteStatus = (id, status) => api.patch(`/quotes/${id}/status`, { status });
export const deleteQuote = (id) => api.delete(`/quotes/${id}`);

// Upload
export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const uploadImages = (files) => {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file));
  return api.post('/upload/images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

// Contracts
export const getContracts = (status) => api.get(`/contracts/admin${status ? `?status=${status}` : ''}`);
export const getContract = (contractId) => api.get(`/contracts/${contractId}`);
export const createContract = (data) => api.post('/contracts', data);
export const updateContract = (id, data) => api.put(`/contracts/${id}`, data);
export const deleteContract = (id) => api.delete(`/contracts/${id}`);
export const signContract = (contractId, signature) => api.post(`/contracts/${contractId}/sign`, { signature });

// Reviews
export const getReviews = (projectId) => api.get(`/reviews${projectId ? `?projectId=${projectId}` : ''}`);
export const getAdminReviews = (status) => api.get(`/reviews/admin${status ? `?status=${status}` : ''}`);
export const submitReview = (data) => {
  const token = localStorage.getItem('clientToken');
  return api.post('/reviews', data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
export const approveReview = (id) => api.patch(`/reviews/${id}/approve`);
export const rejectReview = (id, reason) => api.patch(`/reviews/${id}/reject`, { rejectionReason: reason });
export const deleteReview = (id) => api.delete(`/reviews/${id}`);

// Client Auth
export const clientRegister = (data) => api.post('/client-auth/register', data);
export const clientLogin = (data) => api.post('/client-auth/login', data);
export const clientForgotPassword = (data) => api.post('/client-auth/forgot-password', data);
export const getClientUsers = (status) => api.get(`/client-auth/admin/users${status ? `?status=${status}` : ''}`);
export const approveClientUser = (id) => api.patch(`/client-auth/admin/users/${id}/approve`);
export const deleteClientUser = (id) => api.delete(`/client-auth/admin/users/${id}`);

export default api;
