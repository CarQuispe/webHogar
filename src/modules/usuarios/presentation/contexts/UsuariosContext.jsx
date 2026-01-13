// src/modules/usuarios/presentation/contexts/UsuariosContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';
import { UsuariosService } from '../../application/servicios/usuarios.service.js';
import { ApiUsuariosRepository } from '../../infrastructure/api.usuarios.repository.js';

const UsuariosContext = createContext();

export const UsuariosProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUsuario, setCurrentUsuario] = useState(null);

  // IMPORTANTE: Crear la instancia dentro del componente, no en render
  const service = useCallback(() => {
    return new UsuariosService(new ApiUsuariosRepository());
  }, []);

  const cargarUsuarios = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await service().getUsuarios();
      setUsuarios(data);
      return data;
    } catch (err) {
      setError(err.message || 'Error al cargar usuarios');
      console.error('Error en cargarUsuarios:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service]);

  const obtenerUsuario = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await service().getUsuario(id);
      setCurrentUsuario(data);
      return data;
    } catch (err) {
      setError(err.message || 'Error al obtener usuario');
      console.error('Error en obtenerUsuario:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service]);

  const crearUsuario = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const nuevoUsuario = await service().crearUsuario(userData);
      // Asegurar que nuevoUsuario tiene la estructura correcta
      const usuarioCreado = nuevoUsuario.user || nuevoUsuario;
      setUsuarios(prev => [...prev, usuarioCreado]);
      return nuevoUsuario;
    } catch (err) {
      setError(err.message || 'Error al crear usuario');
      console.error('Error en crearUsuario:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service]);

  const actualizarUsuario = useCallback(async (id, userData) => {
    setLoading(true);
    setError(null);
    try {
      const usuarioActualizado = await service().actualizarUsuario(id, userData);
      setUsuarios(prev => prev.map(u => 
        u.id === id ? { ...u, ...usuarioActualizado } : u
      ));
      if (currentUsuario?.id === id) {
        setCurrentUsuario(prev => ({ ...prev, ...usuarioActualizado }));
      }
      return usuarioActualizado;
    } catch (err) {
      setError(err.message || 'Error al actualizar usuario');
      console.error('Error en actualizarUsuario:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service, currentUsuario]);

  const eliminarUsuario = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await service().eliminarUsuario(id);
      setUsuarios(prev => prev.filter(u => u.id !== id));
      if (currentUsuario?.id === id) {
        setCurrentUsuario(null);
      }
    } catch (err) {
      setError(err.message || 'Error al eliminar usuario');
      console.error('Error en eliminarUsuario:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service, currentUsuario]);

  const cambiarEstadoUsuario = useCallback(async (id, activo) => {
    setLoading(true);
    setError(null);
    try {
      await service().cambiarEstado(id, activo);
      setUsuarios(prev => prev.map(u => 
        u.id === id ? { ...u, activo } : u
      ));
      if (currentUsuario?.id === id) {
        setCurrentUsuario(prev => ({ ...prev, activo }));
      }
    } catch (err) {
      setError(err.message || 'Error al cambiar estado');
      console.error('Error en cambiarEstadoUsuario:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service, currentUsuario]);

  const restablecerContrasena = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service().restablecerContrasena(id);
      return result;
    } catch (err) {
      setError(err.message || 'Error al restablecer contraseña');
      console.error('Error en restablecerContrasena:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service]);

  const buscarUsuarios = useCallback(async (filtros = {}) => {
    setLoading(true);
    setError(null);
    try {
      const resultados = await service().buscarUsuarios(filtros);
      return resultados;
    } catch (err) {
      setError(err.message || 'Error al buscar usuarios');
      console.error('Error en buscarUsuarios:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service]);

  const limpiarError = useCallback(() => {
    setError(null);
  }, []);

  const limpiarUsuarioActual = useCallback(() => {
    setCurrentUsuario(null);
  }, []);

  const value = {
    usuarios,
    currentUsuario,
    loading,
    error,
    cargarUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    cambiarEstadoUsuario,
    restablecerContrasena,
    buscarUsuarios,
    limpiarError,
    limpiarUsuarioActual,
    setCurrentUsuario,
  };

  return (
    <UsuariosContext.Provider value={value}>
      {children}
    </UsuariosContext.Provider>
  );
};

export const useUsuarios = () => {
  const context = useContext(UsuariosContext);
  if (!context) {
    throw new Error('useUsuarios debe ser usado dentro de un UsuariosProvider');
  }
  return context;
};