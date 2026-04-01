
/*
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || '';

const videoApi = axios.create({
  baseURL: `${BASE_URL}/api`,
});

// Inject auth token on every request
videoApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('nammadiscover_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
*/

/* ── Videos ── */
/*
/**
 * Upload a video with progress tracking.
 * @param {FormData} formData
 * @param {Function} onProgress - (percent: number) => void
 */

/*
export const uploadVideo = (formData, onProgress) =>
  videoApi.post('/videos/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (evt) => {
      const percent = Math.round((evt.loaded * 100) / evt.total);
      if (onProgress) onProgress(percent);
    },
  });

/**
 * @param {object} params - { uploader_id?, category?, status?, search? }
 */
/*
export const getVideos = (params = {}) => videoApi.get('/videos', { params });

export const getVideoById = (id) => videoApi.get(`/videos/${id}`);

export const updateVideo = (id, data) => videoApi.put(`/videos/${id}`, data);

export const deleteVideo = (id) => videoApi.delete(`/videos/${id}`);

/* ── Moderation ── */
/*
export const getModerationQueue = () => videoApi.get('/moderate/queue');

/**
 * @param {string} id - video id
 * @param {'approve'|'reject'} action
 * @param {string} note
 */

/*
export const moderateVideo = (id, action, note) =>
  videoApi.post(`/moderate/${id}`, { action, note });

/* ── Explorers ── */
/*
export const getExplorers = () => videoApi.get('/videos/explorers');

export default videoApi;

*/




// NEW

import axios from 'axios';

const RAW_BASE_URL = import.meta.env.VITE_API_URL || '';
const BASE_URL = RAW_BASE_URL ? `${RAW_BASE_URL.replace(/\/$/, '')}/api` : '/api';

/* ── Public API instance ── */
export const publicApi = axios.create({
  baseURL: BASE_URL,
});

/* ── Auth API instance ── */
export const authApi = axios.create({
  baseURL: BASE_URL,
});

authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('nammadiscover_token');

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ── Videos: public ── */
export const getVideos = (params = {}) => publicApi.get('/videos', { params });

export const getVideoById = (id) => publicApi.get(`/videos/${id}`);

export const getExplorers = () => publicApi.get('/videos/explorers');

/* ── Videos: protected ── */
export const uploadVideo = (formData, onProgress) =>
  authApi.post('/videos/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (evt) => {
      const percent = Math.round((evt.loaded * 100) / evt.total);
      if (onProgress) onProgress(percent);
    },
  });

export const updateVideo = (id, data) => authApi.put(`/videos/${id}`, data);

export const deleteVideo = (id) => authApi.delete(`/videos/${id}`);

export const getMyVideos = () => authApi.get('/videos/my');

/* ── Moderation: protected ── */
export const getModerationQueue = () => authApi.get('/moderate/queue');

export const moderateVideo = (id, action, note) =>
  authApi.post(`/moderate/${id}`, { action, note });

/* default exports if needed */
export default publicApi;