import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({ baseURL: BASE_URL });

export const fetchLocations = (params) =>
  api.get('/api/locations', { params }).then(r => r.data);

export const fetchLocationById = (id, lang = 'en') =>
  api.get(`/api/locations/${id}`, { params: { lang } }).then(r => r.data);

export const searchLocations = (q, lang = 'en') =>
  api.get('/api/locations/search', { params: { q, lang } }).then(r => r.data);

export const fetchNearby = (id, radius = 10000, category = '', lang = 'en') =>
  api.get(`/api/locations/${id}/nearby`, { params: { radius, category, lang } }).then(r => r.data);

export const fetchReviews = (id) =>
  api.get(`/api/locations/${id}/reviews`).then(r => r.data);

export const postReview = (id, data) =>
  api.post(`/api/locations/${id}/reviews`, data).then(r => r.data);

export const fetchGuides = (city) =>
  api.get('/api/guides', { params: { city } }).then(r => r.data);

export const fetchCategories = () =>
  api.get('/api/categories').then(r => r.data);

export default api;
