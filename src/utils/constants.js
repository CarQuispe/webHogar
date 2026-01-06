// src/utils/constants.js

// ======================
// CLAVES DE ALMACENAMIENTO
// ======================
export const STORAGE_KEYS = {
  // Autenticación
  AUTH_TOKEN: 'auth_token',
  AUTH_REFRESH_TOKEN: 'auth_refresh_token',
  AUTH_USER: 'auth_user',
  
  // Tema/UI
  THEME_PREFERENCE: 'theme_preference',
  LANGUAGE: 'app_language',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',
  
  // Configuración
  APP_SETTINGS: 'app_settings',
  NOTIFICATIONS_ENABLED: 'notifications_enabled',
  
  // Cache
  API_CACHE: 'api_cache_',
  FORM_DATA: 'form_data_'
};

// ======================
// ROLES DE USUARIO
// ======================
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  STAFF: 'STAFF', 
  USER: 'USER',
  GUEST: 'GUEST'
};

// ======================
// RUTAS DE LA APLICACIÓN
// ======================
export const APP_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  NINIOS: '/ninios',
  NINIOS_CREATE: '/ninios/create',
  NINIOS_EDIT: '/ninios/edit/:id',
  NINIOS_DETAIL: '/ninios/:id'
};

// ======================
// CONFIGURACIÓN DE API
// ======================
export const API_CONFIG = {
  TIMEOUT: 30000, // 30 segundos
  RETRY_ATTEMPTS: 3,
  CACHE_DURATION: 5 * 60 * 1000 // 5 minutos
};

// ======================
// TEMAS DISPONIBLES
// ======================
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

// ======================
// IDIOMAS DISPONIBLES
// ======================
export const LANGUAGES = {
  ES: 'es',
  EN: 'en'
};

// ======================
// VALORES POR DEFECTO
// ======================
export const DEFAULT_VALUES = {
  THEME: THEMES.LIGHT,
  LANGUAGE: LANGUAGES.ES,
  PAGE_SIZE: 10,
  ITEMS_PER_PAGE: [10, 25, 50, 100]
};

// ======================
// MENSAJES DE ERROR
// ======================
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet.',
  SERVER_ERROR: 'Error del servidor. Intenta más tarde.',
  UNAUTHORIZED: 'No autorizado. Inicia sesión nuevamente.',
  FORBIDDEN: 'Acceso denegado.',
  NOT_FOUND: 'Recurso no encontrado.',
  VALIDATION_ERROR: 'Error de validación.',
  UNKNOWN_ERROR: 'Error desconocido.'
};

// ======================
// EXPORTACIÓN POR DEFECTO
// ======================
export default {
  STORAGE_KEYS,
  USER_ROLES,
  APP_ROUTES,
  API_CONFIG,
  THEMES,
  LANGUAGES,
  DEFAULT_VALUES,
  ERROR_MESSAGES
};