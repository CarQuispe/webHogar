/**
 * Contrato del repositorio de usuarios
 * Capa: Dominio
 * No conoce implementación ni API
 */

// src/modules/usuarios/domain/repositories/usuarios.repository.interface.js
export class UsuariosRepositoryInterface {
  /**
   * @returns {Promise<Array<User>>}
   */
  findAll() {
    throw new Error('Method not implemented');
  }

  /**
   * @param {number|string} id
   * @returns {Promise<User>}
   */
  findById(id) {
    throw new Error('Method not implemented');
  }

  /**
   * @param {Object} userData
   * @returns {Promise<User>}
   */
  create(userData) {
    throw new Error('Method not implemented');
  }

  /**
   * @param {number|string} id
   * @param {Object} userData
   * @returns {Promise<User>}
   */
  update(id, userData) {
    throw new Error('Method not implemented');
  }
}
