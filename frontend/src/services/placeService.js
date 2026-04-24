import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || '';

const placeApi = axios.create({
  baseURL: `${BASE_URL}/api`,
});

placeApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('nammadiscover_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// submits to locations collection
export const createPlace = (data) => placeApi.post('/locations', data);

export default placeApi;