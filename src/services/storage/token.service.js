// src/services/storage/token.service.js

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';

// Función para guardar token
const saveToken = (token) => {
  try {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
    return true;
  } catch (error) {
    console.error('Error saving token:', error);
    return false;
  }
};

// Función para obtener token
const getToken = () => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? JSON.parse(token) : null;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

// Función para limpiar token
const clearToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing token:', error);
    return false;
  }
};

// Función para verificar si el token es válido
const isTokenValid = () => {
  const token = getToken();
  if (!token) return false;
  
  // Verificar expiración si existe
  if (token.expiresIn && token.createdAt) {
    const expirationTime = new Date(token.createdAt).getTime() + (token.expiresIn * 1000);
    return Date.now() < expirationTime;
  }
  
  return true; // Si no hay info de expiración, asumir válido
};

// Función para obtener header de autorización
const getAuthorizationHeader = () => {
  const token = getToken();
  if (!token || !token.accessToken) return null;
  
  return `${token.tokenType || 'Bearer'} ${token.accessToken}`;
};

// Exportar como objeto con todas las funciones
const tokenService = {
  saveToken,
  getToken,
  clearToken,
  isTokenValid,
  getAuthorizationHeader
};

export default tokenService;