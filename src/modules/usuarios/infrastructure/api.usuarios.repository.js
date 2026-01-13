const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export class ApiUsuariosRepository {
  async findAll() {
    const res = await fetch(`${API_URL}/users`);
    return res.json();
  }

  async findById(id) {
    const res = await fetch(`${API_URL}/users/${id}`);
    return res.json();
  }

  async findByCi(ci) {
    const res = await fetch(`${API_URL}/users/ci/${ci}`);
    return res.json();
  }

  async findByEmail(email) {
    const res = await fetch(`${API_URL}/users/email/${email}`);
    return res.json();
  }

  async create(data) {
    const res = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async update(id, data) {
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async delete(id) {
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  }

  async toggleStatus(id, activo) {
    const res = await fetch(`${API_URL}/users/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activo }),
    });
    return res.json();
  }

  async updatePermissions(userId, permissions) {
    const res = await fetch(`${API_URL}/users/${userId}/permissions`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ permissions }),
    });
    return res.json();
  }

  async resetPassword(userId) {
    const res = await fetch(`${API_URL}/users/${userId}/reset-password`, {
      method: 'POST',
    });
    return res.json();
  }
}