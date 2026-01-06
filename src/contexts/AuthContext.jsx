// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { LoginService } from '../modules/auth/application/login.service.js';
import { RegisterService } from '../modules/auth/application/register.service.js';
import { LogoutService } from '../modules/auth/application/logout.service.js';
import userService from '../services/storage/user.service.js';
import tokenService from '../services/storage/token.service.js';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loginService = new LoginService();
  const registerService = new RegisterService();
  const logoutService = new LogoutService();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      
      const storedUser = userService.getUser();
      const tokenValid = tokenService.isTokenValid();
      
      console.log('AuthContext: checkAuth - storedUser:', storedUser);
      console.log('AuthContext: checkAuth - tokenValid:', tokenValid);
      
      if (storedUser && tokenValid) {
        // Opcional: Validar con servidor
        setUser(storedUser);
        setIsAuthenticated(true);
        console.log('AuthContext: Usuario autenticado desde storage');
      } else {
        console.log('AuthContext: No hay usuario autenticado');
        await logout();
      }
    } catch (error) {
      console.error('AuthContext: Error en checkAuth:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      console.log('AuthContext: Iniciando login con credenciales:', credentials);
      setLoading(true);
      setError(null);
      
      // Limpiar credenciales - solo email y password
      const cleanCredentials = {
        email: credentials.email?.trim(),
        password: credentials.password
      };
      
      console.log('AuthContext: Credenciales limpias:', cleanCredentials);
      
      const result = await loginService.execute(cleanCredentials);
      console.log('AuthContext: Resultado del loginService:', result);
      
      if (result && result.user && result.token) {
        // Guardar en storage
        userService.saveUser(result.user);
        tokenService.saveToken(result.token);
        
        // Actualizar estado
        setUser(result.user);
        setIsAuthenticated(true);
        
        console.log('AuthContext: Login exitoso, usuario:', result.user);
        
        return { 
          success: true, 
          user: result.user,
          token: result.token 
        };
      } else {
        throw new Error('Respuesta inválida del servidor');
      }
    } catch (error) {
      console.error('AuthContext: Error en login:', error);
      const errorMsg = error.message || 'Error al iniciar sesión';
      setError(errorMsg);
      return { 
        success: false, 
        error: errorMsg 
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      console.log('AuthContext: Iniciando registro con:', userData);
      setLoading(true);
      setError(null);
      
      const result = await registerService.execute(userData);
      console.log('AuthContext: Resultado del registro:', result);
      
      if (result && result.success) {
        // No hacemos login automático después del registro
        // El usuario debe ir a login manualmente
        
        return { 
          success: true, 
          message: result.message || 'Usuario registrado exitosamente' 
        };
      } else {
        throw new Error(result?.message || 'Error en el registro');
      }
    } catch (error) {
      console.error('AuthContext: Error en registro:', error);
      const errorMsg = error.message || 'Error al registrar usuario';
      setError(errorMsg);
      return { 
        success: false, 
        error: errorMsg 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      // Ejecutar logout service si existe
      if (logoutService.execute) {
        await logoutService.execute();
      }
    } catch (error) {
      console.error('AuthContext: Error en logout:', error);
    } finally {
      // Limpiar storage
      userService.clearUser();
      tokenService.clearToken();
      
      // Limpiar estado
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
      
      setLoading(false);
      
      // Emitir evento
      window.dispatchEvent(new Event('auth:logout'));
      
      console.log('AuthContext: Logout completado');
    }
  };

  const updateProfile = async (updates) => {
    try {
      const updated = userService.updateUser(updates);
      if (updated) {
        setUser(updated);
      }
      return { success: true, user: updated };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};