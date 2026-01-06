/**
 * Combina múltiples clases de CSS
 * @param {...any} args - Clases a combinar
 * @returns {string} - Clases combinadas
 */
export function classNames(...args) {
  const classes = [];
  
  args.forEach(arg => {
    if (!arg) return;
    
    if (typeof arg === 'string') {
      classes.push(arg);
    } else if (typeof arg === 'object') {
      Object.keys(arg).forEach(key => {
        if (arg[key]) {
          classes.push(key);
        }
      });
    }
  });
  
  return classes.join(' ');
}

/**
 * Formatea una fecha
 * @param {Date|string} date - Fecha a formatear
 * @param {string} format - Formato deseado
 * @returns {string} - Fecha formateada
 */
export function formatDate(date, format = 'es-ES') {
  if (!date) return '';
  
  const d = new Date(date);
  
  if (format === 'es-ES') {
    return d.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
  
  if (format === 'datetime') {
    return d.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  return d.toLocaleDateString();
}

/**
 * Formatea una cantidad monetaria
 * @param {number} amount - Cantidad
 * @param {string} currency - Moneda
 * @returns {string} - Cantidad formateada
 */
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

/**
 * Valida un email
 * @param {string} email - Email a validar
 * @returns {boolean} - Si es válido
 */
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Debounce function
 * @param {Function} func - Función a debounce
 * @param {number} wait - Tiempo de espera
 * @returns {Function} - Función debounced
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Trunca un texto
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} - Texto truncado
 */
export function truncateText(text, maxLength = 100) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Genera un ID único
 * @returns {string} - ID único
 */
export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Copia texto al portapapeles
 * @param {string} text - Texto a copiar
 * @returns {Promise<boolean>} - Si se copió correctamente
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Error al copiar: ', err);
    return false;
  }
}