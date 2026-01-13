// src/modules/usuarios/application/servicios/permisos.service.js
import { ApiPermisosRepository } from '../infrastructure/api.permisos.repository.js';

export class PermisosService {
  constructor(repository = null) {
    this.repository = repository || new ApiPermisosRepository();
  }

  async obtenerPermisos() {
    try {
      return await this.repository.findAll();
    } catch (error) {
      console.error('Error al obtener permisos:', error);
      throw error;
    }
  }

  async obtenerPermiso(id) {
    try {
      // Asumiendo que hay un endpoint para obtener un permiso específico
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/permissions/${id}`);
      return res.json();
    } catch (error) {
      console.error(`Error al obtener permiso ${id}:`, error);
      throw error;
    }
  }

  async crearPermiso(permisoData) {
    try {
      if (!permisoData.name) {
        throw new Error('El nombre del permiso es requerido');
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/permissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(permisoData),
      });
      return res.json();
    } catch (error) {
      console.error('Error al crear permiso:', error);
      throw error;
    }
  }

  async actualizarPermiso(id, permisoData) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/permissions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(permisoData),
      });
      return res.json();
    } catch (error) {
      console.error(`Error al actualizar permiso ${id}:`, error);
      throw error;
    }
  }

  async eliminarPermiso(id) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/permissions/${id}`, {
        method: 'DELETE',
      });
      return res.json();
    } catch (error) {
      console.error(`Error al eliminar permiso ${id}:`, error);
      throw error;
    }
  }

  async asignarPermisoUsuario(userId, permisoId) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/users/${userId}/permissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ permisoId }),
      });
      return res.json();
    } catch (error) {
      console.error(`Error al asignar permiso ${permisoId} al usuario ${userId}:`, error);
      throw error;
    }
  }

  async removerPermisoUsuario(userId, permisoId) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/users/${userId}/permissions/${permisoId}`, {
        method: 'DELETE',
      });
      return res.json();
    } catch (error) {
      console.error(`Error al remover permiso ${permisoId} del usuario ${userId}:`, error);
      throw error;
    }
  }

  async obtenerPermisosUsuario(userId) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/users/${userId}/permissions`);
      return res.json();
    } catch (error) {
      console.error(`Error al obtener permisos del usuario ${userId}:`, error);
      throw error;
    }
  }
}