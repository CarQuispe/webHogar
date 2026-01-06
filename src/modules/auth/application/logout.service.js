// src/modules/auth/application/logout.service.js
export class LogoutService {
  async execute() {
    try {
      console.log('LogoutService: Ejecutando logout');
      
      // Limpiar localStorage directamente (más seguro)
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('auth_') || key.startsWith('session_')) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      // Disparar eventos
      window.dispatchEvent(new Event('auth:logout'));
      
      return { success: true, message: 'Sesión cerrada exitosamente' };
    } catch (error) {
      console.error('LogoutService error:', error);
      return { success: false, error: error.message };
    }
  }
}