// src/modules/ninios/application/get-ninios.service.js
// src/modules/ninios/application/get-ninios.service.js
export class GetNiniosService {
  constructor(niniosRepository) {
    this.niniosRepository = niniosRepository;
  }

  async execute(filters = {}) {
    try {
      console.log('🚀 [GetNiniosService] Executing with filters:', filters);
      
      const ninios = await this.niniosRepository.getAll(filters);
      
      console.log(`✅ [GetNiniosService] Retrieved ${ninios.length} ninios`);
      
      return ninios;
    } catch (error) {
      console.error('🔥 [GetNiniosService] Error:', error);
      
      // En desarrollo, retornar array vacío para evitar romper la UI
      console.warn('⚠️ [GetNiniosService] Returning empty array due to error');
      return [];
    }
  }
}