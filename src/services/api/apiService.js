// src/services/api/apiService.js
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
    }
    return Promise.reject(error);
  }
);

// Funciones específicas que necesita Permisos.jsx
export const apiService = {
  // Métodos básicos
  get: async (endpoint, params = {}) => {
    const response = await api.get(endpoint, { params });
    return response.data;
  },

  post: async (endpoint, data = {}) => {
    const response = await api.post(endpoint, data);
    return response.data;
  },

  put: async (endpoint, data = {}) => {
    const response = await api.put(endpoint, data);
    return response.data;
  },

  delete: async (endpoint) => {
    const response = await api.delete(endpoint);
    return response.data;
  },

  patch: async (endpoint, data = {}) => {
    const response = await api.patch(endpoint, data);
    return response.data;
  },

  // Métodos específicos para usuarios y permisos
  getUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  createUserAdmin: async (data) => {
    const response = await api.post('/users/admin', data);
    return response.data;
  },

  listPermissionModules: async () => {
    const response = await api.get('/permissions/modules');
    return response.data;
  },

  getUserPermissions: async (userId) => {
    const response = await api.get(`/users/${userId}/permissions`);
    return response.data;
  },

  grantUserPermissions: async (userId, actionIds) => {
    const response = await api.post(`/users/${userId}/permissions/grant`, { actionIds });
    return response.data;
  },

  revokeUserPermissions: async (userId, actionIds) => {
    const response = await api.post(`/users/${userId}/permissions/revoke`, { actionIds });
    return response.data;
  },
};

