/**
 * useApi Hook
 * Hook personalizado para realizar llamadas a la API
 */

import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { logout } = useAuth();

  const handleRequest = useCallback(async (apiCall, options = {}) => {
    const { showError = true, onSuccess, onError } = options;

    setLoading(true);
    setError(null);

    try {
      const response = await apiCall();
      
      if (onSuccess) {
        onSuccess(response);
      }
      
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error en la petición';
      
      // Si es 401, cerrar sesión
      if (err.response?.status === 401) {
        logout();
      }
      
      setError(errorMessage);
      
      if (showError && onError) {
        onError(errorMessage);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [logout]);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    handleRequest,
    resetError,
  };
};

export default useApi;
