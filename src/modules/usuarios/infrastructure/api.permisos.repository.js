// src/modules/usuarios/infrastructure/api.permisos.repository.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export class ApiPermisosRepository {
  async findAll() {
    const res = await fetch(`${API_URL}/api/permissions`);
    return res.json();
  }
}
