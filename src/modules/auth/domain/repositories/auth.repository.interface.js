// Interfaz que define el contrato para el repositorio de autenticación
// src/modules/auth/domain/repositories/auth.repository.interface.js

export class IAuthRepository {
  async login(credentials) {
    throw new Error('Method not implemented: login');
  }

  async register(userData) {
    throw new Error('Method not implemented: register');
  }

  async logout() {
    throw new Error('Method not implemented: logout');
  }

  async refreshToken(refreshToken) {
    throw new Error('Method not implemented: refreshToken');
  }

  async getCurrentUser() {
    throw new Error('Method not implemented: getCurrentUser');
  }

  async updateProfile(updates) {
    throw new Error('Method not implemented: updateProfile');
  }
}