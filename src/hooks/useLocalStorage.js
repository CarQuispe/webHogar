/**
 * useLocalStorage Hook
 * Hook personalizado para gestión de localStorage
 */

import { useState, useEffect, useCallback } from 'react';

export const useLocalStorage = (key, initialValue) => {
  // Estado para almacenar nuestro valor
  // Se pasa una función de inicialización al useState
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error al leer ${key} de localStorage:`, error);
      return initialValue;
    }
  });

  // Función para actualizar el valor
  const setValue = useCallback((value) => {
    try {
      // Permitir que value sea una función como en useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      if (valueToStore === undefined || valueToStore === null) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error al guardar ${key} en localStorage:`, error);
    }
  }, [key, storedValue]);

  // Función para eliminar el valor
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(undefined);
    } catch (error) {
      console.error(`Error al eliminar ${key} de localStorage:`, error);
    }
  }, [key]);

  // Sincronizar con cambios en otras pestañas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error al sincronizar ${key}:`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;
