// src/modules/ninios/application/update-ninio.service.js
export class UpdateNinioService {
  constructor(niniosRepository) {
    this.niniosRepository = niniosRepository;
  }

  async execute(id, ninioData) {
    try {
      // Obtener niño actual
      const ninioActual = await this.niniosRepository.getById(id);
      if (!ninioActual) {
        throw new Error(`Niño con ID ${id} no encontrado`);
      }

      // Validar si se está cambiando el CI
      if (ninioData.ci && ninioData.ci !== ninioActual.ci) {
        const existing = await this.niniosRepository.getByCI(ninioData.ci);
        if (existing && existing.id !== id) {
          throw new Error(`Ya existe otro niño con CI: ${ninioData.ci}`);
        }
      }

      // Actualizar niño
      const ninioActualizado = await this.niniosRepository.update(id, {
        ...ninioData,
        fecha_actualizacion: new Date().toISOString()
      });

      return {
        success: true,
        data: ninioActualizado,
        message: 'Niño actualizado exitosamente'
      };
    } catch (error) {
      console.error('Error en UpdateNinioService:', error);
      throw error;
    }
  }
}