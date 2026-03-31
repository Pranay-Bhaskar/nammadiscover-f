import axios from 'axios';

// 🔥 IMPORTANT: no /api here
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const api = axios.create({
  baseURL: BASE_URL,
});

// 🔥 Interceptor: automatically prepend /api
api.interceptors.request.use(
  (config) => {
    // 🔥 Prepend /api if not already there
    if (config.url && !config.url.startsWith('/api')) {
      config.url = `/api${config.url}`;
    }

    // 🔑 JWT Token
    const token = localStorage.getItem('nammadiscover_token');
    console.log('Interceptor firing for:', config.url, 'Token:', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ------------------- LOCATION APIs -------------------

export const fetchLocations = (params) =>
  api.get('/locations', { params }).then((r) => r.data);

export const fetchLocationById = (id, lang = 'en') =>
  api.get(`/locations/${id}`, { params: { lang } }).then((r) => r.data);

export const searchLocations = (q, lang = 'en') =>
  api.get('/locations/search', { params: { q, lang } }).then((r) => r.data);

export const fetchNearby = (id, radius = 10000, category = '', lang = 'en') =>
  api
    .get(`/locations/${id}/nearby`, {
      params: { radius, category, lang },
    })
    .then((r) => r.data);

export const fetchReviews = (id) =>
  api.get(`/locations/${id}/reviews`).then((r) => r.data);

export const postReview = (id, data) =>
  api.post(`/locations/${id}/reviews`, data).then((r) => r.data);

// ------------------- OTHER APIs -------------------

export const fetchGuides = (city) =>
  api.get('/guides', { params: { city } }).then((r) => r.data);

export const fetchCategories = () =>
  api.get('/categories').then((r) => r.data);

export default api;
