// src/services/storage/user.service.js

const USER_KEY = 'auth_user';

// Función para guardar usuario
const saveUser = (user) => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return true;
  } catch (error) {
    console.error('Error saving user:', error);
    return false;
  }
};

// Función para obtener usuario
const getUser = () => {
  try {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

// Función para limpiar usuario
const clearUser = () => {
  try {
    localStorage.removeItem(USER_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing user:', error);
    return false;
  }
};

// Función para actualizar usuario
const updateUser = (updates) => {
  try {
    const current = getUser();
    if (!current) return null;
    
    const updated = { ...current, ...updates };
    saveUser(updated);
    return updated;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
};

// Exportar como objeto con todas las funciones
const userService = {
  saveUser,
  getUser,
  clearUser,
  updateUser
};

export default userService;