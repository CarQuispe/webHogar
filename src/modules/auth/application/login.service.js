// src/modules/auth/application/login.service.js - VERSIÓN CORREGIDA
import { ApiAuthRepository } from '../infrastructure/api.auth.repository.js';
import tokenService from '../../../services/storage/token.service.js';
import userService from '../../../services/storage/user.service.js';

export class LoginService {
  constructor(authRepository = null) {
    console.log('LoginService constructor called');
    this.authRepository = authRepository || new ApiAuthRepository();
  }

  async execute(credentials) {
    console.log('LoginService.execute called with:', credentials);
    try {
      // Validación básica
      if (!credentials.email || !credentials.password) {
        throw new Error('Email y contraseña son requeridos');
      }

      // Llamar al repositorio
      const { user, token } = await this.authRepository.login(credentials);
      
      // Guardar en almacenamiento
      if (tokenService && typeof tokenService.saveToken === 'function') {
        tokenService.saveToken(token);
      } else {
        console.warn('tokenService.saveToken no disponible, usando localStorage directo');
        localStorage.setItem('auth_token', JSON.stringify(token));
      }
      
      if (userService && typeof userService.saveUser === 'function') {
        userService.saveUser(user);
      } else {
        localStorage.setItem('auth_user', JSON.stringify(user));
      }

      // Emitir evento
      window.dispatchEvent(new CustomEvent('auth:login', { detail: user }));

      return { user, token };
    } catch (error) {
      console.error('LoginService error:', error);
      throw error;
    }
  }

  async validateSession() {
    try {
      const token = tokenService?.getToken?.();
      if (!token) return false;
      
      // Verificación simple para desarrollo
      return true;
    } catch (error) {
      console.error('Session validation error:', error);
      return false;
    }
  }
}