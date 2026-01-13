// src/modules/auth/presentation/pages/UsuariosListPage.jsx
// 

import { useEffect, useState } from 'react';

export default function UsuariosListPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ⚠️ Simulación temporal
    // Luego aquí llamarás a tu UsersRepository
    const fakeUsers = [
      {
        id: 1,
        name: 'Administrador',
        email: 'admin@sistemahogar.com',
        role: 'ADMIN',
        isActive: true,
      },
      {
        id: 2,
        name: 'Usuario',
        email: 'user@sistemahogar.com',
        role: 'USER',
        isActive: true,
      },
    ];

    try {
      setUsuarios(fakeUsers);
    } catch (err) {
      setError('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p>Cargando usuarios...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div style={{ padding: '1.5rem' }}>
      <h1>Gestión de Usuarios</h1>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '1rem',
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>Nombre</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Rol</th>
            <th style={thStyle}>Estado</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map((user) => (
            <tr key={user.id}>
              <td style={tdStyle}>{user.name}</td>
              <td style={tdStyle}>{user.email}</td>
              <td style={tdStyle}>{user.role}</td>
              <td style={tdStyle}>
                {user.isActive ? 'Activo' : 'Inactivo'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  borderBottom: '1px solid #ccc',
  textAlign: 'left',
  padding: '0.5rem',
};

const tdStyle = {
  padding: '0.5rem',
  borderBottom: '1px solid #eee',
};
