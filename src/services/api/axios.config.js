import axios from 'axios';
import tokenService from '../storage/token.service.js';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token
api.interceptors.request.use(
  (config) => {
    const token = tokenService.getAuthorizationHeader();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Intentar refresh token
        const token = tokenService.getToken();
        if (token?.refreshToken) {
          // Aquí implementar lógica de refresh token
          // const newToken = await authService.refreshToken(token.refreshToken);
          // tokenService.saveToken(newToken);
          
          // Reintentar la solicitud original
          // return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        window.dispatchEvent(new Event('auth:session-expired'));
      }
    }

    return Promise.reject(error);
  }
);

export default api;