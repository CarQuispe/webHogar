import { apiClient } from './axios.config';
import { getToken, clearTokens } from '../storage/token.service';

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      clearTokens();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);
