import { ApiUsuariosRepository } from '../../infrastructure/api.usuarios.repository.js';

export class UsuariosService {
  constructor(repository = null) {
    this.repository = repository || new ApiUsuariosRepository();
  }

  async getUsuarios() {
    try {
      return await this.repository.findAll();
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  }

  async getUsuario(id) {
    try {
      return await this.repository.findById(id);
    } catch (error) {
      console.error(`Error al obtener usuario ${id}:`, error);
      throw error;
    }
  }

  async getUsuarioByCi(ci) {
    try {
      return await this.repository.findByCi(ci);
    } catch (error) {
      console.error(`Error al obtener usuario con CI ${ci}:`, error);
      throw error;
    }
  }

  async getUsuarioByEmail(email) {
    try {
      return await this.repository.findByEmail(email);
    } catch (error) {
      console.error(`Error al obtener usuario con email ${email}:`, error);
      throw error;
    }
  }

  async crearUsuario(userData) {
    try {
      // Validaciones según la base de datos
      if (!userData.ci || !userData.email || !userData.nombre) {
        throw new Error('CI, email y nombre son requeridos');
      }

      if (!userData.password && !userData.sendEmail) {
        throw new Error('Debe proporcionar una contraseña o seleccionar "Enviar por email"');
      }

      return await this.repository.create(userData);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  }

  async actualizarUsuario(id, userData) {
    try {
      return await this.repository.update(id, userData);
    } catch (error) {
      console.error(`Error al actualizar usuario ${id}:`, error);
      throw error;
    }
  }

  async eliminarUsuario(id) {
    try {
      return await this.repository.delete(id);
    } catch (error) {
      console.error(`Error al eliminar usuario ${id}:`, error);
      throw error;
    }
  }

  async cambiarEstado(id, activo) {
    try {
      return await this.repository.toggleStatus(id, activo);
    } catch (error) {
      console.error(`Error al cambiar estado del usuario ${id}:`, error);
      throw error;
    }
  }

  async actualizarPermisos(userId, permissions) {
    try {
      return await this.repository.updatePermissions(userId, permissions);
    } catch (error) {
      console.error(`Error al actualizar permisos del usuario ${userId}:`, error);
      throw error;
    }
  }

  async restablecerContrasena(userId) {
    try {
      return await this.repository.resetPassword(userId);
    } catch (error) {
      console.error(`Error al restablecer contraseña del usuario ${userId}:`, error);
      throw error;
    }
  }

  async buscarUsuarios(filtros = {}) {
    try {
      const usuarios = await this.getUsuarios();
      
      // Filtrar localmente (en un caso real sería filtrado en el backend)
      return usuarios.filter(usuario => {
        for (const [key, value] of Object.entries(filtros)) {
          if (value && usuario[key]) {
            if (typeof usuario[key] === 'string' && 
                !usuario[key].toLowerCase().includes(value.toLowerCase())) {
              return false;
            }
            if (typeof usuario[key] === 'boolean' && 
                usuario[key] !== value) {
              return false;
            }
          }
        }
        return true;
      });
    } catch (error) {
      console.error('Error al buscar usuarios:', error);
      throw error;
    }
  }
}