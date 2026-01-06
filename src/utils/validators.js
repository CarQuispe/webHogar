// src/utils/validators.js
export const validateEmail = (email) => {
  if (!email) return 'El email es requerido';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Email inválido';
  return null;
};

export const validatePassword = (password) => {
  if (!password) return 'La contraseña es requerida';
  if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
  // Opcional: agregar más reglas
  // if (!/[A-Z]/.test(password)) return 'Debe contener al menos una mayúscula';
  // if (!/\d/.test(password)) return 'Debe contener al menos un número';
  return null;
};

export const validatePasswordMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) return 'Las contraseñas no coinciden';
  return null;
};

export const validateName = (name, fieldName = 'Nombre') => {
  if (!name || name.trim().length === 0) return `${fieldName} es requerido`;
  if (name.length < 2) return `${fieldName} debe tener al menos 2 caracteres`;
  if (name.length > 100) return `${fieldName} es demasiado largo`;
  return null;
};

export const validateUsername = (username) => {
  if (!username) return 'El nombre de usuario es requerido';
  if (username.length < 3) return 'El nombre de usuario debe tener al menos 3 caracteres';
  if (username.length > 30) return 'El nombre de usuario es demasiado largo';
  if (!/^[a-zA-Z0-9_]+$/.test(username)) return 'Solo se permiten letras, números y guiones bajos';
  return null;
};

export const validatePhone = (phone) => {
  if (!phone) return null; // Teléfono es opcional
  const phoneRegex = /^[0-9\s\-\+\(\)]{7,15}$/;
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) return 'Teléfono inválido';
  return null;
};