// src/modules/auth/application/register.service.js

import tokenService from '../../../services/storage/token.service.js';
import { ApiAuthRepository } from '../infrastructure/api.auth.repository.js';
import userService from '../../../services/storage/user.service.js';

// Intentar importar validadores externos, si falla usar versiones locales
let validateEmail, validatePassword, validateName, validatePasswordMatch;

try {
  // Intentar importar desde validators.js
  const validators = await import('../../../utils/validators.js');
  validateEmail = validators.validateEmail;
  validatePassword = validators.validatePassword;
  validateName = validators.validateName;
  validatePasswordMatch = validators.validatePasswordMatch;
} catch (error) {
  console.warn('No se pudo importar validators.js, usando validadores locales');
  
  // Definir validadores locales como fallback
  validateEmail = (email) => {
    if (!email) return 'El email es requerido';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Email inválido';
    return null;
  };
  
  validatePassword = (password) => {
    if (!password) return 'La contraseña es requerida';
    if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    return null;
  };
  
  validateName = (name, fieldName = 'Nombre') => {
    if (!name || name.trim().length === 0) return `${fieldName} es requerido`;
    if (name.length < 2) return `${fieldName} debe tener al menos 2 caracteres`;
    return null;
  };
  
  validatePasswordMatch = (password, confirmPassword) => {
    if (password !== confirmPassword) return 'Las contraseñas no coinciden';
    return null;
  };
}

export class RegisterService {
  constructor(authRepository = null) {
    this.authRepository = authRepository || new ApiAuthRepository();
    console.log('RegisterService creado con:', this.authRepository.constructor.name);
  }

