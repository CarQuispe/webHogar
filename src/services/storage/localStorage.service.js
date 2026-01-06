// src/services/storage/localStorage.service.js (si existe)
const getItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error getting item:', error);
    return null;
  }
};

const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error setting item:', error);
    return false;
  }
};

const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing item:', error);
    return false;
  }
};

const localStorageService = {
  getItem,
  setItem,
  removeItem
};

export default localStorageService;