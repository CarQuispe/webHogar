import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Redirigir a login si no está autenticado
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          console.error('Acceso denegado');
          break;
        case 404:
          console.error('Recurso no encontrado');
          break;
        case 500:
          console.error('Error interno del servidor');
          break;
        default:
          console.error('Error desconocido:', error.message);
      }
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor');
    } else {
      console.error('Error al hacer la petición:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Funciones API comunes
export const apiService = {
  // GET request
  get: async (endpoint, params = {}) => {
    const response = await api.get(endpoint, { params });
    return response.data;
  },

  // POST request
  post: async (endpoint, data = {}) => {
    const response = await api.post(endpoint, data);
    return response.data;
  },

  // PUT request
  put: async (endpoint, data = {}) => {
    const response = await api.put(endpoint, data);
    return response.data;
  },

  // DELETE request
  delete: async (endpoint) => {
    const response = await api.delete(endpoint);
    return response.data;
  },

  // PATCH request
  patch: async (endpoint, data = {}) => {
    const response = await api.patch(endpoint, data);
    return response.data;
  },

  // Upload file
  upload: async (endpoint, file, onProgress = null) => {
    const formData = new FormData();
    formData.append('file', file);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    if (onProgress) {
      config.onUploadProgress = onProgress;
    }

    const response = await api.post(endpoint, formData, config);
    return response.data;
  },
};

export default api;