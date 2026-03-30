import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const videoApi = axios.create({ baseURL: BASE_URL });

// Inject auth token on every request
videoApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('nammadiscover_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ── Videos ── */

/**
 * Upload a video with progress tracking.
 * @param {FormData} formData
 * @param {Function} onProgress - (percent: number) => void
 */
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
export const getVideos = (params = {}) => videoApi.get('/videos', { params });

export const getVideoById = (id) => videoApi.get(`/videos/${id}`);

export const updateVideo = (id, data) => videoApi.put(`/videos/${id}`, data);

export const deleteVideo = (id) => videoApi.delete(`/videos/${id}`);

/* ── Moderation ── */

export const getModerationQueue = () => videoApi.get('/moderate/queue');

/**
 * @param {string} id - video id
 * @param {'approve'|'reject'} action
 * @param {string} note
 */
export const moderateVideo = (id, action, note) =>
  videoApi.post(`/moderate/${id}`, { action, note });

/* ── Explorers ── */

export const getExplorers = () => videoApi.get('/videos/explorers');

export default videoApi;
