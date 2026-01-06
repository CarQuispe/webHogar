// src/modules/ninios/domain/repositories/ninios.repository.interface.js
export class NiniosRepositoryInterface {
  async getAll(filters = {}) {
    throw new Error('Method not implemented');
  }
  
  async getById(id) {
    throw new Error('Method not implemented');
  }
  
  async getByCI(ci) {
    throw new Error('Method not implemented');
  }
  
  async create(ninioData) {
    throw new Error('Method not implemented');
  }
  
  async update(id, ninioData) {
    throw new Error('Method not implemented');
  }
  
  async delete(id) {
    throw new Error('Method not implemented');
  }
  
  async cambiarEstado(id, nuevoEstado, datosAdicionales = {}) {
    throw new Error('Method not implemented');
  }
}