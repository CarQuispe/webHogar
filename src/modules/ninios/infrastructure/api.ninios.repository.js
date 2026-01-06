
// src/modules/ninios/infrastructure/api.ninios.repository.js
import { NiniosRepositoryInterface } from '../domain/repositories/ninios.repository.interface.js';
import { Ninio } from '../domain/entities/ninio.entity.js';

export class ApiNiniosRepository extends NiniosRepositoryInterface {
  constructor(baseURL = 'http://localhost:3000/api') {
    super();
    this.baseURL = baseURL;
  }

  async #makeRequest(endpoint, options = {}) {
    try {
      const token = localStorage.getItem('token');
      
      const defaultOptions = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        credentials: 'include', // Para manejar cookies si es necesario
      };

      const url = `${this.baseURL}${endpoint}`;
      console.log(`🌐 [API] Making request to: ${url}`, options.method || 'GET');
      
      const response = await fetch(url, {
        ...defaultOptions,
        ...options,
      });

      console.log(`📡 [API] Response status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        let errorData = {};
        try {
          errorData = await response.json();
        } catch (jsonError) {
          errorData = { message: await response.text() || `HTTP Error ${response.status}` };
        }
        
        const errorMessage = errorData.message || `Error ${response.status}: ${response.statusText}`;
        console.error(`❌ [API Error] ${url}:`, errorMessage, errorData);
        throw new Error(errorMessage);
      }

      // Para respuestas sin contenido (ej: DELETE exitoso)
      if (response.status === 204) {
        console.log(`✅ [API] ${url}: No content response (204)`);
        return null;
      }

      const data = await response.json();
      console.log(`✅ [API] ${url}: Success, response type:`, typeof data);
      return data;

    } catch (error) {
      console.error(`🔥 [API Request Failed] ${endpoint}:`, error);
      
      // Manejar errores de red específicos
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Error de conexión con el servidor. Verifica que el backend esté corriendo.');
      }
      
      throw error;
    }
  }

  async getAll(filters = {}) {
    try {
      console.log('📋 [NiniosRepository] Getting all ninios with filters:', filters);
      
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value);
        }
      });
      
      const queryString = queryParams.toString();
      const endpoint = `/ninios${queryString ? `?${queryString}` : ''}`;
      
      console.log('🔍 [NiniosRepository] Fetching from endpoint:', endpoint);
      
      const response = await this.#makeRequest(endpoint);
      
      // DEBUG: Ver estructura completa de la respuesta
      console.log('📦 [NiniosRepository] Raw API response:', response);
      console.log('📦 [NiniosRepository] Response type:', typeof response);
      console.log('📦 [NiniosRepository] Is array?', Array.isArray(response));
      
      if (response === null || response === undefined) {
        console.warn('⚠️ [NiniosRepository] Response is null or undefined');
        return [];
      }
      
      let dataArray = [];
      
      // Opción 1: Respuesta es directamente un array
      if (Array.isArray(response)) {
        console.log(`✅ [NiniosRepository] Response is direct array with ${response.length} items`);
        dataArray = response;
      }
      // Opción 2: Respuesta tiene propiedad 'data' que es un array
      else if (response.data && Array.isArray(response.data)) {
        console.log(`✅ [NiniosRepository] Response has 'data' array with ${response.data.length} items`);
        dataArray = response.data;
      }
      // Opción 3: Respuesta tiene otra estructura
      else if (typeof response === 'object') {
        console.log('🔎 [NiniosRepository] Response is object, searching for array...');
        
        // Buscar la primera propiedad que sea un array
        for (const key in response) {
          if (Array.isArray(response[key])) {
            console.log(`✅ [NiniosRepository] Found array in key "${key}" with ${response[key].length} items`);
            dataArray = response[key];
            break;
          }
        }
        
        // Si no encontramos array pero response tiene propiedades como un solo objeto
        if (dataArray.length === 0 && response.id !== undefined) {
          console.log('✅ [NiniosRepository] Response appears to be a single object, wrapping in array');
          dataArray = [response];
        }
      }
      
      // Validar y mapear los datos
      if (!Array.isArray(dataArray)) {
        console.warn('⚠️ [NiniosRepository] dataArray is not an array:', dataArray);
        return [];
      }
      
      console.log(`📊 [NiniosRepository] Mapping ${dataArray.length} items to Ninio entities`);
      
      const ninios = dataArray.map((data, index) => {
        try {
          const ninio = new Ninio(data);
          console.log(`   [${index}] Mapped:`, { 
            id: ninio.id, 
            nombre: ninio.nombre,
            ci: ninio.ci 
          });
          return ninio;
        } catch (mapError) {
          console.error(`❌ [NiniosRepository] Error mapping item at index ${index}:`, data, mapError);
          return null;
        }
      }).filter(item => item !== null);
      
      console.log(`🎉 [NiniosRepository] Successfully mapped ${ninios.length} ninios`);
      return ninios;
      
    } catch (error) {
      console.error('🔥 [NiniosRepository] Error in getAll:', error);
      
      // Para desarrollo: retornar array vacío en lugar de lanzar error
      // En producción podrías querer lanzar el error
      console.warn('⚠️ [NiniosRepository] Returning empty array due to error');
      return [];
    }
  }

  async getById(id) {
    try {
      console.log(`📋 [NiniosRepository] Getting ninio by ID: ${id}`);
      const response = await this.#makeRequest(`/ninios/${id}`);
      
      // Manejar diferentes estructuras de respuesta
      const data = response.data || response;
      
      if (!data) {
        console.warn(`⚠️ [NiniosRepository] No data found for ninio ID: ${id}`);
        return null;
      }
      
      console.log(`✅ [NiniosRepository] Found ninio:`, { 
        id: data.id, 
        nombre: data.nombre,
        ci: data.ci 
      });
      
      return new Ninio(data);
      
    } catch (error) {
      console.error(`🔥 [NiniosRepository] Error getting ninio ${id}:`, error);
      
      // Si es error 404 (no encontrado), retornar null
      if (error.message.includes('404')) {
        console.log(`ℹ️ [NiniosRepository] Ninio ${id} not found`);
        return null;
      }
      
      throw error;
    }
  }

  async getByCI(ci) {
    try {
      console.log(`📋 [NiniosRepository] Getting ninio by CI: ${ci}`);
      const response = await this.#makeRequest(`/ninios/ci/${ci}`);
      
      // Manejar diferentes estructuras de respuesta
      const data = response.data || response;
      
      if (!data) {
        console.log(`ℹ️ [NiniosRepository] No ninio found with CI: ${ci}`);
        return null;
      }
      
      console.log(`✅ [NiniosRepository] Found ninio by CI:`, { 
        id: data.id, 
        nombre: data.nombre,
        ci: data.ci 
      });
      
      return new Ninio(data);
      
    } catch (error) {
      console.error(`🔥 [NiniosRepository] Error getting ninio by CI ${ci}:`, error);
      
      // Si es error 404 (no encontrado), retornar null
      if (error.message.includes('404')) {
        console.log(`ℹ️ [NiniosRepository] Ninio with CI ${ci} not found`);
        return null;
      }
      
      throw error;
    }
  }

  async create(ninioData) {
    try {
      console.log(`📝 [NiniosRepository] Creating new ninio:`, ninioData);
      
      const response = await this.#makeRequest('/ninios', {
        method: 'POST',
        body: JSON.stringify(ninioData),
      });
      
      // Manejar diferentes estructuras de respuesta
      const data = response.data || response;
      
      console.log(`✅ [NiniosRepository] Ninio created successfully:`, { 
        id: data.id, 
        nombre: data.nombre 
      });
      
      return new Ninio(data);
      
    } catch (error) {
      console.error('🔥 [NiniosRepository] Error creating ninio:', error);
      throw error;
    }
  }

  async update(id, ninioData) {
    try {
      console.log(`✏️ [NiniosRepository] Updating ninio ${id}:`, ninioData);
      
      const response = await this.#makeRequest(`/ninios/${id}`, {
        method: 'PUT',
        body: JSON.stringify(ninioData),
      });
      
      // Manejar diferentes estructuras de respuesta
      const data = response.data || response;
      
      console.log(`✅ [NiniosRepository] Ninio ${id} updated successfully`);
      
      return new Ninio(data);
      
    } catch (error) {
      console.error(`🔥 [NiniosRepository] Error updating ninio ${id}:`, error);
      throw error;
    }
  }

  async delete(id) {
    try {
      console.log(`🗑️ [NiniosRepository] Deleting ninio ${id}`);
      
      await this.#makeRequest(`/ninios/${id}`, {
        method: 'DELETE',
      });
      
      console.log(`✅ [NiniosRepository] Ninio ${id} deleted successfully`);
      return true;
      
    } catch (error) {
      console.error(`🔥 [NiniosRepository] Error deleting ninio ${id}:`, error);
      throw error;
    }
  }

  async cambiarEstado(id, nuevoEstado, datosAdicionales = {}) {
    try {
      console.log(`🔄 [NiniosRepository] Changing estado for ninio ${id} to:`, nuevoEstado);
      
      const response = await this.#makeRequest(`/ninios/${id}/estado`, {
        method: 'PATCH',
        body: JSON.stringify({ estado: nuevoEstado, ...datosAdicionales }),
      });
      
      // Manejar diferentes estructuras de respuesta
      const data = response.data || response;
      
      console.log(`✅ [NiniosRepository] Estado changed successfully for ninio ${id}`);
      
      return new Ninio(data);
      
    } catch (error) {
      console.error(`🔥 [NiniosRepository] Error changing estado for ninio ${id}:`, error);
      throw error;
    }
  }

  // Método adicional para probar la conexión
  async testConnection() {
    try {
      console.log('🔧 [NiniosRepository] Testing connection to API...');
      const response = await this.#makeRequest('/health');
      console.log('✅ [NiniosRepository] API connection test successful:', response);
      return true;
    } catch (error) {
      console.error('❌ [NiniosRepository] API connection test failed:', error);
      return false;
    }
  }
}