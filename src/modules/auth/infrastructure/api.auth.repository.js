// src/modules/auth/infrastructure/api.auth.repository.js
// NOTA: Considera renombrar a api-auth.repository.js para consistencia

// Importaciones - Asegúrate de que estos archivos existan
import { IAuthRepository } from '../domain/repositories/auth.repository.interface.js';
import{User} from '../domain/entities/user.entity.js';
import { AuthToken } from '../domain/entities/auth-token.entity.js';

import api from '../../../services/api/axios.config.js';

export class ApiAuthRepository extends IAuthRepository {
  constructor() {
    super();
    this.baseUrl = '/auth';
  }

  async login(credentials) {
    try {
      console.log('Enviando login a:', `${this.baseUrl}/login`);
      const response = await api.post(`${this.baseUrl}/login`, credentials);
      
      // Verificar estructura de respuesta
      if (!response.data) {
        throw new Error('Respuesta del servidor inválida');
      }

      const user = new User({
        id: response.data.user?.id || response.data.id,
        email: response.data.user?.email || credentials.email,
        name: response.data.user?.name || 'Usuario',
        role: response.data.user?.role || 'USER',
        isActive: response.data.user?.isActive ?? true
      });

      const token = new AuthToken({
        accessToken: response.data.accessToken || response.data.token,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn || 3600 // Valor por defecto
      });

      return { user, token };
    } catch (error) {
      throw this._handleError(error, 'login');
    }
  }

  async register(userData) {
    try {
      console.log('Enviando registro a:', `${this.baseUrl}/register`);
      const response = await api.post(`${this.baseUrl}/register`, userData);
      
      if (!response.data) {
        throw new Error('Respuesta del servidor inválida');
      }

      const user = new User({
        id: response.data.user?.id || response.data.id,
        email: response.data.user?.email || userData.email,
        name: response.data.user?.name || userData.name,
        role: response.data.user?.role || 'USER',
        isActive: response.data.user?.isActive ?? true
      });

      const token = new AuthToken({
        accessToken: response.data.accessToken || response.data.token,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn || 3600
      });

      return { user, token };
    } catch (error) {
      throw this._handleError(error, 'register');
    }
  }

  async logout() {
    try {
      console.log('Enviando logout a:', `${this.baseUrl}/logout`);
      await api.post(`${this.baseUrl}/logout`);
      return true;
    } catch (error) {
      // Si falla el logout en el servidor, igual limpiar localmente
      console.warn('Logout server failed:', error.message || error);
      return true; // Siempre retornar true para limpieza local
    }
  }

  async refreshToken(refreshToken) {
    try {
      console.log('Refrescando token');
      const response = await api.post(`${this.baseUrl}/refresh-token`, {
        refreshToken
      });

      if (!response.data) {
        throw new Error('Respuesta del servidor inválida');
      }

      return new AuthToken({
        accessToken: response.data.accessToken || response.data.token,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn || 3600
      });
    } catch (error) {
      throw this._handleError(error, 'refreshToken');
    }
  }

  async getCurrentUser() {
    try {
      console.log('Obteniendo usuario actual de:', `${this.baseUrl}/me`);
      const response = await api.get(`${this.baseUrl}/me`);
      
      if (!response.data) {
        throw new Error('Respuesta del servidor inválida');
      }

      return new User({
        id: response.data.id,
        email: response.data.email,
        name: response.data.name || 'Usuario',
        role: response.data.role || 'USER',
        isActive: response.data.isActive ?? true,
        createdAt: response.data.createdAt ? new Date(response.data.createdAt) : new Date(),
        updatedAt: response.data.updatedAt ? new Date(response.data.updatedAt) : new Date()
      });
    } catch (error) {
      throw this._handleError(error, 'getCurrentUser');
    }
  }

  async updateProfile(updates) {
    try {
      console.log('Actualizando perfil');
      const response = await api.put(`${this.baseUrl}/profile`, updates);
      
      if (!response.data) {
        throw new Error('Respuesta del servidor inválida');
      }

      return new User({
        id: response.data.id,
        email: response.data.email,
        name: response.data.name,
        role: response.data.role,
        isActive: response.data.isActive
      });
    } catch (error) {
      throw this._handleError(error, 'updateProfile');
    }
  }

  _handleError(error, operation = 'operation') {
    console.error(`Error en ${operation}:`, error);
    
    if (error.response) {
      // Error del servidor (respuesta recibida)
      const { status, data } = error.response;
      
      // Mensajes específicos por código de estado
      switch (status) {
        case 400:
          throw new Error(data?.message || 'Solicitud incorrecta');
        case 401:
          throw new Error(data?.message || 'Credenciales inválidas');
        case 403:
          throw new Error(data?.message || 'Acceso denegado');
        case 404:
          throw new Error(data?.message || 'Recurso no encontrado');
        case 409:
          throw new Error(data?.message || 'El usuario ya existe');
        case 422:
          // Manejo de errores de validación
          if (data?.errors) {
            const errors = Object.values(data.errors).flat().join(', ');
            throw new Error(`Errores de validación: ${errors}`);
          }
          throw new Error(data?.message || 'Datos inválidos');
        case 500:
          throw new Error(data?.message || 'Error interno del servidor');
        default:
          throw new Error(data?.message || `Error del servidor (${status})`);
      }
    } else if (error.request) {
      // Error de red (sin respuesta)
      if (error.code === 'ECONNABORTED') {
        throw new Error('Tiempo de espera agotado. Verifica tu conexión.');
      }
      throw new Error('Error de conexión con el servidor. Verifica tu red.');
    } else {
      // Error de configuración
      if (error.message?.includes('Network Error')) {
        throw new Error('No se pudo conectar al servidor. Verifica la URL.');
      }
      throw new Error(error.message || 'Error en la configuración de la solicitud');
    }
  }
}