  /**
   * Valida los datos de registro
   */
  _validateRegistrationData(userData) {
    const errors = {};
    
    // Validar email
    const emailError = validateEmail(userData.email);
    if (emailError) errors.email = emailError;
    
    // Validar contraseña
    const passwordError = validatePassword(userData.password);
    if (passwordError) errors.password = passwordError;
    
    // Validar coincidencia de contraseñas si existe confirmPassword
    if (userData.confirmPassword) {
      const passwordMatchError = validatePasswordMatch(
        userData.password,
        userData.confirmPassword
      );
      if (passwordMatchError) errors.confirmPassword = passwordMatchError;
    }
    
    // Validar nombre (puede ser solo name o firstName/lastName)
    if (userData.name) {
      const nameError = validateName(userData.name, 'Nombre completo');
      if (nameError) errors.name = nameError;
    }
    
    if (userData.firstName) {
      const firstNameError = validateName(userData.firstName, 'Nombre');
      if (firstNameError) errors.firstName = firstNameError;
    }
    
    if (userData.lastName) {
      const lastNameError = validateName(userData.lastName, 'Apellido');
      if (lastNameError) errors.lastName = lastNameError;
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * Prepara los datos para enviar al servidor
   */
  _prepareUserDataForApi(userData) {
    // Crear copia para no modificar el original
    const dataToSend = { ...userData };
    
    // Eliminar confirmPassword ya que no se envía al servidor
    delete dataToSend.confirmPassword;
    
    // Si tenemos firstName y lastName pero no name, crear name
    if (!dataToSend.name && dataToSend.firstName && dataToSend.lastName) {
      dataToSend.name = `${dataToSend.firstName} ${dataToSend.lastName}`;
    }
    
    // Asegurar que el campo 'name' exista (requerido por la base de datos)
    if (!dataToSend.name) {
      if (dataToSend.firstName) {
        dataToSend.name = dataToSend.firstName;
      } else if (dataToSend.email) {
        // Usar parte del email como nombre por defecto
        dataToSend.name = dataToSend.email.split('@')[0];
      }
    }
    
    return dataToSend;
  }

  /**
   * Ejecuta el registro de usuario
   */
  async execute(userData) {
    try {
      console.log('RegisterService: Validando datos de registro', userData);
      
      // Validar datos de registro
      const validation = this._validateRegistrationData(userData);
      if (!validation.isValid) {
        console.log('RegisterService: Errores de validación', validation.errors);
        throw {
          type: 'VALIDATION_ERROR',
          errors: validation.errors,
          message: 'Por favor, corrige los errores en el formulario'
        };
      }
      
      // Preparar datos para enviar
      const dataToSend = this._prepareUserDataForApi(userData);
      console.log('RegisterService: Datos preparados para API', dataToSend);
      
      // Llamar al repositorio para registrar
      const { user, token } = await this.authRepository.register(dataToSend);
      
      console.log('RegisterService: Registro exitoso', { user, token });
      
      // Guardar en almacenamiento
      if (tokenService && typeof tokenService.saveToken === 'function') {
        tokenService.saveToken(token);
      } else {
        console.warn('tokenService.saveToken no está disponible');
      }
      
      if (userService && typeof userService.saveUser === 'function') {
        userService.saveUser(user);
      } else {
        console.warn('userService.saveUser no está disponible');
      }
      
      // Emitir evento de registro exitoso
      window.dispatchEvent(new CustomEvent('auth:register', { 
        detail: { user, token } 
      }));
      
      return {
        success: true,
        user,
        token,
        message: 'Usuario registrado exitosamente. Redirigiendo...'
      };
      
    } catch (error) {
      console.error('RegisterService error:', error);
      
      // Manejar diferentes tipos de error
      if (error.type === 'VALIDATION_ERROR') {
        throw error; // Ya tiene estructura adecuada
      }
      
      // Manejar errores del repositorio
      let errorMessage = 'Error al registrar usuario';
      let errorDetails = {};
      
      if (error.message.includes('conexión') || error.message.includes('red')) {
        errorMessage = 'Error de conexión con el servidor. Verifica tu internet.';
      } else if (error.message.includes('ya existe')) {
        errorMessage = 'El email ya está registrado. ¿Olvidaste tu contraseña?';
        errorDetails = { email: 'Este email ya está en uso' };
      } else if (error.message.includes('inválido') || error.message.includes('validación')) {
        errorMessage = 'Datos inválidos proporcionados';
      } else if (error.response?.status === 422) {
        // Errores de validación del backend
        errorMessage = 'Errores en los datos enviados';
        errorDetails = error.response.data?.errors || {};
      }
      
      throw {
        type: 'REGISTRATION_ERROR',
        message: errorMessage,
        details: errorDetails,
        originalError: error
      };
    }
  }

  /**
   * Método para validar email único (validación en tiempo real)
   */
  async validateEmailUnique(email) {
    try {
      // Normalmente esto haría una petición al backend
      // Para desarrollo, podemos simularlo
      console.log('Validando email único:', email);
      
      // Validación básica del formato
      const emailError = validateEmail(email);
      if (emailError) {
        return { 
          isValid: false, 
          message: emailError 
        };
      }
      
      // En producción, aquí haríamos una petición a /auth/check-email
      // const response = await this.authRepository.checkEmail(email);
      
      // Por ahora retornar siempre disponible
      return { 
        isValid: true, 
        message: null,
        suggestion: null
      };
      
    } catch (error) {
      console.error('Error validando email único:', error);
      return { 
        isValid: false, 
        message: 'Error al validar el email. Intenta de nuevo.' 
      };
    }
  }

  /**
   * Método para validar nombre de usuario único (si aplica)
   */
  async validateUsernameUnique(username) {
    try {
      if (!username || username.length < 3) {
        return {
          isValid: false,
          message: 'El nombre de usuario debe tener al menos 3 caracteres'
        };
      }
      
      // Validar caracteres permitidos
      const usernameRegex = /^[a-zA-Z0-9_]+$/;
      if (!usernameRegex.test(username)) {
        return {
          isValid: false,
          message: 'Solo se permiten letras, números y guiones bajos'
        };
      }
      
      // En producción, verificar disponibilidad en el backend
      // const response = await this.authRepository.checkUsername(username);
      
      return {
        isValid: true,
        message: null
      };
      
    } catch (error) {
      console.error('Error validando nombre de usuario:', error);
      return {
        isValid: false,
        message: 'Error al validar el nombre de usuario'
      };
    }
  }

  /**
   * Genera sugerencias de contraseña segura
   */
  generatePasswordSuggestions() {
    const suggestions = [];
    
    // Generar algunas contraseñas sugeridas
    const adjectives = ['Fuerte', 'Segura', 'Unica', 'Personal', 'Secreta'];
    const nouns = ['Contraseña123', 'Clave456', 'Pass789', 'Key2024'];
    const symbols = ['!', '@', '#', '$', '&'];
    
    for (let i = 0; i < 3; i++) {
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      
      suggestions.push(`${adj}${noun}${symbol}`);
    }
    
    return suggestions;
  }

  /**
   * Verifica fortaleza de contraseña
   */
  checkPasswordStrength(password) {
    if (!password) return { score: 0, strength: 'Débil' };
    
    let score = 0;
    
    // Longitud
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Complejidad
    if (/[a-z]/.test(password)) score += 1; // Minúsculas
    if (/[A-Z]/.test(password)) score += 1; // Mayúsculas
    if (/[0-9]/.test(password)) score += 1; // Números
    if (/[^a-zA-Z0-9]/.test(password)) score += 1; // Símbolos
    
    // Determinar fortaleza
    if (score >= 5) return { score, strength: 'Muy Fuerte' };
    if (score >= 4) return { score, strength: 'Fuerte' };
    if (score >= 3) return { score, strength: 'Moderada' };
    return { score, strength: 'Débil' };
  }
}