// src/contexts/PermissionsContext.jsx
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { apiService } from '../services/api/apiService';
import { useAuth } from './AuthContext';

const PermissionsContext = createContext(null);

export const usePermissions = () => useContext(PermissionsContext);

export const PermissionsProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [modules, setModules] = useState([]);
  const [flat, setFlat] = useState([]);
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchPermissions = useCallback(async () => {
    if (!isAuthenticated) return;
    
    try {
      setLoading(true);
      // Intenta obtener permisos del endpoint específico
      let data;
      try {
        data = await apiService.get('/auth/permissions/me');
      } catch (err) {
        // Fallback: si no existe el endpoint, usar datos básicos
        data = {
          modules: [],
          flat: user?.role === 'ADMIN' ? ['ALL:ALL'] : [],
          isAdmin: user?.role === 'ADMIN',
          version: 1
        };
      }
      
      console.debug('[Permissions] permisos cargados:', data);
      const mods = data.modules || [];
      setModules(mods);
      
      let flatResp = data.flat;
      if (!flatResp || !Array.isArray(flatResp)) {
        flatResp = mods.flatMap(m => 
          (m.acciones || m.actions || []).map(a => `${m.module || m.code || m.module_name}:${a.action || a}`)
        );
      }
      setFlat(flatResp);
      setVersion(data.version || 0);
      setIsAdmin(!!data.isAdmin || user?.role === 'ADMIN');
      setError(null);
    } catch (e) {
      console.error('[Permissions] error:', e);
      setError(e?.message || 'Error cargando permisos');
    } finally { 
      setLoading(false); 
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPermissions();
    } else {
      // Reset al logout
      setModules([]);
      setFlat([]);
      setVersion(0);
      setIsAdmin(false);
      setError(null);
      setLoading(false);
    }
  }, [isAuthenticated, fetchPermissions]);

  const refresh = () => fetchPermissions();

  // Fallback para administradores conocidos
  const isAdminFallback = (() => {
    if (!user) return false;
    const adminEmails = new Set(['admin@gmail.com', 'nico03vj@gmail.com', 'agustinrobolero@gmail.com']);
    const adminRoles = new Set(['ADMIN', 'SUPER_ADMIN']);
    const email = (user?.email || '').toLowerCase();
    return adminEmails.has(email) || adminRoles.has(user?.role);
  })();

  const has = (mod, action = 'VIEW') => {
    const allow = (isAdmin || isAdminFallback) || flat.includes(`${mod}:${action}`);
    return allow;
  };

  const can = (action, resource) => {
    if (isAdmin || isAdminFallback) return true;
    
    // Verificar permisos específicos
    const hasPermission = flat.some(perm => {
      const [permModule, permAction] = perm.split(':');
      return permModule === resource && permAction === action;
    });
    
    return hasPermission;
  };

  return (
    <PermissionsContext.Provider value={{ 
      modules, 
      flat, 
      version, 
      loading, 
      error, 
      refresh, 
      has, 
      can,
      isAdmin: isAdmin || isAdminFallback 
    }}>
      {children}
    </PermissionsContext.Provider>
  );
};